#!/usr/bin/env node
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { CallToolRequestSchema, ListToolsRequestSchema, } from "@modelcontextprotocol/sdk/types.js";
import fetch from "node-fetch";
// 获取准确的UTC时间
async function getAccurateTime() {
    const sources = [
        {
            name: "WorldClockAPI",
            getTime: async () => {
                const response = await fetch("http://worldclockapi.com/api/json/utc/now");
                const data = await response.json();
                return new Date(data.currentDateTime);
            }
        },
        {
            name: "HTTP Date (WorldClock)",
            getTime: async () => {
                const response = await fetch("http://worldclockapi.com", { method: "HEAD" });
                const dateHeader = response.headers.get("date");
                if (!dateHeader)
                    throw new Error("No date header");
                return new Date(dateHeader);
            }
        },
        {
            name: "HTTP Date (Google)",
            getTime: async () => {
                const response = await fetch("http://google.com", { method: "HEAD" });
                const dateHeader = response.headers.get("date");
                if (!dateHeader)
                    throw new Error("No date header");
                return new Date(dateHeader);
            }
        },
        {
            name: "HTTP Date (GitHub)",
            getTime: async () => {
                const response = await fetch("https://api.github.com", { method: "HEAD" });
                const dateHeader = response.headers.get("date");
                if (!dateHeader)
                    throw new Error("No date header");
                return new Date(dateHeader);
            }
        }
    ];
    for (const source of sources) {
        try {
            console.error(`Trying ${source.name}...`);
            const controller = new AbortController();
            const timeout = setTimeout(() => controller.abort(), 3000);
            const time = await Promise.race([
                source.getTime(),
                new Promise((_, reject) => setTimeout(() => reject(new Error("Timeout")), 3000))
            ]);
            clearTimeout(timeout);
            if (isNaN(time.getTime())) {
                throw new Error("Invalid time");
            }
            console.error(`✓ Got time from ${source.name}`);
            return { time, source: source.name };
        }
        catch (error) {
            console.error(`✗ ${source.name} failed: ${error}`);
        }
    }
    console.error("All sources failed, using system time");
    return { time: new Date(), source: "System Clock" };
}
// 格式化时间
function formatTime(date, format) {
    switch (format) {
        case "iso":
            return { text: date.toISOString(), description: "ISO 8601 format" };
        case "timestamp":
            return { text: Math.floor(date.getTime() / 1000).toString(), description: "Unix timestamp" };
        case "readable":
            return { text: date.toUTCString(), description: "Human readable" };
        case "date-only":
            return { text: date.toISOString().split('T')[0], description: "Date only" };
        case "time-only":
            return { text: date.toISOString().split('T')[1].replace('Z', ''), description: "Time only" };
        default:
            return { text: date.toISOString(), description: "ISO 8601 format" };
    }
}
// 创建服务器
const server = new Server({
    name: "getutc-mcp",
    version: "1.0.0",
});
// 定义工具
const tools = [
    {
        name: "get_utc_time",
        description: "Get accurate UTC time from multiple reliable sources",
        inputSchema: {
            type: "object",
            properties: {
                format: {
                    type: "string",
                    enum: ["iso", "timestamp", "readable", "date-only", "time-only"],
                    description: "Time format",
                    default: "iso"
                }
            }
        }
    }
];
// 处理工具列表
server.setRequestHandler(ListToolsRequestSchema, async () => {
    return { tools };
});
// 处理工具调用
server.setRequestHandler(CallToolRequestSchema, async (request) => {
    const { name, arguments: args } = request.params;
    if (name === "get_utc_time") {
        const { format = "iso" } = args;
        const { time, source } = await getAccurateTime();
        const { text, description } = formatTime(time, format);
        return {
            content: [{
                    type: "text",
                    text: `UTC Time (${description}): ${text}\nSource: ${source}`
                }]
        };
    }
    throw new Error(`Unknown tool: ${name}`);
});
// 启动服务器
async function main() {
    try {
        const transport = new StdioServerTransport();
        await server.connect(transport);
        console.error("GetUTC MCP Server running");
    }
    catch (error) {
        console.error("Server error:", error);
        process.exit(1);
    }
}
main();