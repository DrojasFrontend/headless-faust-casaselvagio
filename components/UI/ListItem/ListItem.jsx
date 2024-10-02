import React from "react";
import Image from "next/image";

import className from "classnames/bind";
import styles from "./ListItem.module.scss";
let cx = className.bind(styles);

import IconCheck from "../../SVG/IconCheck";

const ListItem = ({ data }) => {
	const { titulo, icono } = data;
	return (
		<li className={cx("listitem")}>
			{icono?.mediaItemUrl ? (
				<span>
					<Image
            src={icono?.mediaItemUrl}
            width={40}
            height={40}
            alt={titulo}
          />
				</span>
			) : (
				<span className={cx("icon")}>
					<IconCheck />
				</span>
			)}

			<p className="heading--16 color--primary">{titulo}</p>
		</li>
	);
};

export default ListItem;
