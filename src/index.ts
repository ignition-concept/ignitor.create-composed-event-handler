import type { SyntheticEvent, EventHandler } from "react";

export type MessageType = "info" | "log" | "warn" | "error";

export type MessageAction = [MessageType, string] | (() => void);

export interface EventHandlerComposed<
  T extends Element = Element,
  E extends Event = Event
> {
  /**
   * @param next can only using once
   * @param event an react synthetic event
   */
  (event: SyntheticEvent<T, E>, next: (message?: MessageAction) => void): void;
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
  function handle(event: SyntheticEvent<T, E>) {
    if (i < handlers.length) {
      const handler = handlers[i];

      handler(event, (message?: MessageAction) => {
        if (typeof track.get(`event-${i}`) === "undefined") {
          if (typeof message === "function") {
            message();
          }
          if (Array.isArray(message) && message[0] === "info") {
            console.info(message[1]);
          }
          if (Array.isArray(message) && message[0] === "log") {
            console.log(message[1]);
          }
          if (Array.isArray(message) && message[0] === "warn") {
            console.warn(message[1]);
          }
          if (Array.isArray(message) && message[0] === "error") {
            console.error(message[1]);
          }
          i++;
          handle?.(event);
          track.set(`event-${i}`, true);
          return;
        }
      });
    }
  }

  return (event: SyntheticEvent<T, E>) => {
    handle(event);
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
  return (
    event: SyntheticEvent<T, E>,
    _next: (message?: MessageAction) => void
  ) => {
    item?.(event);
  };
};
