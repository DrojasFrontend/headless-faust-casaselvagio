import React from "react";
import Image from "next/image";
import Link from "next/link";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";

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

	var settings = {
		dots: true,
		arrows: false,
		infinite: true,
		speed: 500,
		fade: false,
		slidesToShow: 1,
		slidesToScroll: 1,
	};

	return (
		<section className="sectionTextImage">
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
								<Slider {...settings}>
									{item?.imagen.map((img, idx) => (
										<div key={idx} className={cx("slide")}>
											<Image
												src={img?.mediaItemUrl}
												layout="fill"
												quality={100}
												priority
												objectFit="cover"
												alt={img?.altText}
												title={img?.title}
											/>
										</div>
									))}
								</Slider>
							</div>
						</div>
					))}
				</Container>
			</div>
		</section>
	);
};

export default TextImage;
