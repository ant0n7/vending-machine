import { cn } from "~/utils";

interface HeaderProps {
  children: React.ReactNode;
  className?: string;
}

export const H1Header = ({ children, className }: HeaderProps) => {
  return (
    <h1 className={cn("mb-4 text-center text-2xl font-bold", className)}>
      {children}
    </h1>
  );
};
