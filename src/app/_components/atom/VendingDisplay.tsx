interface VendingDisplayProps {
  title: string;
  value?: number;
  className?: string;
}

const VendingDisplay = ({ title, value }: VendingDisplayProps) => (
  <div>
    <h4>{title}</h4>
    <div className="h-5">{value?.toFixed(2)}</div>
  </div>
);

export default VendingDisplay;
