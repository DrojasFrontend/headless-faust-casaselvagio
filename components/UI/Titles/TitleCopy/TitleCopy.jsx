import React from "react";
import Image from "next/image";
import Link from "next/link";

import className from "classnames/bind";
import styles from "./TitleCopy.module.scss";
import { Container } from "../../../Layout/Container";
let cx = className.bind(styles);

const TitleCopy = ({ data }) => {
	const { titulo, descripcion } = data;
	return (
		<section className="TitleCopy">
			<div className={cx("component")}>
				<Container>
					<div className={cx("grid")}>
						<h1 className="heading--54 color--primary">{titulo}</h1>
						<div
							className="heading--16"
							dangerouslySetInnerHTML={{ __html: descripcion }}
						/>
					</div>
				</Container>
			</div>
		</section>
	);
};

export default TitleCopy;
