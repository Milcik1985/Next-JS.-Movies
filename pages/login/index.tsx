import React, { useEffect } from "react";
import Header from "../../components/Header/Header";
import { links } from "../../constance/links";
import LoginForm from "../../components/LoginForm/LoginForm";
import styles from "./login.module.css";

const Index = () => {
  return (
    <div className={styles.main}>
      <Header links={links} />
      <LoginForm />
    </div>
  );
};

export default Index;
