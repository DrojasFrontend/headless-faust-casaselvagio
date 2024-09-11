import React from "react";

import className from "classnames/bind";
import styles from "./ListItem.module.scss";
let cx = className.bind(styles);

import IconCheck from "../../SVG/IconCheck";

const ListItem = ({data}) => {
  const {titulo} = data;
  return (
    <li className={cx("listitem")}>
      <span className={cx("icon")}>
        <IconCheck />
      </span>
      <p className="heading--16 color--primary">{titulo}</p>
    </li>
  );
};

export default ListItem;
