# React Event Composer

## Installation

```bash
# for npm
npm i @ignition-concept/create-composed-event-handler

# for yarn
yarn add @ignition-concept/create-composed-event-handler

# for pnpm
pnpm install @ignition-concept/create-composed-event-handler
```

## Usage

```tsx
import { createComposedEventHandler } from "@ignition-concept/create-composed-event-handler";

export default function MyButtonNeedMultipleFunctionHandler() {
  return (
    <button
      onClick={createComposedEventHandler(
        (_, next) => {
          console.log("my first function!!!!!!!!");

          next(["log", "hello am i too loud?"]);
          // next(["warn", "hello am i too loud?"]);
          // next(["info", "hello am i too loud?"]);
          // next(["error", "hello am i too loud?"]);
          /**
           * just an experimantal using at your own risk
           *
           * next(async () => {
           *  const cleanup = await doingSomeTasks()
           *
           *    return async () => {
           *       await cleanup()
           *    }
           * })
           */
        },
        (event) => {
          console.log(event.target.tagName);
        }
      )}
    >
      My Button
    </button>
  );
}
```

## Features

- easy debug each function
- can be chain multiple function
- you can log when the current function end
