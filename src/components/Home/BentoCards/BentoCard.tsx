interface BentoCardProps {
  children?: React.ReactNode;
  className?: string;
  noBorder?: boolean;
}

const BentoCard: React.FC<BentoCardProps> = ({
  children,
  className = "",
  noBorder,
}) => {
  return (
    <div
      className={`BentoCard${
        noBorder ? " BentoCard--noBorder" : ""
      } ${className}`}
    >
      {children}
    </div>
  );
};

export default BentoCard;
