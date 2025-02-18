const defaultDisplay = console.log;
const defaultTransform = (N: number) => N;

export const displayRange = ({
  start,
  end,
  display = defaultDisplay,
  transform = defaultTransform,
}: {
  start: number;
  end: number;
  display?: (message: any) => void;
  transform?: (N: number) => any;
}) => {
  for (let i = start; i <= end; i++) {
    display(transform(i));
  }
};
