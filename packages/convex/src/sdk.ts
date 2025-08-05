import type { Integration } from '@sentry/core';
import {
  createStackParser,
  dedupeIntegration,
  functionToStringIntegration,
  getIntegrationsToSetup,
  inboundFiltersIntegration,
  initAndBind,
  linkedErrorsIntegration,
  nodeStackLineParser,
  stackParserFromStackParserOptions,
} from '@sentry/core';
import type { ConvexClientOptions, ConvexOptions } from './client';
import { ConvexClient } from './client';
import { makeConvexTransport } from './transport';

/** Get the default integrations for the Convex SDK. */
export function getDefaultIntegrations(): Integration[] {
  return [
    dedupeIntegration(),
    inboundFiltersIntegration(),
    functionToStringIntegration(),
    linkedErrorsIntegration(),
  ];
}

/**
 * Default stack parser for Convex using the standard node parser
 */
const defaultStackParser = createStackParser(nodeStackLineParser());

/**
 * Initializes the Convex SDK.
 */
export function init(options: ConvexOptions): ConvexClient | undefined {
  if (options.defaultIntegrations === undefined) {
    options.defaultIntegrations = getDefaultIntegrations();
  }

  const clientOptions: ConvexClientOptions = {
    ...options,
    stackParser: stackParserFromStackParserOptions(options.stackParser || defaultStackParser),
    integrations: getIntegrationsToSetup(options),
    transport: options.transport || makeConvexTransport,
  };

  return initAndBind(ConvexClient, clientOptions) as ConvexClient;
}

