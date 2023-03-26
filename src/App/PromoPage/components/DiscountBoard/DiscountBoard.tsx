import React from "react";

import Button from "components/Button";
import { Link } from "react-router-dom";
import rootStore from "store/RootStore/instance";

import styles from "./DiscountBoard.module.scss";

const DiscountBoard: React.FC = () => {
  const discount = rootStore.user.getDiscount();
  const discountList = [5, 30, 15, 50, 10, 25, 45, 12, 20, 35, 40];
  const [isDisabled, setIsDisabled] = React.useState(false);
  const [isDiscount, setIsDiscount] = React.useState(discount !== null);
  const [item, setItem] = React.useState(0);
  let index = 0;
  const start = () => {
    setItem(discountList[index]);
    if (index < discountList.length - 1) {
      index++;
    } else {
      index = 0;
    }
  };

  let timerID: number;
  const startClick = () => {
    timerID = window.setInterval(start, 100);
    document.getElementById("stop")?.addEventListener("click", () => {
      clearInterval(timerID);
      if (index === 0) {
        rootStore.user.setDiscount(discountList[discountList.length - 1]);
      } else {
        rootStore.user.setDiscount(discountList[index - 1]);
      }
      setTimeout(() => setIsDiscount(true), 500);
    });
  };

  return (
    <div className={styles.container}>
      {isDiscount ? (
        <>
          <h3 className={styles.congrats}>Congratulations!</h3>
          <p className={styles.discountPar}>Your personal discount is</p>
        </>
      ) : (
        <>
          <p className={styles.clickPar}>
            Click on the button and catch your personal discount!
          </p>
          <Button
            className={styles.button}
            onClick={() => {
              startClick();
              setIsDisabled(true);
            }}
            disabled={isDisabled}
          >
            Start
          </Button>
        </>
      )}
      <div className={styles.discount}>
        {isDiscount ? `${discount}%` : `${item}`}
      </div>
      {isDiscount ? (
        <Link to="/">
          <Button className={styles.button}>Start shopping</Button>
        </Link>
      ) : (
        <Button className={styles.button} id="stop">
          Stop
        </Button>
      )}
    </div>
  );
};

export default DiscountBoard;
