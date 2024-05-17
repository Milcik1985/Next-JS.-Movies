import React, { useState } from "react";
import styles from "./LoginForm.module.css";
import axios from "axios";
import { useRouter } from "next/router";
import Button from "../Button/Button";
import cookie from "js-cookie";

const LoginForm = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isError, setError] = useState(false);
  const [isWrongData, setWrongData] = useState(false);
  const [isLoading, setLoading] = useState(false);

  const onLogin = async () => {
    setLoading(true);
    const loginData = {
      email: email,
      password: password,
    };

    if (!email || !password) {
      setError(true);
      return;
    }

    setError(false);
    try {
      const response = await axios.post(
        `${process.env.SERVER_URL}/users/login`,
        loginData
      );

      if (response.status === 200) {
        setWrongData(false);
        console.log(response);
        cookie.set("jwt_token", response.data.jwt);
        router.push("/");
      }
      console.log("response", response);
    } catch (err) {
      setWrongData(true);
      console.log("Error:", err);
      setLoading(true);
    }
  };

  return (
    <div className={styles.inputWrapper}>
      <div className={styles.blurBackground}>
        <div className={styles.content}>
          <p className={styles.p}>Login Here</p>
          <input
            className={styles.input}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="email"
          />

          <input
            className={styles.input}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="password"
          />

          <Button onClick={onLogin} isLoading={isLoading} title="Login" />
        </div>
      </div>

      {isError && (
        <div className={styles.errorMessage}>Please fill all the inputs</div>
      )}

      {isWrongData && (
        <div className={styles.errorMessage}>Provided Data is Incorrect</div>
      )}
    </div>
  );
};

export default LoginForm;
