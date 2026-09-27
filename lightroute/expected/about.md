---
source: https://lightroute-phase2.vercel.app/about
canonical: https://lightroute-phase2.vercel.app/about
title: About
description: Learn why the LightRoute reference site uses controlled public routes and fixtures.
language: en
---

# About LightRoute

LightRoute explores how a website can expose a deliberate, human-readable view of its public content at build time.

## Why a reference site?

Real websites vary widely. A small, known set of pages makes extraction behavior easier to inspect and compare. Every approved page has a corresponding Markdown fixture; excluded pages deliberately do not.

## What we test

- Which routes are allowed or denied
- Whether main article content survives conversion
- Whether navigation and footer content stay out of the result
- Whether metadata and links remain accurate

## How the fixtures are used

1. Build the reference website.
2. Run a future LightRoute converter against approved routes.
3. Compare generated files with the expected Markdown fixtures.

> Good reference content is predictable enough to test and realistic enough to reveal mistakes.

This project is a content fixture. It does not include the converter, route discovery, or a publishing pipeline.
