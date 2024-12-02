type ButtonProps = {
  onClick: () => void;
  text: string;
};

function Button({ text }: ButtonProps) {
  return <button>{text}</button>;
}

export default Button;
