import { type SVGProps } from "react";
import { cn } from "~/utils";
import Slot from "../molecules/Slot";
import { type MouseEvent } from "react";

const Icons = {
  Pencil: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="h-6 w-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
      />
    </svg>
  ),
  Trash: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="h-6 w-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
      />
    </svg>
  ),
  RiCheck: (
    <svg
      stroke="currentColor"
      fill="currentColor"
      strokeWidth="0"
      viewBox="0 0 16 16"
      height="1em"
      width="1em"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M12.354 4.354a.5.5 0 0 0-.708-.708L5 10.293 1.854 7.146a.5.5 0 1 0-.708.708l3.5 3.5a.5.5 0 0 0 .708 0l7-7zm-4.208 7-.896-.897.707-.707.543.543 6.646-6.647a.5.5 0 0 1 .708.708l-7 7a.5.5 0 0 1-.708 0z"></path>
      <path d="m5.354 7.146.896.897-.707.707-.897-.896a.5.5 0 1 1 .708-.708z"></path>
    </svg>
  ),
  RiClear: (
    <svg
      stroke="currentColor"
      fill="currentColor"
      strokeWidth="0"
      viewBox="0 0 24 24"
      height="1em"
      width="1em"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path fill="none" d="M0 0h24v24H0V0z"></path>
      <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"></path>
    </svg>
  ),
};

type AllIcons = keyof typeof Icons;

type SVGElement = SVGProps<SVGSVGElement>;
interface IconProps extends SVGElement {
  icon: AllIcons;
  size?: number;
}

export const IconsBox = ({ icon, className, size, ...props }: IconProps) => {
  const Element = Icons[icon];

  return (
    <Slot<SVGElement>
      width={size}
      height={size}
      {...props}
      className={cn("fill-white", className)}
    >
      {Element}
    </Slot>
  );
};

export interface IconButtonProps {
  onClick?(event: MouseEvent<HTMLButtonElement>): void;
  className?: string;
  icon: AllIcons;
  iconProps?: Omit<IconProps, "icon">;
  type?: React.ComponentProps<"button">["type"];
}
export const IconButton = (props: IconButtonProps) => {
  // eslint-disable-next-line @typescript-eslint/unbound-method
  const { icon, onClick, className, iconProps, type } = props;

  return (
    <button type={type ?? "button"} className={cn(className)} onClick={onClick}>
      <IconsBox icon={icon} {...iconProps} />
    </button>
  );
};
