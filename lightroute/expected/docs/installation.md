---
source: https://reference.lightroute.dev/docs/installation
canonical: https://reference.lightroute.dev/docs/installation
title: Installation
description: Install and configure the LightRoute reference website.
language: en
---

# Installation

Run this site locally to inspect approved pages and the fixtures beside them.

## Run the site

From the project directory, install packages and start the development server:

```shell
npm install
npm run dev
```

To verify the production bundle:

```shell
npm run build
```

## Route configuration

The sample configuration makes route policy explicit. A future converter can use these values, but this site does not process them.

```json
{
  "allowedRoutes": ["/", "/about", "/pricing", "/docs"],
  "excludedRoutes": ["/draft", "/private"],
  "outputDirectory": "lightroute/generated"
}
```

**Note:** The abbreviated example above is for reading. The complete public route list is in `lightroute.config.json`.

## Build flow

![A public React route passes through an allow list and becomes a Markdown file](/images/architecture.svg)

Planned route-to-Markdown flow; conversion is not implemented here.
