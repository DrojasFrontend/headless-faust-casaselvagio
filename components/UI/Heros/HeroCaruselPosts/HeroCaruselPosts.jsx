import React from "react";
import Image from "next/image";
import Link from "next/link";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";

import className from "classnames/bind";
import styles from "./HeroCaruselPosts.module.scss";
let cx = className.bind(styles);

import { Container } from "../../../Layout/Container";
import { FormatDate } from "../../../FormatDate";

import ImageNotAvailable from "/public/img/image-not-available-desktop.svg";

const HeroCarusel = ({ data }) => {
	// const { slides } = data;

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
					{data.slice(0, 5).map((slide, index) => (
						<div key={index}>
							<div className={cx("bckg")}>
								{slide?.node?.internaBlog?.imgen?.mediaItemUrl ? (
									<Image
										src={slide?.node?.internaBlog?.imgen?.mediaItemUrl}
										layout="fill"
										quality={100}
										priority
										alt={slide?.node?.internaBlog?.imgen?.altText}
										title={slide?.node?.internaBlog?.imgen?.title}
									/>
								) : (
									<Image
										src={ImageNotAvailable}
										layout="fill"
										quality={100}
										priority
										alt="Imagen no disponible"
										title="no disponible"
									/>
								)}

								<div className={cx("content")}>
									<Container>
										<div className={cx("copy")}>
											{index === 0 ? (
												<h1
													className={cx([
														"heading",
														"heading--54",
														"color--white",
													])}
												>
													{slide?.node?.title}
												</h1>
											) : (
												<h2
													className={cx([
														"heading",
														"heading--54",
														"color--white",
													])}
												>
													{slide?.node?.title}
												</h2>
											)}
											<p className="heading--12 color--white">
												<FormatDate data={slide?.node?.date} />
												{slide?.node?.date && (
													<time dateTime={slide?.node?.date}>
														<FormatDate date={slide?.node?.date} />
													</time>
												)}{" "}
												- 5 min lectura
											</p>
											{slide?.node?.uri && (
												<Link href={slide?.node?.uri} target="">
													<a className="button button--white button--center">
														Leer artículo
													</a>
												</Link>
											)}
										</div>
									</Container>
								</div>
							</div>
						</div>
					))}
				</Slider>
			</div>
		</section>
	);
};

export default HeroCarusel;
