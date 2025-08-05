import type { ClientOptions, Options, ServerRuntimeClientOptions } from '@sentry/core';
import { applySdkMetadata, ServerRuntimeClient } from '@sentry/core';
import type { ConvexTransportOptions } from './transport';

/**
 * The Sentry Convex SDK Client.
 *
 * @see ConvexClientOptions for documentation on configuration options.
 * @see ServerRuntimeClient for usage documentation.
 */
export class ConvexClient extends ServerRuntimeClient {
  /**
   * Creates a new Convex SDK instance.
   * @param options Configuration options for this SDK.
   */
  public constructor(options: ConvexClientOptions) {
    applySdkMetadata(options, 'convex');
    options._metadata = options._metadata || {};

    const clientOptions: ServerRuntimeClientOptions = {
      ...options,
      platform: 'javascript',
      runtime: { name: 'convex' },
    };

    super(clientOptions);
  }
}

/**
 * Configuration options for the Sentry Convex SDK
 *
 * @see @sentry/core Options for more information.
 */
// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface ConvexOptions extends Options<ConvexTransportOptions> {}

/**
 * Configuration options for the Sentry Convex SDK Client class
 *
 * @see ConvexClient for more information.
 */
// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface ConvexClientOptions extends ClientOptions<ConvexTransportOptions> {}

