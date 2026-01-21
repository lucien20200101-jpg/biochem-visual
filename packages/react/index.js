export function createElement(tag, props, ...children) {
  return { tag, props: props ?? {}, children };
}

export const Fragment = Symbol("Fragment");
