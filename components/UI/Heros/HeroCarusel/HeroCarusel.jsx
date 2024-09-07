import React from "react";
import Image from "next/image";
import Link from "next/link";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";

import className from "classnames/bind";
import styles from "./HeroCarusel.module.scss";
let cx = className.bind(styles);

import Hero from "/public/images/bckg/hero.jpg";

const HeroCarusel = () => {
	var settings = {
		dots: true,
		arrows: false,
		infinite: true,
		speed: 500,
		fade: true,
		slidesToShow: 1,
		slidesToScroll: 1,
	};
	return (
		<section className="HeroCarusel">
			<div className={cx(["component"])}>
				<Slider {...settings}>
					<div>
						<div className={cx("bckg")}>
							<Image
								layout="fill"
								src={Hero}
								width={1920}
								height={1253}
								quality={100}
								alt=""
							/>
							<div className={cx("content")}>
								<div className="container">
									<div className={cx("copy")}>
										<h1
											className={cx(["heading", "heading--68", "color--white"])}
										>
											Sustainable eco-villas
										</h1>
										<p className="heading--16 color--white">
											En Casa Selvaggio, combinamos el lujo con la
											sostenibilidad para ofrecer una experiencia única. Nuestro
											hotel está diseñado para brindar comodidad y sofisticación
											con el menor impacto ambiental.
										</p>
										<span className="space space--10"></span>
										<Link href="/">
											<a className="button button--white">Reservar</a>
										</Link>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div>
						<div className={cx("bckg")}>
							<Image
								layout="fill"
								src={Hero}
								width={1920}
								height={1253}
								quality={100}
								alt=""
							/>
							<div className={cx("content")}>
								<div className="container">
									<div className={cx("copy")}>
										<h1
											className={cx(["heading", "heading--68", "color--white"])}
										>
											Sustainable eco-villas
										</h1>
										<p className="heading--18 color--white">
											En Casa Selvaggio, combinamos el lujo con la
											sostenibilidad para ofrecer una experiencia única. Nuestro
											hotel está diseñado para brindar comodidad y sofisticación
											con el menor impacto ambiental.
										</p>
										<span className="space space--10"></span>
										<Link href="/">
											<a className="button button--white">Reservar</a>
										</Link>
									</div>
								</div>
							</div>
						</div>
					</div>
				</Slider>
			</div>
		</section>
	);
};

export default HeroCarusel;
