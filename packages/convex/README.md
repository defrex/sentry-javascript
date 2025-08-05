<p align="center">
  <a href="https://sentry.io/?utm_source=github&utm_medium=logo" target="_blank">
    <img src="https://sentry-brand.storage.googleapis.com/sentry-wordmark-dark-280x84.png" alt="Sentry" width="280" height="84">
  </a>
</p>

# Official Sentry SDK for Convex

[![npm version](https://img.shields.io/npm/v/@sentry/convex.svg)](https://www.npmjs.com/package/@sentry/convex)
[![npm dm](https://img.shields.io/npm/dm/@sentry/convex.svg)](https://www.npmjs.com/package/@sentry/convex)
[![npm dt](https://img.shields.io/npm/dt/@sentry/convex.svg)](https://www.npmjs.com/package/@sentry/convex)

## Links

- [Official SDK Docs](https://docs.sentry.io/quickstart/)
- [Convex Documentation](https://docs.convex.dev/)

## Install

To get started, first install the `@sentry/convex` package:

```bash
npm install @sentry/convex
```

## Setup

Initialize the SDK at the top of your Convex function files:

```javascript
import { init, captureException } from '@sentry/convex';

// Initialize once at module level
init({
  dsn: process.env.SENTRY_DSN,
  environment: process.env.CONVEX_DEPLOYMENT_NAME,
  // Set tracesSampleRate to 1.0 to capture 100% of spans for tracing.
  tracesSampleRate: 1.0,
});
```

## Usage

The Convex SDK provides a minimal integration that works with Convex's built-in error handling. You can manually capture exceptions when needed:

```javascript
import { captureException } from '@sentry/convex';
import { action } from './_generated/server';

export const myAction = action(async ({ ctx }) => {
  try {
    // Your action logic here
    const result = await fetch('https://api.example.com/data');
    return await result.json();
  } catch (error) {
    // Manually capture errors when you want to send them to Sentry
    captureException(error);
    throw error; // Re-throw to let Convex handle the error
  }
});
```

### Setting Context

You can set user information and additional context:

```javascript
import * as Sentry from '@sentry/convex';

// Set user information
Sentry.setUser({ id: '4711', email: 'user@example.com' });

// Set tags
Sentry.setTag('user_type', 'premium');

// Set extra context
Sentry.setExtra('api_version', '2.0');

// Add breadcrumbs
Sentry.addBreadcrumb({
  message: 'User clicked button',
  level: 'info',
});
```

### Capturing Messages

You can also capture messages and custom events:

```javascript
import { captureMessage, captureEvent } from '@sentry/convex';

// Capture a message
captureMessage('Custom message', 'info');

// Capture a custom event
captureEvent({
  message: 'Custom event',
  level: 'error',
  extra: {
    custom_data: 'value',
  },
});
```

## Features

The Convex SDK is designed to work with Convex's serverless runtime environment:

- **Minimal footprint** - Only includes essential Sentry functionality
- **Fetch-based transport** - Uses the Web Fetch API available in Convex
- **No wrappers needed** - Works with Convex's built-in error handling
- **Manual error capture** - Gives you control over what errors to send to Sentry

## Notes

- The SDK uses the Convex Default Runtime's fetch API for sending data to Sentry
- Uncaught errors in Convex functions are already logged by Convex; use `captureException` for errors you want to send to Sentry
- The SDK is compatible with all Convex function types: queries, mutations, and actions

