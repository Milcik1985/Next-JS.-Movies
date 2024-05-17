import React from "react";
import styles from "./Button.module.css";
import Spinner from "../Spinner/Spinner";

type ButtonProps = {
  onClick: () => void;
  isLoading: boolean;
  title: string;
  type?: "WARNING" | "NORMAL";
  className?: string;
};

const Button = ({
  onClick,
  isLoading,
  title,
  type,
  className,
}: ButtonProps) => {
  return (
    <button
      className={`${styles.btn} ${type === "WARNING" ? styles.warning : ""} ${
        className ? className : ""
      }`}
      onClick={onClick}
      disabled={isLoading}
    >
      {isLoading ? <Spinner /> : <>{title}</>}
    </button>
  );
};

export default Button;
