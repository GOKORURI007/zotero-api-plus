# Zotero API Plus

[![zotero target version](https://img.shields.io/badge/Zotero-8-green?style=flat-square&logo=zotero&logoColor=CC2936)](https://www.zotero.org)
[![License: AGPL-3.0-or-later](https://img.shields.io/github/license/GOKORURI007/zotero-api-plus)](https://github.com/GOKORURI007/zotero-api-plus/blob/main/LICENSE)

[English](README.md) | [简体中文](doc/README-zhCN.md)

A Zotero plugin that extends Zotero's local API with additional functionality.

## Features

- Extends Zotero's local API with custom endpoints
- Add items to Zotero by identifier (DOI, ISBN, PMID, etc.) via API
- Health check endpoint to verify plugin status
- Easy integration with other tools and scripts

## API Endpoints

### Health Check

```
GET /api/plus
```

Returns a simple message indicating the API is running.

#### Response

```
Zotero Local API Plus is running.
```

### Add Item by Identifier

```
POST /api/plus/add-item-by-id
Content-Type: application/json
```

Adds items to Zotero using identifiers like DOI, ISBN, PMID, etc.

#### Request Body

```json
{
  "identifier": "10.1038/nature12373", // Required: DOI, ISBN, PMID, etc.
  "collectionKey": "ABC123" // Optional: Collection key to add items to
}
```

#### Response

```json
{
  "status": "success",
  "addedCount": 1,
  "titles": ["Article Title"]
}
```

## Installation

1. Download the latest release from the [GitHub Releases](https://github.com/GOKORURI007/zotero-api-plus/releases) page.
2. In Zotero, go to `Tools > Add-ons`.
3. Click the gear icon and select `Install Add-on From File...`.
4. Select the downloaded `.xpi` file.
5. Restart Zotero.

## Usage

1. Ensure Zotero's local API is enabled (go to `Edit > Preferences > Advanced > Files and Folders > Show Data Directory`, then edit `prefs.js` and add `user_pref("extensions.zotero.httpServer.enabled", true);`).
2. Use the API endpoints as described above.

## Development

### Prerequisites

- Node.js 18+
- npm or yarn

### Setup

```bash
npm install
npm run start
```

### Build

```bash
npm run build
```

### Lint

```bash
npm run lint:check
```

## License

AGPL-3.0-or-later

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
