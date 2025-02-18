import axios from "axios";

const BASE_URL = "http://challenge.z2o.cloud";
const NICKNAME = "miura";

async function startChallenge() {
  try {
    // 1. チャレンジの開始
    const startResponse = await axios.post(`${BASE_URL}/challenges`, null, {
      params: {
        nickname: NICKNAME,
      },
    });

    let challengeData = startResponse.data;
    console.log("Initial challenge data:", challengeData);

    // 2. 繰り返しの呼び出し実行
    while (true) {
      // レスポンスの形式を確認
      console.log("Current actives_at:", challengeData.actives_at);

      // 文字列をDateオブジェクトに変換する際のデバッグ
      const activesAtDate = new Date(challengeData.actives_at);
      console.log("Parsed date:", activesAtDate);

      const activesAt = activesAtDate.getTime();
      const now = Date.now();
      const waitTime = activesAt - now;

      if (waitTime > 0) {
        console.log(`Waiting for ${waitTime}ms`);
        await new Promise((resolve) => setTimeout(resolve, waitTime));
      }

      // PUTリクエストの実行
      const putResponse = await axios.put(`${BASE_URL}/challenges`, null, {
        headers: {
          "X-Challenge-Id": challengeData.id,
        },
      });

      challengeData = putResponse.data;
      console.log("Challenge response:", challengeData);

      // 3. チャレンジ終了の確認
      if (challengeData.result) {
        console.log("Challenge completed!");
        console.log("Result:", challengeData.result);
        if (challengeData.result.url) {
          console.log("Success URL:", challengeData.result.url);
        }
        break;
      }
    }
  } catch (error) {
    console.error("Error occurred:", error.message);
    if (error.response) {
      console.error("Response data:", error.response.data);
    }
  }
}

// プログラムの実行
startChallenge();
