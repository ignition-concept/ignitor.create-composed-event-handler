import { render, fireEvent } from "@testing-library/react";
import {
  CounterSingleUsage,
  CounterMultiUsageWithNext,
  CounterMultiUsageWithoutNext,
} from "./Component";

describe("test: `createComposedEventHandler` it should works", (it) => {
  const $console = vi.spyOn(console, "log").mockImplementation(() => undefined);

  afterEach(() => {
    $console.mockClear();
  });

  it("with only one time", async () => {
    const screen = render(<CounterSingleUsage />);

    const display = await screen.findByTestId("display");
    const increment = await screen.findByTestId("increment");
    const decrement = await screen.findByTestId("decrement");

    fireEvent.click(increment);

    expect(display.textContent).toBe(String(1));

    fireEvent.click(decrement);

    expect(display.textContent).toBe(String(0));
  });

  it("with not only one time", async () => {
    const screen = render(<CounterMultiUsageWithoutNext />);

    const display = await screen.findByTestId("display");
    const increment = await screen.findByTestId("increment");
    const decrement = await screen.findByTestId("decrement");

    fireEvent.click(increment);

    expect(display.textContent).toBe(String(1));
    expect($console).not.toBeCalled();

    fireEvent.click(decrement);

    expect(display.textContent).toBe(String(0));
    expect($console).not.toBeCalled();
  });

  it("with only one time", async () => {
    const screen = render(<CounterMultiUsageWithNext />);

    const display = await screen.findByTestId("display");
    const increment = await screen.findByTestId("increment");
    const decrement = await screen.findByTestId("decrement");

    fireEvent.click(increment);

    expect(display.textContent).toBe(String(1));
    expect($console).toBeCalled();

    fireEvent.click(decrement);

    expect(display.textContent).toBe(String(0));
    expect($console).toBeCalled();
  });
});
