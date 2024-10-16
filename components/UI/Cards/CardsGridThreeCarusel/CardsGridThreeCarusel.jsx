import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";

import className from "classnames/bind";
import styles from "./CardsGridThreeCarusel.module.scss";
let cx = className.bind(styles);

import { Container } from "../../../Layout/Container";

const CardsGridThreeCarusel = ({ data }) => {
	const { titulo, descripcion, targetas } = data;
	
	const [nav1, setNav1] = useState(null);
	const [nav2, setNav2] = useState(null);
	let sliderRef1 = useRef(null);
	let sliderRef2 = useRef(null);

	const settings = {
		dots: false,
		infinite: true,
		speed: 500,
		arrows: false,
		slidesToShow: 2,
		slidesToScroll: 1,
		initialSlide: 0,
		responsive: [
			{
				breakpoint: 1024,
				settings: {
					slidesToShow: 2,
					centerMode: true,
					centerPadding: "60px",
				},
			},
			{
				breakpoint: 680,
				settings: {
					slidesToShow: 1,
				},
			},
		],
	};

	const settingsText = {
		arrows: false,
		fade: true,
	};

	useEffect(() => {
		setNav1(sliderRef1);
		setNav2(sliderRef2);
	}, []);

	const nextSlide = () => {
		sliderRef1.slickNext();
	};

	const prevSlide = () => {
		sliderRef1.slickPrev();
	};

	if (!targetas.length === 0) {
		return <p>No hay tarjetas disponibles.</p>;
	}

	return (
		<section className="CardsGridThreeCarusel">
			<div className={cx(["component"])}>
				<Container>
					<div className={cx(["grid"])}>
						<h2 className={cx(["heading", "heading--40 color--primary"])}>
							{titulo}
						</h2>
						<div className="heading--16 color--gray" dangerouslySetInnerHTML={{ __html: descripcion }} />
					</div>
				</Container>

				<div className="container--slick">
					<div className={cx("grid-slick")}>
						<div>
							<Slider
								asNavFor={nav1}
								ref={(slider) => (sliderRef2 = slider)}
								{...settings}
							>
								{targetas.map((targeta, index) => (
									<div key={index} className={cx("card")}>
										<Image
											src={targeta?.imagen?.mediaItemUrl}
											width={372}
											height={500}
											quality={100}
											sizes="100vw"
											objectFit="cover"
											alt={targeta?.imagen?.altText}
											title={targeta?.imagen?.title}
										/>
										<h3 className={cx(["title", "heading--24 color--white"])}>
											{targeta.subTitulo}
										</h3>
									</div>
								))}
							</Slider>
						</div>
						<div className="CardsGridThreeCarusel__info">
							<Slider
								asNavFor={nav2}
								ref={(slider) => (sliderRef1 = slider)}
								{...settingsText}
							>
								{targetas.map((targeta, index) => (
									<div key={index} className={cx("copy")}>
										<h3
											className={cx(["heading", "heading--32 color--primary"])}
										>
											{targeta.titulo}
										</h3>
										<div className="heading--16 color--gray" dangerouslySetInnerHTML={{ __html: targeta?.descripcion }} />
									</div>
								))}
							</Slider>
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
					</div>
				</div>
			</div>
		</section>
	);
};

export default CardsGridThreeCarusel;
