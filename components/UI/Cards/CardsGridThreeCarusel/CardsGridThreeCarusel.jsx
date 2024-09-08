import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";

import className from "classnames/bind";
import styles from "./CardsGridThreeCarusel.module.scss";
let cx = className.bind(styles);

import Slide1 from "/public/images/posts/slide-1.png";
import Slide2 from "/public/images/posts/slide-2.png";
import Slide3 from "/public/images/posts/slide-3.png";

const CardsGridThreeCarusel = () => {
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

	return (
		<section className="CardsGridThreeCarusel">
			<div className={cx(["component"])}>
				<div className="container">
					<div className={cx(["grid"])}>
						<h2 className={cx(["heading", "heading--44 color--primary"])}>
							Experiencias Exclusivas
						</h2>
						<p className="heading--16 color--gray">
							En Casa Selvaggio, ofrecemos una variedad de servicios exclusivos
							diseñados para enriquecer tu estancia y brindarte una experiencia
							de lujo .inolvidable
						</p>
					</div>
				</div>

				<div className="container--slick">
					<div className={cx("grid-slick")}>
						<div>
							<Slider
								asNavFor={nav1}
								ref={(slider) => (sliderRef2 = slider)}
								{...settings}
							>
								<div className={cx("card")}>
									<Image
										src={Slide1}
										quality={100}
										alt="Imagen"
									/>
									<h3 className={cx(["title", "heading--24 color--white"])}>
										Servicio 01
									</h3>
								</div>
								<div className={cx("card")}>
									<Image
										src={Slide1}
										quality={100}
										alt="Imagen"
									/>
									<h3 className={cx(["title", "heading--24 color--white"])}>
										Servicio 02
									</h3>
								</div>
								<div className={cx("card")}>
									<Image
										src={Slide1}
										quality={100}
										alt="Imagen"
									/>
									<h3 className={cx(["title", "heading--24 color--white"])}>
										Servicio 03
									</h3>
								</div>
							</Slider>
						</div>
						<div className="CardsGridThreeCarusel__info">
							<Slider
								asNavFor={nav2}
								ref={(slider) => (sliderRef1 = slider)}
								{...settingsText}
							>
								<div className={cx("copy")}>
									<h3 className={cx(["heading", "heading--32 color--primary"])}>
										Spa Ecológico 1
									</h3>
									<p className="heading--16 color--gray">
										Relájate y rejuvenece en nuestro spa, que utiliza productos
										naturales y técnicas sostenibles.
									</p>
								</div>
								<div className={cx("copy")}>
									<h3 className={cx(["heading", "heading--32 color--primary"])}>
										Spa Ecológico 2
									</h3>
									<p className="heading--16 color--gray">
										Relájate y rejuvenece en nuestro spa, que utiliza productos
										naturales y técnicas sostenibles.
									</p>
								</div>
								<div className={cx("copy")}>
									<h3 className={cx(["heading", "heading--32 color--primary"])}>
										Spa Ecológico 3
									</h3>
									<p className="heading--16 color--gray">
										Relájate y rejuvenece en nuestro spa, que utiliza productos
										naturales y técnicas sostenibles.
									</p>
								</div>
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
