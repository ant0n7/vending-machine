import { type ChangeEvent } from "react";
import { cn } from "~/utils";

interface SpanInputRowProps {
  shouldEdit?: boolean;
  value?: SN;
  type?: "text" | "number";
  onChange?(event: ChangeEvent<HTMLInputElement>): void;
  className?: string;
}

const InventoryEditableRow = (props: SpanInputRowProps) => {
  // eslint-disable-next-line @typescript-eslint/unbound-method
  const { shouldEdit, type = "text", value, onChange, className } = props;

  if (!shouldEdit) {
    return <span className={className}>{value}</span>;
  }

  return (
    <input
      className={cn(
        "h-full w-full rounded border border-white border-opacity-30 bg-transparent outline-none",
        "focus:border-opacity-70",
        className,
      )}
      defaultValue={value}
      onChange={onChange}
      type={type}
    />
  );
};

export default InventoryEditableRow;
