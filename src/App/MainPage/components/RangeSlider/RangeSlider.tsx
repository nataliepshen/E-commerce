import React from "react";

import ReactSlider from "react-slider";

import styles from "./RangeSlider.module.scss";

export type RangeSliderProps = {
  handleChange: (value: number[]) => void;
  left: number;
  right: number;
  onAfterChange: VoidFunction;
};

const RangeSlider: React.FC<RangeSliderProps> = ({
  handleChange,
  left,
  right,
  onAfterChange,
}) => {
  return (
    <div className={styles.slider_container}>
      <h4 className={styles.slider_heading}>Filter by price</h4>
      <ReactSlider
        className={styles.horizontal_slider}
        thumbClassName={styles.example_thumb}
        trackClassName={styles.example_track}
        max={1000}
        value={[left, right]}
        ariaLabel={["Lower thumb", "Upper thumb"]}
        ariaValuetext={(state) => `Thumb value ${state.valueNow}`}
        minDistance={0}
        onChange={handleChange}
        onAfterChange={onAfterChange}
      />
      <div className={styles.thumbs_container}>
        <div className={styles.thumb}>
          from <span className={styles.price}>{left}</span>
        </div>
        <div className={styles.thumb}>
          to <span className={styles.price}>{right}</span>
        </div>
      </div>
    </div>
  );
};

export default RangeSlider;
