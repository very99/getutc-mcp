# GetUTC MCP Server

[English](#english) | [中文](#中文)

---

## English

A simple and reliable MCP (Model Context Protocol) server that provides accurate UTC time from multiple verified sources. Ready to use out of the box - just clone and configure!

### ✨ Features

- **Multiple Time Sources**: Verified against 4 reliable sources for accuracy
  - WorldClockAPI (JSON API)
  - HTTP Date headers from WorldClock, Google, and GitHub
- **Multiple Formats**: ISO, timestamp, readable, date-only, time-only
- **Pre-built**: Ready to use without compilation
- **Reliable**: Automatic fallback between sources

### 🚀 Quick Start

1. **Clone the repository**
   ```bash
   git clone https://github.com/very99/getutc-mcp.git
   cd getutc-mcp
   ```

2. **Configure your MCP client**
   
   Add to your MCP configuration file:
   
   **For Amazon Q CLI** (`~/.aws/amazonq/mcp.json`):
   ```json
   {
     "mcpServers": {
       "getutc": {
         "command": "node",
         "args": ["/path/to/getutc-mcp/dist/index.js"],
         "timeout": 30000
       }
     }
   }
   ```
   
   **For Claude Desktop** (`~/Library/Application Support/Claude/claude_desktop_config.json` on macOS):
   ```json
   {
     "mcpServers": {
       "getutc": {
         "command": "node",
         "args": ["/path/to/getutc-mcp/dist/index.js"]
       }
     }
   }
   ```

3. **Start using**
   
   Ask your MCP client:
   - "What's the current UTC time?"
   - "Get UTC timestamp"
   - "Show today's date"

### 📖 Tool Reference

**Tool Name**: `get_utc_time`

**Parameters**:
- `format` (optional): Output format
  - `"iso"` (default): ISO 8601 format (2025-06-21T16:18:14.000Z)
  - `"timestamp"`: Unix timestamp (1734789494)
  - `"readable"`: Human readable (Saturday, June 21, 2025 at 4:18:14 PM UTC)
  - `"date-only"`: Date only (2025-06-21)
  - `"time-only"`: Time only (16:18:14)

### 🔧 Requirements

- Node.js (version 14 or higher)
- MCP-compatible client (Amazon Q CLI, Claude Desktop, etc.)

### 📁 Project Structure

```
getutc-mcp/
├── dist/           # Pre-built files (ready to use)
│   └── index.js    # Main server file
├── src/            # Source code
├── package.json    # Dependencies
└── README.md       # This file
```

### 🤝 Contributing

Feel free to submit issues and pull requests!

### 📄 License

MIT License

---

## 中文

一个简单可靠的 MCP (Model Context Protocol) 服务器，通过多个验证源提供准确的 UTC 时间。开箱即用 - 只需克隆和配置！

### ✨ 特性

- **多时间源**: 通过4个可靠源验证确保准确性
  - WorldClockAPI (JSON API)
  - WorldClock、Google、GitHub 的 HTTP Date 头
- **多种格式**: ISO、时间戳、可读格式、仅日期、仅时间
- **预编译**: 无需编译即可使用
- **可靠性**: 源之间自动故障转移

### 🚀 快速开始

1. **克隆仓库**
   ```bash
   git clone https://github.com/very99/getutc-mcp.git
   cd getutc-mcp
   ```

2. **配置你的 MCP 客户端**
   
   添加到你的 MCP 配置文件：
   
   **Amazon Q CLI** (`~/.aws/amazonq/mcp.json`):
   ```json
   {
     "mcpServers": {
       "getutc": {
         "command": "node",
         "args": ["/path/to/getutc-mcp/dist/index.js"],
         "timeout": 30000
       }
     }
   }
   ```
   
   **Claude Desktop** (macOS: `~/Library/Application Support/Claude/claude_desktop_config.json`):
   ```json
   {
     "mcpServers": {
       "getutc": {
         "command": "node",
         "args": ["/path/to/getutc-mcp/dist/index.js"]
       }
     }
   }
   ```

3. **开始使用**
   
   询问你的 MCP 客户端：
   - "现在的UTC时间是多少？"
   - "获取UTC时间戳"
   - "显示今天的日期"

### 📖 工具参考

**工具名称**: `get_utc_time`

**参数**:
- `format` (可选): 输出格式
  - `"iso"` (默认): ISO 8601 格式 (2025-06-21T16:18:14.000Z)
  - `"timestamp"`: Unix 时间戳 (1734789494)
  - `"readable"`: 人类可读格式 (Saturday, June 21, 2025 at 4:18:14 PM UTC)
  - `"date-only"`: 仅日期 (2025-06-21)
  - `"time-only"`: 仅时间 (16:18:14)

### 🔧 系统要求

- Node.js (版本 14 或更高)
- 兼容 MCP 的客户端 (Amazon Q CLI, Claude Desktop 等)

### 📁 项目结构

```
getutc-mcp/
├── dist/           # 预编译文件 (可直接使用)
│   └── index.js    # 主服务器文件
├── src/            # 源代码
├── package.json    # 依赖项
└── README.md       # 本文件
```

### 🤝 贡献

欢迎提交问题和拉取请求！

### 📄 许可证

MIT 许可证

---

## Troubleshooting | 故障排除

**English**: If you encounter issues, make sure:
- Node.js is installed and accessible
- The path in your MCP configuration is correct and absolute
- Your MCP client supports the MCP protocol

**中文**: 如果遇到问题，请确保：
- Node.js 已安装且可访问
- MCP 配置中的路径正确且为绝对路径
- 你的 MCP 客户端支持 MCP 协议