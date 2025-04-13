import axios from 'axios';
import prisma from '../config/db';

export const fetchCodeforcesContests = async () => {
    try {
        console.log('Fetching Codeforces contests...');
        const response = await axios.get('https://codeforces.com/api/contest.list');

        if (response.data.status !== 'OK') {
            console.error('Failed to fetch Codeforces contests.');
            return [];
        }

        console.log('✅ API response received.');
        const now = new Date();

        const contests = response.data.result.map((contest: any) => ({
            title: contest.name,
            platform: 'CODEFORCES' as const, // Updated to match enum
            startTime: new Date(contest.startTimeSeconds * 1000),
            endTime: new Date((contest.startTimeSeconds + contest.durationSeconds) * 1000),
            url: `https://codeforces.com/contest/${contest.id}`,
            status: contest.phase === 'BEFORE' ? 'UPCOMING' : 'PAST', // Updated to match enum
        }));

        const upcomingContests = contests.filter((c: any) => c.status === 'UPCOMING');
        const pastContests = contests.filter((c: any) => c.status === 'PAST');

        const existingPastContest = await prisma.contest.findFirst({
            where: { platform: 'CODEFORCES', status: 'PAST' },
        });

        if (!existingPastContest) {
            await prisma.contest.createMany({ data: pastContests });
            console.log(`✅ Stored ${pastContests.length} past contests.`);
        } else {
            console.log('✅ Past contests already stored. Skipping...');
        }

        const updatedCount = await prisma.contest.updateMany({
            where: { status: 'UPCOMING', endTime: { lte: now } },
            data: { status: 'PAST' },
        });
        console.log(`✅ Updated ${updatedCount.count} contests from UPCOMING to PAST.`);

        for (const contest of upcomingContests) {
            await prisma.contest.upsert({
                where: { url: contest.url },
                update: contest,
                create: contest,
            });
        }
        console.log(`✅ Stored/updated ${upcomingContests.length} upcoming contests.`);

        return [...upcomingContests, ...pastContests];
    } catch (error) {
        console.error('❌ Error fetching Codeforces contests:', error);
        return [];
    }
};