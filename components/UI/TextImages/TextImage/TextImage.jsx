import React from "react";
import Image from "next/image";
import Link from "next/link";

import className from "classnames/bind";
import styles from "./TextImage.module.scss";
let cx = className.bind(styles);

import { ListItem } from "../../ListItem";
import { Container } from "../../../Layout/Container";

const TextImage = ({ data }) => {
	const { items } = data;

	if (!items?.length === 0) {
		return <p>No hay slides disponibles.</p>;
	}

	return (
		<section className="">
			<div className={cx("component")}>
				<Container>
					{items?.map((item, index) => (
						<div key={index} className={cx(["grid", item?.estilo])}>
							<div className={cx("content")}>
								<h2 className="heading--40 color--primary">{item?.titulo}</h2>
								<div
									className="heading--16 color--gray"
									dangerouslySetInnerHTML={{ __html: item?.descripcion }}
								/>
								<div className={cx("listitems")}>
									{item?.items &&
										item?.items?.length > 0 &&
										item?.items?.map((item, index) => (
											<div key={index}>
												<ListItem data={item} />
											</div>
										))}
								</div>
								{item?.cta && (
									<Link href="#">
										<a className="button button--primary">Reservar</a>
									</Link>
								)}
							</div>
							<div className={cx("img")}>
								<Image
									src={item?.imagen?.mediaItemUrl}
									layout="fill"
									quality={100}
									priority
									sizes="100vw"
									alt={item?.imagen?.altText}
									title={item?.imagen?.title}
								/>
							</div>
						</div>
					))}
				</Container>
			</div>
		</section>
	);
};

export default TextImage;
