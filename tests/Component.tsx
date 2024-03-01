import { useState } from "react";
import {
  createComposedEventHandler as composingEvent,
  createComposedEventHandler,
} from "../src/index";

export function CounterSingleUsage({ async = false }: { async?: boolean }) {
  const [count, setCount] = useState(0);

  if (async) {
    return (
      <div>
        <div data-testid="display">{count}</div>
        <button
          data-testid="increment"
          onClick={composingEvent(async () => {
            setCount(($count) => $count + 1);
          })}
        >
          INCREMENT
        </button>
        <button
          data-testid="decrement"
          onClick={composingEvent(async () => {
            setCount(($count) => $count - 1);
          })}
        >
          DECREMENT
        </button>
      </div>
    );
  }

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

export function CounterMultiUsageWithoutNext({
  async = false,
}: {
  async?: boolean;
}) {
  const [count, setCount] = useState(0);

  if (async) {
    return (
      <div>
        <div data-testid="display">{count}</div>
        <button
          data-testid="increment"
          onClick={composingEvent(
            async () => {
              setCount(($count) => $count + 1);
            },
            async () => {
              console.log("not running");
            }
          )}
        >
          INCREMENT
        </button>
        <button
          data-testid="decrement"
          onClick={composingEvent(
            async () => {
              setCount(($count) => $count - 1);
            },
            async () => {
              console.log("not running");
            }
          )}
        >
          DECREMENT
        </button>
      </div>
    );
  }

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

export function CounterMultiUsageWithNext({
  async = false,
}: {
  async?: boolean;
}) {
  const [count, setCount] = useState(0);

  if (async) {
    return (
      <div>
        <div data-testid="display">{count}</div>
        <button
          data-testid="increment"
          onClick={composingEvent(
            async (_, next) => {
              setCount(($count) => $count + 1);
              next();
            },
            async () => {
              console.log("running");
            }
          )}
        >
          INCREMENT
        </button>
        <button
          data-testid="decrement"
          onClick={composingEvent(
            async (_, next) => {
              setCount(($count) => $count - 1);
              next();
            },
            async () => {
              console.log("running");
            }
          )}
        >
          DECREMENT
        </button>
      </div>
    );
  }

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

export function CounterMultiUsageWithMultiNext({
  async = false,
}: {
  async?: boolean;
}) {
  const [count, setCount] = useState(0);

  if (async) {
    return (
      <div>
        <div data-testid="display">{count}</div>
        <button
          data-testid="increment"
          onClick={createComposedEventHandler(
            async (_, next) => {
              setCount(($count) => $count + 1);
              next();
              next();
              next();
            },
            async () => {
              console.log("running");
            }
          )}
        >
          INCREMENT
        </button>
        <button
          data-testid="decrement"
          onClick={createComposedEventHandler(
            async (_, next) => {
              setCount(($count) => $count - 1);
              next();
              next();
              next();
            },
            async () => {
              console.log("running");
            }
          )}
        >
          DeCREMENT
        </button>
      </div>
    );
  }

  return (
    <div>
      <div data-testid="display">{count}</div>
      <button
        data-testid="increment"
        onClick={createComposedEventHandler(
          (_, next) => {
            setCount(($count) => $count + 1);
            next();
            next();
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
        onClick={createComposedEventHandler(
          (_, next) => {
            setCount(($count) => $count - 1);
            next();
            next();
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

export function CounterWithNextLogger({ async = false }: { async?: boolean }) {
  const [count, setCount] = useState(0);

  if (async) {
    return (
      <div>
        <div data-testid="display">{count}</div>
        <button
          data-testid="increment"
          onClick={createComposedEventHandler(
            async (_, next) => {
              setCount(($count) => $count + 1);
              next(["log", `count decrease to ${count + 1}`]);
            },
            async () => {
              console.log("runner");
            }
          )}
        >
          INCREMENT
        </button>
        <button
          data-testid="decrement"
          onClick={createComposedEventHandler(
            async (_, next) => {
              setCount(($count) => $count - 1);
              next(["log", `count decrease to ${count - 1}`]);
            },
            async () => {
              console.log("runner");
            }
          )}
        >
          DECREMENT
        </button>
      </div>
    );
  }

  return (
    <div>
      <div data-testid="display">{count}</div>
      <button
        data-testid="increment"
        onClick={createComposedEventHandler(
          (_, next) => {
            setCount(($count) => $count + 1);
            next(["log", `count decrease to ${count + 1}`]);
          },
          () => {
            console.log("runner");
          }
        )}
      >
        INCREMENT
      </button>
      <button
        data-testid="decrement"
        onClick={createComposedEventHandler(
          (_, next) => {
            setCount(($count) => $count - 1);
            next(["log", `count decrease to ${count - 1}`]);
          },
          () => {
            console.log("runner");
          }
        )}
      >
        DECREMENT
      </button>
    </div>
  );
}

export function CounterWithNextAction({ async = false }: { async?: boolean }) {
  const [count, setCount] = useState(0);

  if (async) {
    return (
      <div>
        <div data-testid="display">{count}</div>
        <button
          data-testid="increment"
          onClick={createComposedEventHandler(
            async (_, next) => {
              setCount(($count) => $count + 1);
              next(() => {
                console.log("onmount");
                return () => {
                  console.log("cleanup");
                };
              });
            },
            async () => {
              console.log("runner");
            }
          )}
        >
          INCREMENT
        </button>
        <button
          data-testid="decrement"
          onClick={createComposedEventHandler(
            async (_, next) => {
              setCount(($count) => $count - 1);
              next(() => {
                console.log("onmount");
                return () => {
                  console.log("cleanup");
                };
              });
            },
            async () => {
              console.log("runner");
            }
          )}
        >
          DECREMENT
        </button>
      </div>
    );
  }

  return (
    <div>
      <div data-testid="display">{count}</div>
      <button
        data-testid="increment"
        onClick={createComposedEventHandler(
          (_, next) => {
            setCount(($count) => $count + 1);
            next(["log", `count decrease to ${count + 1}`]);
          },
          () => {
            console.log("runner");
          }
        )}
      >
        INCREMENT
      </button>
      <button
        data-testid="decrement"
        onClick={createComposedEventHandler(
          (_, next) => {
            setCount(($count) => $count - 1);
            next(["log", `count decrease to ${count - 1}`]);
          },
          () => {
            console.log("runner");
          }
        )}
      >
        DECREMENT
      </button>
    </div>
  );
}
