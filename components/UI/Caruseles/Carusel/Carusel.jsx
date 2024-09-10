import React from "react";
import Image from "next/image";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";

import className from "classnames/bind";
import styles from "./Carusel.module.scss";
let cx = className.bind(styles);

const Carusel = ({ data }) => {
	const { galeria } = data;
	var settings = {
		dots: false,
		arrows: false,
		touchMove: true,
		infinite: true,
		speed: 500,
		slidesToShow: 4,
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

	if (!galeria.length === 0) {
		return <p>No hay galeria disponibles.</p>;
	}

	return (
		<section className={cx("component")}>
			<Slider {...settings}>
				{galeria.map((img, index) => (
					<div key={index} className={cx(["img"])}>
						<Image
							src={img?.mediaItemUrl}
							width={372}
							height={540}
							quality={100}
							priority
							sizes="100vw"
							objectFit="cover"
							alt={img?.altTxt}
							title={img?.title}
						/>
					</div>
				))}
			</Slider>
		</section>
	);
};

export default Carusel;
