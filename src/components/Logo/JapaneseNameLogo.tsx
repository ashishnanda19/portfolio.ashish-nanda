interface JapaneseNameLogoProps {
  size?: number | string;
  className?: string;
  color?: string;
  glowOnHover?: boolean; // NEW
}

const JapaneseNameLogo: React.FC<JapaneseNameLogoProps> = ({
  size = 150,
  className = "",
  color = "white",
  glowOnHover = false,
}) => {
  const height = typeof size === "number" ? size / 3 : size;
  return (
    <svg
      width={size}
      height={height}
      viewBox="0 0 300 100"
      xmlns="http://www.w3.org/2000/svg"
      className={`${className}${glowOnHover ? " japanese-logo-glow" : ""}`}
    >
      <text
        x="0"
        y="75"
        fontFamily="Arial, sans-serif"
        fontWeight="bold"
        fontSize="50"
        fill={color}
        letterSpacing="-5"
      >
アシシュ
      </text>
    </svg>
  );
};

export default JapaneseNameLogo;
