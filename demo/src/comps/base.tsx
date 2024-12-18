export const Double = (props: { className?: string; number: number }) => {
  return <div className={props.className}>{props.number * 2}</div>;
};
