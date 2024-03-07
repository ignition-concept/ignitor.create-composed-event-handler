import type { SyntheticEvent, EventHandler } from "react";

export const delay = (milisecond: number = Infinity) => {
  return new Promise((resolve) => setTimeout(resolve, milisecond));
};

export type MessageType = "info" | "log" | "warn" | "error";

export type NextLogger = [MessageType, string];

export type NextAction = (
  wait: typeof delay
) =>
  | void
  | Promise<void>
  | Promise<(wait: typeof delay) => void | Promise<void>>
  | ((wait: typeof delay) => void | Promise<void>);

export type NextArguments = NextLogger | NextAction;

export interface EventHandlerComposed<
  T extends Element = Element,
  E extends Event = Event
> {
  /**
   * @param next can only using once
   * @param event an react synthetic event
   */
  (
    event: SyntheticEvent<T, E>,
    next: (message?: NextArguments) => void
  ): Promise<void> | void;
}

/**
 *
 *  chain event to using in react event handler
 *
 * @param handlers all of event chainning
 * @example
 * createComposedEventHandler(
 *  (_event, next) => {
 *    console.log('pipe one')
 *
 *    next()
 *  },
 *  () => {
 *    console.log('end of the pipe')
 *  }
 *)
 * @returns an react event handler
 */
export function createComposedEventHandler<
  T extends Element = Element,
  E extends Event = Event
>(...handlers: EventHandlerComposed<T, E>[]) {
  let i = 0;
  const track = new Map<string, boolean>();
  async function handle(event: SyntheticEvent<T, E>) {
    if (i < handlers.length) {
      const handler = handlers[i];

      handler(event, async (message?: NextArguments) => {
        if (typeof track.get(`event-${i}`) === "undefined") {
          if (typeof message === "function") {
            const cleanup = await Promise.resolve(message(delay));

            if (cleanup) {
              await cleanup(delay);
            }
          }
          if (Array.isArray(message) && message[0] === "info") {
            await Promise.resolve(console.info(message[1]));
          }
          if (Array.isArray(message) && message[0] === "log") {
            await Promise.resolve(console.log(message[1]));
          }
          if (Array.isArray(message) && message[0] === "warn") {
            await Promise.resolve(console.warn(message[1]));
          }
          if (Array.isArray(message) && message[0] === "error") {
            await Promise.resolve(console.error(message[1]));
          }
          i++;
          await Promise.resolve(handle?.(event));
          await Promise.resolve(track.set(`event-${i}`, true));
          return;
        }
      });
    }
  }

  return async (event: SyntheticEvent<T, E>) => {
    await handle(event);
  };
}

/**
 * @description for component creator only
 * @param item props need to pass to custom component
 * @returns base `createComposedEventHandler` handler
 */
export const eventProps = <
  I extends EventHandler<SyntheticEvent<T, E>>,
  T extends Element = Element,
  E extends Event = Event
>(
  item: I | undefined
): EventHandlerComposed<T, E> => {
  return async (
    event: SyntheticEvent<T, E>,
    _next: (message?: NextArguments) => void
  ) => {
    item?.(event);
  };
};
