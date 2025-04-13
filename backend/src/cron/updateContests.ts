import nodeCron from 'node-cron';
import { fetchCodeforcesContests } from '../services/codeforcesService';
import { fetchCodeChefContests } from '../services/codechefService';
import { fetchLeetCodeContests } from '../services/leetcodeService';

export const updateContests = async () => {
    try {
        console.log('🔄 Fetching latest contests...');

        console.time('Codeforces Fetch Time');
        console.log('⏳ Fetching Codeforces contests...');
        const codeforcesContests = await fetchCodeforcesContests();
        console.timeEnd('Codeforces Fetch Time');
        console.log(`✅ Codeforces contests fetched: ${codeforcesContests.length}`);
        console.log('🟢 Sample Codeforces Contests:', codeforcesContests.slice(0, 3));

        console.time('CodeChef Fetch Time');
        console.log('⏳ Fetching CodeChef contests...');
        const codechefContests = await fetchCodeChefContests();
        console.timeEnd('CodeChef Fetch Time');
        console.log(`✅ CodeChef contests fetched: ${codechefContests.length}`);
        console.log('🟠 Sample CodeChef Contests:', codechefContests.slice(0, 3));

        console.time('LeetCode Fetch Time');
        console.log('⏳ Fetching LeetCode contests...');
        const leetCodeContests = await fetchLeetCodeContests();
        console.timeEnd('LeetCode Fetch Time');
        console.log(`✅ LeetCode contests fetched: ${leetCodeContests.length}`);
        console.log('🔵 Sample LeetCode Contests:', leetCodeContests.slice(0, 3));

        console.log('✅ All contests updated successfully!');
    } catch (error) {
        console.error('❌ Error updating contests:', error);
    }
};

// Schedule Cron Job: Runs every 1 hour
nodeCron.schedule('0 * * * *', async () => {
    console.log('⏳ Running scheduled contest update...');
    await updateContests();
});