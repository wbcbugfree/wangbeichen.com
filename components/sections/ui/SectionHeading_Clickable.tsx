type SectionHeadingProps = {
  children: React.ReactNode;
  onClick?: () => void;
};

export function SectionHeading_Clickable({
  children,
  onClick,
}: SectionHeadingProps) {
  return (
    <h3
      onClick={onClick}
      className="group relative inline-block cursor-pointer overflow-hidden py-1 heading-section transition-all duration-300 ease-out hover:scale-105"
    >
      <span className="absolute inset-0 origin-left scale-x-0 bg-black dark:bg-white transition-transform duration-300 ease-out group-hover:scale-x-100" />
      <span className="heading-section-sm relative z-10 transition-colors duration-300 group-hover:text-white dark:group-hover:text-black">
        {children}
      </span>
    </h3>
  );
}
