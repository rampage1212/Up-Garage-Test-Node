const axios = require('axios');

const base_url = 'http://challenge.z2o.cloud/challenges';
const nickName = "NhatThanhDo";

interface ChallengeResponse {
    id: string;
    actives_at: number;
    called_at: number;
    total_diff: number;
    result?: {
        attempts: number;
        url: string | null;
    };
}

async function startChallenge(): Promise<void> {
    try {
        const response = await axios.post(`${base_url}?nickname=${nickName}`);
        const challengeId = response.data.id;
        console.log(`Challenge started with ID: ${challengeId}`);
        await callChallenge(challengeId, response.data.actives_at);
    } catch (error) {
        handleError('Error starting challenge', error);
    }
}

async function callChallenge(challengeId: string, nextActiveAt: number): Promise<void> {
    let totalDiff = 0;

    const interval = setInterval(async () => {
        const currentTime = Date.now();
        const timeToWait = nextActiveAt - currentTime;
        
        if (timeToWait <= 0 ) {
            try {
                const response = await axios.put(base_url, null, {
                    headers: {
                        'X-Challenge-Id': challengeId
                    }
                });

                const { actives_at, called_at, total_diff } = response.data as ChallengeResponse;
                totalDiff += total_diff;
                console.log(`Called at: ${called_at}, Active at: ${actives_at}, Total diff: ${totalDiff}`);

                if (totalDiff > 500) {
                    console.log('Challenge ended due to exceeding 500ms total difference.');
                    clearInterval(interval);
                    console.log('Final result:', response.data.result);
                } else {
                    nextActiveAt = actives_at;
                }
            } catch (error) {
                handleError('Error during challenge call', error);
                clearInterval(interval);
            }
        }
    }, 100)
}

function handleError(message: string, error: any): void {
    const errorMessage = error.response ? error.response.data.error : error.message;
    console.error(`${message}: ${errorMessage}`);
}

startChallenge();