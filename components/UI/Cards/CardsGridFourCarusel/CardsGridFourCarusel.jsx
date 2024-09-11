import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";

import className from "classnames/bind";
import styles from "./CardsGridFourCarusel.module.scss";
let cx = className.bind(styles);

import { Container } from "../../../Layout/Container";

import ImageNotAvailable from "/public/img/image-not-available.png";

const CardsGridThreeCarusel = ({ data }) => {
	const { titulo, descripcion, items } = data;
	const [nav1, setNav1] = useState(null);
	let sliderRef1 = useRef(null);

	const settings = {
		dots: false,
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

	useEffect(() => {
		setNav1(sliderRef1);
	}, []);

	const nextSlide = () => {
		sliderRef1.slickNext();
	};

	const prevSlide = () => {
		sliderRef1.slickPrev();
	};

	if (!items?.length === 0) {
		return <p>No hay Equipo disponibles.</p>;
	}

	return (
		<section className="CardsGridThreeCarusel">
			<div className={cx("component")}>
				<Container>
					<div className={cx("title")}>
						<div>
							{titulo && (
								<h2 className="heading--40 color--primary">{titulo}</h2>
							)}
							<div
								className="heading--16 color--gray"
								dangerouslySetInnerHTML={{ __html: descripcion }}
							/>
						</div>
						<div className={cx(["arrow", "desktop"])}>
							<button
								className="custom-arrows__prev"
								onClick={prevSlide}
							></button>
							<button
								className="custom-arrows__next"
								onClick={nextSlide}
							></button>
						</div>
					</div>
				</Container>
				<div className="container--slick">
					<Slider ref={(slider) => (sliderRef1 = slider)} {...settings}>
						{items?.map((item, index) => (
							<div key={index}>
								<div className={cx("card")}>
									{item?.imagen?.mediaItemUrl ? (
										<Image
											src={item?.imagen?.mediaItemUrl}
											layout="fill"
											quality={100}
											priority
											sizes="100vw"
											objectFit="cover"
											objectPosition="top"
											alt={item?.imagen?.altText}
											title={item?.imagen?.title}
										/>
									) : (
										<Image
											src={ImageNotAvailable}
											width={372}
											height={400}
											quality={100}
											priority
											sizes="100vw"
											objectFit="cover"
											alt="Imagen no disponible"
											title="no disponible"
										/>
									)}
								</div>
								<div className={cx("name")}>
									{item?.nombre && (
										<h3 className={cx(["heading--24 color--primary"])}>
											{item?.nombre}
										</h3>
									)}
									{item?.rol && (
										<p className="heading--16 color--gray">{item?.rol}</p>
									)}
								</div>
							</div>
						))}
					</Slider>

					<div className={cx(["arrow", "mobile"])}>
						<button
							className="custom-arrows__prev"
							onClick={prevSlide}
						></button>
						<button
							className="custom-arrows__next"
							onClick={nextSlide}
						></button>
					</div>
				</div>
			</div>
		</section>
	);
};

export default CardsGridThreeCarusel;
