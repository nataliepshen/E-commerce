import React from "react";

import classNames from "classnames/bind";

import styles from "./Section.module.scss";

export type SectionProps = {
  children: string;
  active?: boolean;
};

const Section: React.FC<SectionProps> = ({ children, active }) => {
  let cx = classNames.bind(styles);
  let sectionClass = cx({
    section: true,
    section_active: active,
  });
  return <div className={sectionClass}>{children}</div>;
};

export default Section;
