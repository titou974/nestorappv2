import styles from "./style";

const Navbar = ({
  subtitle,
  title,
  transparent,
  position = "sticky",
  endContent,
}: {
  subtitle: string;
  title: string;
  transparent?: boolean;
  position?: string;
  endContent?: React.ReactNode;
}) => {
  if (endContent) {
    return (
      <div
        className={`${position} ${
          transparent
            ? "bg-transparent"
            : "bg-gradient-to-b from-background from-60% to-transparent"
        } min-h-40 left-0 right-0 top-0 z-50 w-full flex items-center justify-between pb-4 pt-10`}
      >
        <div>
          <h3 className={`${styles.subText}`}>{subtitle}</h3>
          <h2 className={`${styles.headText}`}>{title}</h2>
        </div>
        {endContent}
      </div>
    );
  }

  return (
    <div
      className={`${position} ${
        transparent
          ? "bg-transparent"
          : "bg-gradient-to-b from-background from-60% to-transparent"
      } min-h-40 left-0 right-0 top-0 z-50 w-full pb-4 pt-10`}
    >
      <h3 className={`${styles.subText}`}>{subtitle}</h3>
      <h2 className={`${styles.headText}`}>{title}</h2>
    </div>
  );
};

export default Navbar;
