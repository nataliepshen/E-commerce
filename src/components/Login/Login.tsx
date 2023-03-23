import React from "react";

import classnames from "classnames/bind";
import Button from "components/Button";
import Container from "components/Container";
import { observer } from "mobx-react-lite";
import rootStore from "store/RootStore/instance";

import styles from "./Login.module.scss";

const Login: React.FC = () => {
  const [userName, setUserName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const handleSubmitRegister = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    rootStore.user.setFailed(false);
    rootStore.user.createUser({
      name: userName,
      email: email,
      password: password,
      avatar: "https://api.lorem.space/image/face?w=640&h=480&r=867",
    });
  };
  const handleSubmitSignIn = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    rootStore.user.setFailed(false);
    rootStore.user.authUser({
      email: email,
      password: password,
    });
  };
  const cx = classnames.bind(styles);

  return (
    <Container>
      <div
        className={cx({
          loginContainer: true,
          loginContainer_short: rootStore.user.isSignIn,
          loginContainer_failed: rootStore.user.isFailed,
        })}
      >
        <div className={styles.linksContainer}>
          <div
            className={cx({
              linkDiv: true,
              linkDiv_active: rootStore.user.isSignIn,
            })}
            onClick={rootStore.user.onSignIn}
          >
            <p className={styles.link}>Sign in</p>
          </div>
          <div
            className={cx({
              linkDiv: true,
              linkDiv_active: rootStore.user.isRegister,
            })}
            onClick={rootStore.user.onRegister}
          >
            <p className={styles.link}>Register</p>
          </div>
        </div>
        <h3 className={styles.loginHeading}>
          {rootStore.user.isSignIn ? `Sign in` : `Create your account`}
        </h3>
        {rootStore.user.isFailed && (
          <p className={styles.warning}>
            Your email address or password is not correct or is not registered
            at Lalasia.com
          </p>
        )}
        <form
          className={styles.form}
          onSubmit={
            rootStore.user.isSignIn ? handleSubmitSignIn : handleSubmitRegister
          }
        >
          {rootStore.user.isRegister && (
            <>
              <label htmlFor="userName" className={styles.formLabel}>
                Your name
              </label>
              <input
                type="text"
                id="userName"
                className={styles.formInput}
                placeholder="Enter your name"
                onChange={(event) => setUserName(event.target.value)}
              />
            </>
          )}
          <label htmlFor="email" className={styles.formLabel}>
            Email
          </label>
          <input
            type="text"
            id="email"
            className={styles.formInput}
            placeholder="Enter email"
            onChange={(event) => {
              setEmail(event.target.value);
              rootStore.user.setFailed(false);
            }}
          />
          <label htmlFor="password" className={styles.formLabel}>
            Password
          </label>
          <input
            type="password"
            id="password"
            className={styles.formInput}
            placeholder="Enter password"
            onChange={(event) => {
              setPassword(event.target.value);
              rootStore.user.setFailed(false);
            }}
          />
          <Button className={styles.loginButton}>
            {rootStore.user.isSignIn ? `Enter` : `Register`}
          </Button>
        </form>
        {rootStore.user.isRegister ? (
          <p className={styles.loginPar}>
            Already have an account?{" "}
            <span className={styles.signSpan} onClick={rootStore.user.onSignIn}>
              Sign in
            </span>
          </p>
        ) : (
          <p className={styles.loginPar}>
            Don't have an account?{" "}
            <span
              className={styles.signSpan}
              onClick={rootStore.user.onRegister}
            >
              Register
            </span>
          </p>
        )}
      </div>
    </Container>
  );
};

export default observer(Login);
