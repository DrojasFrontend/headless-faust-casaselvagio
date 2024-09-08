import React from "react";
import Image from "next/image";
import Link from "next/link";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";

import className from "classnames/bind";
import styles from "./CardsMasonry.module.scss";
let cx = className.bind(styles);

import Slide1 from "/public/images/posts/slide-1.png";

const CardsMasonry = (props) => {
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
	return (
		<section className="sectionCardsMasonry">
			<div className={cx("component")}>
				<div className="container">
					<div className={cx("title")}>
						<h2 className="heading--44 color--primary">
							Sitios de interes Raquira y alrededores
						</h2>
						<p className="heading--16 color--gray">
							En Casa Selvaggio, creemos que la gastronomía es una parte
							esencial de la experiencia de lujo. Nuestro compromiso con la
							sostenibilidad se refleja en cada plato que servimos,
						</p>
					</div>
					{/* Desktop */}
					<div className={cx("desktop")}>
						<div className={cx("grid")}>
							<div className={cx("left")}>
								<div className={cx("grid-card")}>
									<div className={cx("card")}>
										<Image
											src={Slide1}
											fill
											sizes="100vw"
											alt
											style={{
												objectFit: "cover",
											}}
										/>
										<h3
											className={cx(["card-title", "heading--20 color--white"])}
										>
											Sitio de interes 01
										</h3>
									</div>
									<div className={cx("card")}>
									<Image
											src={Slide1}
											fill
											alt
											sizes="100vw"
											style={{
												objectFit: "cover",
											}}
										/>
										<h3
											className={cx(["card-title", "heading--20 color--white"])}
										>
											Sitio de interes 01
										</h3>
									</div>
								</div>
								<div className={cx("full")}>
									<div className="">
										<p className="heading--40 color--white">50+</p>
										<p className="heading--13 color--white">
											Top sitios <br />
											turisticos Raquira
										</p>
									</div>
									<div className="">
										<Link href="/">
											<a className="button button--white">Reservar</a>
										</Link>
									</div>
								</div>
							</div>
							<div className={cx("right")}>
								<div className={cx(["card", "card--medium"])}>
									<Image
										layout="fill"
										src={Slide1}
										width={332}
										height={400}
										quality={100}
										alt=""
									/>
									<h3
										className={cx(["card-title", "heading--20 color--white"])}
									>
										Sitio de interes 01
									</h3>
								</div>
								<div className={cx(["card", "card--medium"])}>
									<Image
										layout="fill"
										src={Slide1}
										width={332}
										height={400}
										quality={100}
										alt=""
									/>
									<h3
										className={cx(["card-title", "heading--20 color--white"])}
									>
										Sitio de interes 01
									</h3>
								</div>
							</div>
						</div>
					</div>
				</div>
				{/* Mobile */}
				<div className={cx("mobile")}>
					<div className="container--slick">
						<Slider {...settings}>
							<div>
								<div className={cx("card")}>
									<Image
										layout="fill"
										src={Slide1}
										width={332}
										height={400}
										quality={100}
										alt=""
									/>
									<h3
										className={cx(["card-title", "heading--20 color--white"])}
									>
										Sitio de interes 01
									</h3>
								</div>
							</div>
							<div>
								<div className={cx("card")}>
									<Image
										layout="fill"
										src={Slide1}
										width={332}
										height={400}
										quality={100}
										alt=""
									/>
									<h3
										className={cx(["card-title", "heading--20 color--white"])}
									>
										Sitio de interes 01
									</h3>
								</div>
							</div>
							<div>
								<div className={cx("card")}>
									<Image
										layout="fill"
										src={Slide1}
										width={332}
										height={400}
										quality={100}
										alt=""
									/>
									<h3
										className={cx(["card-title", "heading--20 color--white"])}
									>
										Sitio de interes 01
									</h3>
								</div>
							</div>
						</Slider>
					</div>
				</div>
			</div>
		</section>
	);
};

export default CardsMasonry;
