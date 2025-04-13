// backend/src/lib/profiles/leetcode.ts
import { ProfileData } from './index';
import { LeetCode } from 'leetcode-query';
// import { CN_LANGS_MAP, CN_RESULTS_MAP } from './constants'; // Assuming constants are in a separate file

// Define constants if not already imported
const CN_LANGS_MAP = {
    cpp: 'C++',
    java: 'Java',
    python: 'Python',
    python3: 'Python3',
    c: 'C',
    csharp: 'C#',
    javascript: 'JavaScript',
    typescript: 'TypeScript',
    php: 'PHP',
    swift: 'Swift',
    kotlin: 'Kotlin',
    dart: 'Dart',
    go: 'Go',
    ruby: 'Ruby',
    scala: 'Scala',
    rust: 'Rust',
    racket: 'Racket',
    erlang: 'Erlang',
    elixir: 'Elixir',
};

const CN_RESULTS_MAP = {
    10: 'Accepted',
    11: 'Wrong Answer',
    12: 'Time Limit Exceeded',
    13: 'Memory Limit Exceeded',
    14: 'Output Limit Exceeded',
    15: 'Runtime Error',
    16: 'Compile Error',
    20: 'Unknown Error',
};

// Utility function to get problem stats
function getProblemStats(difficulty: string, acCounts: any[], totalCounts: any[]) {
    return {
        solved: acCounts.find((x) => x.difficulty === difficulty)?.count || 0,
        total: totalCounts.find((x) => x.difficulty === difficulty)?.count || 0,
    };
}

class Query {
    async us(username: string, headers = {}): Promise<any> {
        const lc = new LeetCode();
        const { data } = await lc.graphql({
            operationName: 'data',
            variables: { username },
            query: `
            query data($username: String!) {
                problems: allQuestionsCount { 
                    difficulty 
                    count 
                }
                user: matchedUser(username: $username) {
                    username
                    profile { 
                        realName 
                        aboutMe 
                        userAvatar 
                        skillTags 
                        countryName 
                        ranking
                    }
                    submitStatsGlobal {
                        acSubmissionNum { difficulty count }
                    }
                }
                submissions: recentSubmissionList(username: $username, limit: 10) {
                    id
                    title 
                    titleSlug 
                    timestamp 
                    statusDisplay 
                    lang
                }
                contest: userContestRanking(username: $username) {
                    rating
                    globalRanking
                    badge {
                        name
                    }
                }
                contestHistory: userContestRankingHistory(username: $username) {
                    attended
                    rating
                    contest {
                        title
                        startTime
                    }
                }
            }`,
            headers,
        });

        if (!data?.user) {
            throw new Error('User Not Found');
        }

        return {
            profile: {
                username: data.user.username,
                realname: data.user.profile.realName || '',
                about: data.user.profile.aboutMe || '',
                avatar: data.user.profile.userAvatar || '',
                skills: data.user.profile.skillTags || [],
                country: typeof data.user.profile.countryName === 'string'
                    ? data.user.profile.countryName
                    : (data.user.profile.countryName?.name || ''),
            },
            problem: {
                easy: getProblemStats('Easy', data.user.submitStatsGlobal.acSubmissionNum, data.problems),
                medium: getProblemStats('Medium', data.user.submitStatsGlobal.acSubmissionNum, data.problems),
                hard: getProblemStats('Hard', data.user.submitStatsGlobal.acSubmissionNum, data.problems),
                ranking: data.user.profile.ranking || 0,
            },
            submissions: data.submissions.map((x: any) => ({
                id: x.id,
                title: x.title,
                slug: x.titleSlug,
                time: parseInt(x.timestamp) * 1000,
                status: x.statusDisplay,
                lang: x.lang,
            })),
            contest: data.contest && {
                rating: data.contest.rating,
                ranking: data.contest.globalRanking,
                badge: data.contest.badge?.name || '',
            },
            contestHistory: data.contestHistory
                .filter((entry: any) => entry.attended)
                .map((entry: any) => ({
                    rating: entry.rating,
                    date: parseInt(entry.contest.startTime) * 1000,
                    contestTitle: entry.contest.title,
                })),
        };
    }
}

const query = new Query();

export async function fetchLeetcodeProfile(userId: string): Promise<ProfileData> {
    try {
        const data = await query.us(userId);

        // Calculate total questions solved
        const questions_solved =
            data.problem.easy.solved +
            data.problem.medium.solved +
            data.problem.hard.solved;

        // Map contest history to ratings array (if ProfileData expects it)
        const ratings = data.contestHistory?.map((entry: any) => ({
            rating: entry.rating,
            date: new Date(entry.date).toISOString(),
            contestTitle: entry.contestTitle,
        })) || [];

        // Determine max rating from contest history
        const max_rating =
            data.contestHistory?.length > 0
                ? Math.max(...data.contestHistory.map((entry: any) => entry.rating))
                : data.contest?.rating || 0;

        return {
            user_id: userId,
            platform: 'LEETCODE',
            current_rating: data.contest?.rating || 0,
            max_rating,
            questions_solved,
            ratings,
        };
    } catch (error: any) {
        throw new Error(`Failed to fetch LeetCode profile: ${error.message}`);
    }
}