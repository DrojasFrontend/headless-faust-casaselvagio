import React from "react";
import Image from "next/image";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";

import className from "classnames/bind";
import styles from "./CardsGrid.module.scss";
let cx = className.bind(styles);

import { Container } from "../../../Layout/Container";

const CardGrid = ({ data }) => {
	const { titulo, descripcion, targetas } = data;
	var settings = {
		dots: false,
		arrows: false,
		touchMove: false,
		infinite: true,
		speed: 500,
		slidesToShow: 3,
		slidesToScroll: 1,
		responsive: [
			{
				breakpoint: 1024,
				settings: {
					slidesToShow: 2,
					touchMove: true,
					infinite: true,
					centerMode: true,
					centerPadding: "20px",
				},
			},
			{
				breakpoint: 680,
				settings: {
					slidesToShow: 1,
					touchMove: true,
					infinite: true,
					centerMode: true,
					centerPadding: "20px",
				},
			},
		],
	};

	if (!targetas.length === 0) {
		return <p>No hay tarjetas disponibles.</p>;
	}

	console.log(targetas);
	return (
		<section className="CardsGrid">
			<div className={cx(["component"])}>
				<Container>
					<div className={cx("grid")}>
						<h2 className={cx(["heading", "heading--44", "color--primary"])}>
							{titulo}
						</h2>
						<p className="heading--16 color--gray">{descripcion}</p>
					</div>
				</Container>
				<div className="container--slick">
					<Slider {...settings}>
						{targetas.map((targeta, index) => (
							<div key={index} className={cx(["card"])}>
								<Image
									src={targeta?.imagen?.mediaItemUrl}
									width={372}
									height={440}
									quality={100}
									alt={targeta?.altText}
									title={targeta?.title}
									priority
									sizes="100vw"
									
								/>
								<div className={cx(["copy"])}>
									<h3 className="heading--24 color--white">{targeta.titulo}</h3>
									<p className="heading--16 color--white">{targeta.detalle}</p>
								</div>
							</div>
						))}
					</Slider>
				</div>
			</div>
		</section>
	);
};

export default CardGrid;
