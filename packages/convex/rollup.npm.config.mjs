import { makeBaseNPMConfig, makeNPMConfigVariants } from '@sentry-internal/rollup-utils';

export default makeNPMConfigVariants(
  makeBaseNPMConfig({
    packageSpecificConfig: {
      output: {
        // Preserve the global fetch and other web APIs that Convex environment provides
        globals: {
          fetch: 'fetch',
          Headers: 'Headers',
          Request: 'Request',
          Response: 'Response',
        },
      },
    },
  }),
);

