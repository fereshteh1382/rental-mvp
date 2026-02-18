
export const buttonHandlers: Record<string, () => void> = {};

// ثبت handler
export function registerButtonHandler(name: string, handler: () => void) {
  buttonHandlers[name] = handler;
 
}

// گرفتن handler
export function getButtonHandler(name?: string) {
  if (name && buttonHandlers[name]) return buttonHandlers[name];
  return undefined;
}
