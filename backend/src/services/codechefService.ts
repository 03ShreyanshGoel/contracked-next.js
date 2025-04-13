import axios from 'axios';
import prisma from '../config/db';

export const fetchCodeChefContests = async () => {
    try {
        console.log('Fetching CodeChef contests...');
        const response = await axios.get(
            'https://www.codechef.com/api/list/contests/all?sort_by=START&sorting_order=asc&offset=0&mode=all'
        );

        if (!response.data?.future_contests || !response.data?.past_contests) {
            console.error('Invalid response format from CodeChef API');
            return [];
        }

        console.log('✅ API response received.');
        const now = new Date();

        const upcomingContests = response.data.future_contests.map((contest: any) => ({
            title: contest.contest_name,
            platform: 'CODECHEF' as const, // Updated to match enum
            startTime: new Date(contest.contest_start_date_iso),
            endTime: new Date(contest.contest_end_date_iso),
            url: `https://www.codechef.com/${contest.contest_code}`,
            status: 'UPCOMING', // Updated to match enum
        }));

        const pastContests = response.data.past_contests.map((contest: any) => ({
            title: contest.contest_name,
            platform: 'CODECHEF' as const, // Updated to match enum
            startTime: new Date(contest.contest_start_date_iso),
            endTime: new Date(contest.contest_end_date_iso),
            url: `https://www.codechef.com/${contest.contest_code}`,
            status: 'PAST', // Updated to match enum
        }));

        const existingPastContest = await prisma.contest.findFirst({
            where: { platform: 'CODECHEF', status: 'PAST' },
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
        console.error('❌ Error fetching CodeChef contests:', error);
        return [];
    }
};