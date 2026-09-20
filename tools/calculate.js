import { z } from "zod";
import { defineTool } from "../utils/func-tool.js";

// 1. 實作計算函式
function getCalculate({ expression }) {
    try {
        // 使用 eval 進行數學算式計算
        const result = eval(expression);
        return String(result);
    } catch (error) {
        return `計算錯誤: ${error.message}`;
    }
}

// 2. 定義工具與 Zod Schema
export const calculateTool = defineTool({
    name: "calculate",
    description: "進行數學計算",
    fn: getCalculate,
    parameters: z.object({
        expression: z.string().describe("要計算的數學算式，例如 '10 + 5 * 2'"),
    }),
});