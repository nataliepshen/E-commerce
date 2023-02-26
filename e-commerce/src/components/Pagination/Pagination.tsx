import usePagination, { usePaginationProps } from "@components/usePagination";
import classnames from "classnames/bind";

import styles from "./Pagination.module.scss";

export type PaginationProps = usePaginationProps & {
  onPageChange: (value: number) => void;
  className?: string;
};

const Pagination: React.FC<PaginationProps> = ({
  totalProducts,
  productsPerPage,
  currentPage,
  onPageChange,
}) => {
  const pageArray = usePagination({
    totalProducts,
    productsPerPage,
    currentPage,
  });

  const onNext = () => {
    onPageChange(currentPage + 1);
  };

  const onPrev = () => {
    onPageChange(currentPage - 1);
  };
  let lastPage = pageArray[pageArray.length - 1];
  let cx = classnames.bind(styles);
  return (
    <div className={styles.container}>
      <button
        className={`${styles.button} ${styles.btn_prev}`}
        disabled={currentPage === 1}
        onClick={onPrev}
      ></button>
      <ul className={styles.page_list}>
        {pageArray.map((page) => {
          if (typeof page === "string") {
            return (
              <li
                key={Math.random() * 100}
                className={`${styles.page_item} ${styles.ellipsis}`}
              >
                {"..."}
              </li>
            );
          }
          return (
            <li
              key={page}
              className={cx({
                page_item: true,
                selected: page === currentPage,
              })}
              onClick={() => onPageChange(page)}
            >
              {page}
            </li>
          );
        })}
      </ul>
      <button
        className={styles.button}
        disabled={currentPage === lastPage}
        onClick={onNext}
      ></button>
    </div>
  );
};

export default Pagination;
