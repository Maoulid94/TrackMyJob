import React from "react";
interface Props {
  title: string;
  handleClick: () => void;
}
const ActionButton = ({ title, handleClick }: Props) => {
  return <button onClick={handleClick}>{title}</button>;
};

export default ActionButton;
