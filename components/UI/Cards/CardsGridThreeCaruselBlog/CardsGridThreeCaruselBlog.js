import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";

import classNames from "classnames/bind";
import styles from "./CardsGridThreeCaruselBlog.module.scss";
let cx = classNames.bind(styles);

import { Container } from "../../../Layout/Container";

import ImageNotAvailable from "/public/img/image-not-available.png";

const CardsGridThreeCaruselBlog = ({ data }) => {
	const [nav1, setNav1] = useState(null);
	let sliderRef1 = useRef(null);

	const settings = {
		dots: false,
		arrows: true,
		infinite: true,
		speed: 500,
		fade: false,
		slidesToShow: 4,
		slidesToScroll: 1,
		responsive: [
			{
				breakpoint: 1280,
				settings: {
					slidesToShow: 3,
					slidesToScroll: 1,
				},
			},
			{
				breakpoint: 1024,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 1,
				},
			},
			{
				breakpoint: 900,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1,
				},
			},
		],
	};

	useEffect(() => {
		setNav1(sliderRef1);
	}, []);

	const nextSlide = () => {
		sliderRef1?.slickNext();
	};

	const prevSlide = () => {
		sliderRef1?.slickPrev();
	};

	if (!data?.length) {
		return <p>No hay Entradas disponibles.</p>;
	}

	// Ordenar los posts de manera aleatoria
	const shuffledData = [...data].sort(() => 0.5 - Math.random());

	return (
		<section className="CardsGridThreeCaruselBlog">
			<div className={cx(["component"])}>
				<div className={cx("container")}>
					<div className={cx("grid-slick")}>
						<div className={cx("info")}>
							<h2 className="heading--40 color--primary">Contenido global</h2>
							<p className="heading--16 color--gray">
								Lorem ipsum dolor sit amet, consectetur eiusmod tempor.
							</p>
							<div className={cx(["customArrows", "custom-arrows"])}>
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
						<Slider {...settings} ref={(slider) => (sliderRef1 = slider)}>
							{shuffledData.map((targeta, index) => (
								<div key={index} className={cx("card")}>
									{targeta?.node?.featuredImage?.node?.mediaItemUrl ? (
										<>
											<Image
												src={targeta.node.featuredImage.node.mediaItemUrl}
												layout="fill"
												objectFit="cover"
												quality={100}
												priority={true}
												alt={targeta?.node?.featuredImage?.node?.altText || ""}
												title={targeta?.node?.featuredImage?.node?.title || ""}
											/>
											<h3 className={cx(["title", "heading--20 color--white"])}>
												{targeta.node.title}
											</h3>
										</>
									) : (
										<Image
											src={ImageNotAvailable}
											width={372}
											height={230}
											sizes="100vw"
											alt="Imagen no disponible"
											title="no disponible"
										/>
									)}
								</div>
							))}
						</Slider>
					</div>
				</div>
			</div>
		</section>
	);
};

export default CardsGridThreeCaruselBlog;
