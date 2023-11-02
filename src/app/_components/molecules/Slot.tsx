import type { ReactElement } from "react";
import { cloneElement } from "react";
import { Children } from "react";

type SlotProps<Props> = Props & {
  children: ReactElement<Props>;
};

const Slot = <Props,>({ children, ...rest }: SlotProps<Props>) => {
  const clonedChildren = Children.map(children, (child: ReactElement) => {
    return cloneElement(child, { ...rest });
  });

  return clonedChildren;
};

export default Slot;
