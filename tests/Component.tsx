import { useState } from "react";
import { createComposedEventHandler as composingEvent } from "../src/index";

export function CounterSingleUsage() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <div data-testid="display">{count}</div>
      <button
        data-testid="increment"
        onClick={composingEvent(() => {
          setCount(($count) => $count + 1);
        })}
      >
        INCREMENT
      </button>
      <button
        data-testid="decrement"
        onClick={composingEvent(() => {
          setCount(($count) => $count - 1);
        })}
      >
        DECREMENT
      </button>
    </div>
  );
}

export function CounterMultiUsageWithoutNext() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <div data-testid="display">{count}</div>
      <button
        data-testid="increment"
        onClick={composingEvent(
          () => {
            setCount(($count) => $count + 1);
          },
          () => {
            console.log("not running");
          }
        )}
      >
        INCREMENT
      </button>
      <button
        data-testid="decrement"
        onClick={composingEvent(
          () => {
            setCount(($count) => $count - 1);
          },
          () => {
            console.log("not running");
          }
        )}
      >
        DECREMENT
      </button>
    </div>
  );
}

export function CounterMultiUsageWithNext() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <div data-testid="display">{count}</div>
      <button
        data-testid="increment"
        onClick={composingEvent(
          (_, next) => {
            setCount(($count) => $count + 1);
            next();
          },
          () => {
            console.log("running");
          }
        )}
      >
        INCREMENT
      </button>
      <button
        data-testid="decrement"
        onClick={composingEvent(
          (_, next) => {
            setCount(($count) => $count - 1);
            next();
          },
          () => {
            console.log("running");
          }
        )}
      >
        DECREMENT
      </button>
    </div>
  );
}
