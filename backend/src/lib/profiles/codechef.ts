// backend/src/lib/profiles/codechef.ts
import puppeteer from 'puppeteer';
import { ProfileData } from './index';

// Define the structure of a rating entry
interface RatingEntry {
    code: string;
    name: string;
    rank: string;
    rating: string;
    getyear: string;
    getmonth: string;
    getday: string;
}

export async function fetchCodechefProfile(userId: string): Promise<ProfileData> {
    // Use `true` for older Puppeteer versions, or ensure Puppeteer >= 19.0.0 for 'new'
    const browser = await puppeteer.launch({
        headless: true, // Change to 'new' if using Puppeteer 19+
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });
    const page = await browser.newPage();
    const url = `https://www.codechef.com/users/${userId}`;

    try {
        await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });

        const profileData = await page.evaluate(() => {
            const solvedElement = document.querySelector('.problems-solved h3:last-child');
            const questionsSolved = solvedElement
                ? parseInt(solvedElement.textContent?.match(/Total Problems Solved: (\d+)/)?.[1] ?? '0', 10)
                : 0;

            const currentRatingElement = document.querySelector('.rating-header .rating-number');
            const currentRating = currentRatingElement
                ? parseInt(currentRatingElement.textContent ?? '0', 10)
                : 0;

            const maxRatingElement = document.querySelector('.rating-header small');
            const maxRatingMatch = maxRatingElement?.textContent?.match(/Highest Rating (\d+)/)?.[1];
            const maxRating = maxRatingElement && maxRatingMatch
                ? parseInt(maxRatingMatch, 10)
                : currentRating;

            const scripts = Array.from(document.querySelectorAll('script'));
            const settingsScript = scripts.find(script => script.textContent?.includes('Drupal.settings'));
            let ratings: { contestId: string; contestName: string; rank: number; rating: number; date: string }[] = [];

            if (settingsScript && settingsScript.textContent) {
                const text = settingsScript.textContent;
                const jsonStart = text.indexOf('jQuery.extend(Drupal.settings,') + 30;
                const jsonEnd = text.lastIndexOf(');');
                const jsonStr = text.substring(jsonStart, jsonEnd).trim();
                const settings = JSON.parse(jsonStr);
                const dateVsRating: RatingEntry[] = settings['date_versus_rating']?.all || [];
                ratings = dateVsRating.map((entry: RatingEntry) => ({
                    contestId: entry.code,
                    contestName: entry.name,
                    rank: parseInt(entry.rank, 10),
                    rating: parseInt(entry.rating, 10),
                    date: `${entry.getyear}-${String(Number(entry.getmonth) + 1).padStart(2, '0')}-${entry.getday.padStart(2, '0')}`,
                }));
            }

            return {
                user_id: window.location.pathname.split('/').pop() || '',
                current_rating: currentRating,
                max_rating: maxRating,
                questions_solved: questionsSolved,
                ratings,
            };
        });

        if (!profileData.user_id) throw new Error('User not found');
        await browser.close();
        return { ...profileData, platform: 'CODECHEF' };
    } catch (error) {
        await browser.close();
        throw error;
    }
}