---
source: https://lightroute-phase2.vercel.app/docs/api
canonical: https://lightroute-phase2.vercel.app/docs/api
title: API Reference
description: Read sample endpoint-style documentation and parameters for LightRoute.
language: en
---

# API Reference

The endpoint below is illustrative documentation content. This site has no backend service.

## `GET /v1/routes/:path`

Returns a sample description of an approved route. A real LightRoute implementation may use a different interface.

### Parameters

| Name | Type | Required | Description |
| --- | --- | --- | --- |
| `path` | string | Yes | URL-encoded public route path. |
| `format` | string | No | Requested output format; example: `markdown`. |

### Example request

```shell
curl https://lightroute-phase2.vercel.app/v1/routes/docs%2Fapi?format=markdown
```

### Example response

```json
{
  "path": "/docs/api",
  "title": "API Reference",
  "language": "en",
  "approved": true
}
```

**Testing detail:** This example exercises headings, a parameter table, inline code, and a JSON code block.
