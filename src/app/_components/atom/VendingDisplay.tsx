interface VendingDisplayProps {
  title: string;
  value?: SN;
  className?: string;
}

const VendingDisplay = ({ title, value }: VendingDisplayProps) => (
  <div>
    <h4>{title}</h4>
    <div>{value}</div>
  </div>
);

export default VendingDisplay;
