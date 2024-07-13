declare global {
  type CustomEvent<T = EventTarget> = {
    target: T;
  };
}
