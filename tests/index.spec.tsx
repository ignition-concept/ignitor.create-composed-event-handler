import { render, fireEvent, act } from "@testing-library/react";
import {
  CounterSingleUsage,
  CounterMultiUsageWithNext,
  CounterMultiUsageWithoutNext,
  CounterMultiUsageWithMultiNext,
  CounterWithNextAction,
  CounterWithNextLogger,
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

    act(() => fireEvent.click(increment));

    expect(display.textContent).toBe(String(1));

    act(() => fireEvent.click(decrement));

    expect(display.textContent).toBe(String(0));
  });

  it("with only one time and async", async () => {
    const screen = render(<CounterSingleUsage async />);

    const display = await screen.findByTestId("display");
    const increment = await screen.findByTestId("increment");
    const decrement = await screen.findByTestId("decrement");

    act(() => fireEvent.click(increment));

    expect(display.textContent).toBe(String(1));

    act(() => fireEvent.click(decrement));

    expect(display.textContent).toBe(String(0));
  });

  it("with not only one time and without using next", async () => {
    const screen = render(<CounterMultiUsageWithoutNext />);

    const display = await screen.findByTestId("display");
    const increment = await screen.findByTestId("increment");
    const decrement = await screen.findByTestId("decrement");

    act(() => fireEvent.click(increment));

    expect(display.textContent).toBe(String(1));
    expect($console).not.toBeCalled();

    act(() => fireEvent.click(decrement));

    expect(display.textContent).toBe(String(0));
    expect($console).not.toBeCalled();
  });

  it("with not only one time and without using next and async", async () => {
    const screen = render(<CounterMultiUsageWithoutNext async />);

    const display = await screen.findByTestId("display");
    const increment = await screen.findByTestId("increment");
    const decrement = await screen.findByTestId("decrement");

    act(() => fireEvent.click(increment));

    expect(display.textContent).toBe(String(1));
    expect($console).not.toBeCalled();

    act(() => fireEvent.click(decrement));

    expect(display.textContent).toBe(String(0));
    expect($console).not.toBeCalled();
  });

  it("with not only one time and with next", async () => {
    const screen = render(<CounterMultiUsageWithNext />);

    const display = await screen.findByTestId("display");
    const increment = await screen.findByTestId("increment");
    const decrement = await screen.findByTestId("decrement");

    act(() => fireEvent.click(increment));

    expect(display.textContent).toBe(String(1));
    expect($console).toBeCalled();

    act(() => fireEvent.click(decrement));

    expect(display.textContent).toBe(String(0));
    expect($console).toBeCalled();
  });

  it("with not only one time and with next and async", async () => {
    const screen = render(<CounterMultiUsageWithNext async />);

    const display = await screen.findByTestId("display");
    const increment = await screen.findByTestId("increment");
    const decrement = await screen.findByTestId("decrement");

    act(() => fireEvent.click(increment));

    expect(display.textContent).toBe(String(1));
    expect($console).toBeCalled();

    act(() => fireEvent.click(decrement));

    expect(display.textContent).toBe(String(0));
    expect($console).toBeCalled();
  });

  it("with not only one time and with multiple next", async () => {
    const screen = render(<CounterMultiUsageWithMultiNext />);

    const display = await screen.findByTestId("display");
    const increment = await screen.findByTestId("increment");
    const decrement = await screen.findByTestId("decrement");

    act(() => fireEvent.click(increment));

    expect(display.textContent).toBe(String(1));
    expect($console).toBeCalled();

    act(() => fireEvent.click(decrement));

    expect(display.textContent).toBe(String(0));
    expect($console).toBeCalled();
  });

  it("with not only one time and with multiple next and async", async () => {
    const screen = render(<CounterMultiUsageWithMultiNext async />);

    const display = await screen.findByTestId("display");
    const increment = await screen.findByTestId("increment");
    const decrement = await screen.findByTestId("decrement");

    act(() => fireEvent.click(increment));

    expect(display.textContent).toBe(String(1));
    expect($console).toBeCalled();

    act(() => fireEvent.click(decrement));

    expect(display.textContent).toBe(String(0));
    expect($console).toBeCalled();
  });

  it("with not only one time and with next logger", async () => {
    const screen = render(<CounterWithNextLogger />);

    const display = await screen.findByTestId("display");
    const increment = await screen.findByTestId("increment");
    const decrement = await screen.findByTestId("decrement");

    act(() => fireEvent.click(increment));

    expect(display.textContent).toBe(String(1));
    expect($console).toBeCalled();

    act(() => fireEvent.click(decrement));

    expect(display.textContent).toBe(String(0));
    expect($console).toBeCalled();
  });

  it("with not only one time and with next logger and async", async () => {
    const screen = render(<CounterWithNextLogger async />);

    const display = await screen.findByTestId("display");
    const increment = await screen.findByTestId("increment");
    const decrement = await screen.findByTestId("decrement");

    act(() => fireEvent.click(increment));

    expect(display.textContent).toBe(String(1));
    expect($console).toBeCalled();

    act(() => fireEvent.click(decrement));

    expect(display.textContent).toBe(String(0));
    expect($console).toBeCalled();
  });

  it("with not only one time and with next action", async () => {
    const screen = render(<CounterWithNextAction />);

    const display = await screen.findByTestId("display");
    const increment = await screen.findByTestId("increment");
    const decrement = await screen.findByTestId("decrement");

    act(() => fireEvent.click(increment));

    expect(display.textContent).toBe(String(1));
    expect($console).toBeCalled();

    act(() => fireEvent.click(decrement));

    expect(display.textContent).toBe(String(0));
    expect($console).toBeCalled();
  });

  it("with not only one time and with next action and async", async () => {
    const screen = render(<CounterWithNextAction async />);

    const display = await screen.findByTestId("display");
    const increment = await screen.findByTestId("increment");
    const decrement = await screen.findByTestId("decrement");

    act(() => fireEvent.click(increment));

    expect(display.textContent).toBe(String(1));
    expect($console).toBeCalled();

    act(() => fireEvent.click(decrement));

    expect(display.textContent).toBe(String(0));
    expect($console).toBeCalled();
  });
});
