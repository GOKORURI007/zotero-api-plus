# Zotero Local API Plus

[![zotero target version](https://img.shields.io/badge/Zotero-8-green?style=flat-square&logo=zotero&logoColor=CC2936)](https://www.zotero.org)
[![License: AGPL-3.0-or-later](https://img.shields.io/github/license/GOKORURI007/zotero-api-plus)](https://github.com/GOKORURI007/zotero-api-plus/blob/main/LICENSE)

[English](../README.md) | [简体中文](./README-zhCN.md)

一个为 Zotero 本地 API 扩展额外功能的插件。

## 功能特性

- 为 Zotero 本地 API 扩展自定义端点
- 通过 API 使用标识符（DOI、ISBN、PMID 等）向 Zotero 添加项目
- 健康检查端点，用于验证插件状态
- 易于与其他工具和脚本集成

## API 端点

### 健康检查
```
GET /api/plus
```

返回一个简单消息，指示 API 正在运行。

#### 响应
```
Zotero Local API Plus is running.
```

### 通过标识符添加项目
```
POST /api/plus/add-item-by-id
Content-Type: application/json
```

使用 DOI、ISBN、PMID 等标识符将项目添加到 Zotero。

#### 请求体
```json
{
  "identifier": "10.1038/nature12373",  // 必填：DOI、ISBN、PMID 等
  "collectionKey": "ABC123"  // 可选：要添加项目的集合键
}
```

#### 响应
```json
{
  "status": "success",
  "addedCount": 1,
  "titles": ["文章标题"]
}
```

## 安装

1. 从 [GitHub Releases](https://github.com/GOKORURI007/zotero-api-plus/releases) 页面下载最新版本。
2. 在 Zotero 中，转到 `工具 > 插件`。
3. 点击齿轮图标，选择 `从文件安装插件...`。
4. 选择下载的 `.xpi` 文件。
5. 重启 Zotero。

## 使用

1. 确保 Zotero 的本地 API 已启用（转到 `编辑 > 首选项 > 高级 > 文件和文件夹 > 显示数据目录`，然后编辑 `prefs.js` 并添加 `user_pref("extensions.zotero.httpServer.enabled", true);`）。
2. 按照上述描述使用 API 端点。

## 开发

### 先决条件

- Node.js 18+
- npm

### 设置

```bash
npm install
npm run start
```

### 构建

```bash
npm run build
```

### 代码检查

```bash
npm run lint:check
```

## 许可证

AGPL-3.0-or-later

## 贡献

欢迎贡献！请随时提交 Pull Request。