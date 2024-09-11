import React from "react";
import Image from "next/image";
import Link from "next/link";

import className from "classnames/bind";
import styles from "./CardsGridTwo.module.scss";
let cx = className.bind(styles);

import { Container } from "../../../Layout/Container";

const CardsGridTwo = ({ data }) => {
	const { titulo, descripcion, items } = data;

	if (!items?.length === 0) {
		return <p>No hay Targetas disponibles.</p>;
	}
	return (
		<section className="CardsGridTwo">
			<div className={cx("component")}>
				<Container>
					<div className={cx(["title", "desktop"])}>
						{titulo && <h2 className="heading--40 color--primary">{titulo}</h2>}
						<div
							className="heading--16 color--gray"
							dangerouslySetInnerHTML={{ __html: descripcion }}
						/>
					</div>
					<div className={cx("grid")}>
						{items?.map((item, index) => (
							<div key={index} className={cx("card")}>
								<Image
									src={item?.imagen?.mediaItemUrl}
									layout="fill"
									quality={100}
									priority
									sizes="100vw"
									objectFit="cover"
									alt={item?.imagen?.altText}
									title={item?.imagen?.title}
								/>
								<div className={cx("title")}>
									<h3
										className={cx(["card-title", "heading--20 color--white"])}
									>
										Vista hotel 01
									</h3>
									<p className="heading--16 color--white">
										Lorem ipsum dolor sit amet, consectetur eiusmod tempor.
									</p>
								</div>
							</div>
						))}
					</div>
				</Container>
			</div>
		</section>
	);
};

export default CardsGridTwo;
