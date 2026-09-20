import { input } from "@inquirer/prompts";
import { searchNetflix } from "./lib/qdrant.js";
import { searchCity } from "./lib/qdrant.js";

import { spinner } from "./utils/spinner.js";

try {
  while (true) {
    const query = (
      await input({ message: "請輸入要搜尋的城市相關資訊：" })
    ).trim();

    if (query === "") continue;
    if (query.toLowerCase() === "exit") {
      console.log("再會~");
      break;
    }

    const spin = spinner("搜尋中...").start();
    const results = await searchCity(query, 3);
    spin.stop();

    for (const [i, r] of results.entries()) {
      console.log(`\n${i + 1}. ${r.city} `);
      console.log(`   分數：${r.score.toFixed(3)}`);
      console.log(`   名產：${r.food}`);
      console.log(`   特色：${r.desc}`);
    }
    console.log();
  }
} catch (err) {
  if (err.name === "ExitPromptError") {
    console.log("\n再會~");
  } else {
    throw err;
  }
}
