import axios from 'axios';
import prisma from '../config/db';

const LEETCODE_URL = 'https://leetcode.com/graphql/';

export const fetchLeetCodeContests = async () => {
    try {
        console.log('Fetching LeetCode contests...');
        const query = {
            query: `
        query getContestInfo {
          allContests {
            title
            titleSlug
            startTime
            duration
            containsPremium
          }
        }
      `,
            variables: {},
        };

        const headers = {
            'Content-Type': 'application/json',
            'User-Agent':
                'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
            Referer: 'https://leetcode.com/contest/',
            Accept: '*/*',
            Connection: 'keep-alive',
        };

        const response = await axios.post(LEETCODE_URL, query, { headers });

        if (!response.data?.data?.allContests) {
            console.error('Failed to fetch LeetCode contests.');
            return [];
        }

        console.log('✅ API response received.');
        const now = Math.floor(Date.now() / 1000);

        const contests = response.data.data.allContests.map((contest: any) => ({
            title: contest.title,
            platform: 'LEETCODE' as const,
            startTime: new Date(contest.startTime * 1000),
            endTime: new Date((contest.startTime + contest.duration) * 1000),
            url: `https://leetcode.com/contest/${contest.titleSlug}`,
            status: contest.startTime > now ? 'UPCOMING' : 'PAST',
        }));

        const upcomingContests = contests.filter((c: any) => c.status === 'UPCOMING');
        const pastContests = contests.filter((c: any) => c.status === 'PAST');

        const existingPastContest = await prisma.contest.findFirst({
            where: { platform: 'LEETCODE', status: 'PAST' },
        });

        if (!existingPastContest) {
            await prisma.contest.createMany({ data: pastContests });
            console.log(`✅ Stored ${pastContests.length} past contests.`);
        } else {
            console.log('✅ Past contests already stored. Skipping...');
        }

        const updatedCount = await prisma.contest.updateMany({
            where: { status: 'UPCOMING', endTime: { lte: new Date() } },
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
        console.error('❌ Error fetching LeetCode contests:', error);
        return [];
    }
};