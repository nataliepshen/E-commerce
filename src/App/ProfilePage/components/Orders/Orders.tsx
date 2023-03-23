import React from "react";

import { observer } from "mobx-react-lite";
import rootStore from "store/RootStore/instance";
import { Order } from "store/RootStore/UserStore/types";
import { formatDate } from "utils/formatDate";

import styles from "./Orders.module.scss";

const Orders: React.FC = () => {
  return (
    <div className={styles.ordersContainer}>
      <div className={styles.headingContainer}>
        <h2 className={styles.ordersHeading}>My orders</h2>
      </div>
      {rootStore.user.orderList.map((order: Order, index: number) => (
        <div key={index} className={styles.order}>
          <div className={styles.orderInfo}>
            <h4 className={styles.orderData}>{`Order ${
              order.number
            } from ${formatDate(order.date)}`}</h4>
            <p className={styles.orderStatus}>{order.status}</p>
          </div>
          <div className={styles.orderContent}>
            <div className={styles.orderProducts}>
              {order.products.map((item: string) => (
                <div className={styles.imageContainer}>
                  <img className={styles.image} src={item} alt="" />
                </div>
              ))}
            </div>
            <p
              className={styles.orderTotal}
            >{`Total: $${order.totalAmount.toFixed(2)}`}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default observer(Orders);
