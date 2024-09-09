import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";

import className from "classnames/bind";
import styles from "./CardsGridThreeCarusel.module.scss";
let cx = className.bind(styles);

import Team1 from "/public/images/team/team-1.png";

const CardsGridThreeCarusel = () => {
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

	return (
		<section className="CardsGridThreeCarusel">
			<div className={cx("component")}>
				<div className="container">
					<div className={cx("title")}>
						<div>
							<h2 className="heading--44 color--primary">
								Equipo casa selvaggio
							</h2>
							<p className="heading--16 color--gray">
								En Casa Selvaggio, creemos que la gastronomía es una parte
								esencial de la experiencia de lujo. Nuestro compromiso con la
								sostenibilidad se refleja en cada plato que servimos,
							</p>
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
				</div>
				<div className="container--slick">
					<Slider ref={(slider) => (sliderRef1 = slider)} {...settings}>
						<div>
							<div className={cx("card")}>
								<Image
									src={Team1}
									quality={100}
									fill
									alt=""
									sizes="100vw"
									style={{
										objectFit: "cover",
									}}
								/>
							</div>
							<div className={cx("name")}>
								<h3 className={cx(["heading--24 color--primary"])}>
									Servicio 01
								</h3>
								<p className="heading--16 color--gray">Design, Australia</p>
							</div>
						</div>
						<div>
							<div className={cx("card")}>
								<Image
									src={Team1}
									quality={100}
									fill
									alt=""
									sizes="100vw"
									style={{
										objectFit: "cover",
									}}
								/>
							</div>
							<div className={cx("name")}>
								<h3 className={cx(["heading--24 color--primary"])}>
									Servicio 02
								</h3>
								<p className="heading--16 color--gray">Design, Australia</p>
							</div>
						</div>
						<div>
							<div className={cx("card")}>
								<Image
									src={Team1}
									quality={100}
									fill
									alt=""
									sizes="100vw"
									style={{
										objectFit: "cover",
									}}
								/>
							</div>
							<div className={cx("name")}>
								<h3 className={cx(["heading--24 color--primary"])}>
									Servicio 03
								</h3>
								<p className="heading--16 color--gray">Design, Australia</p>
							</div>
						</div>
						<div>
							<div className={cx("card")}>
								<Image
									src={Team1}
									quality={100}
									fill
									alt=""
									sizes="100vw"
									style={{
										objectFit: "cover",
									}}
								/>
							</div>
							<div className={cx("name")}>
								<h3 className={cx(["heading--24 color--primary"])}>
									Servicio 04
								</h3>
								<p className="heading--16 color--gray">Design, Australia</p>
							</div>
						</div>
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
