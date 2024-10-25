import React from "react";
import Image from "next/image";
import Link from "next/link";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";

import className from "classnames/bind";
import styles from "./HeroCarusel.module.scss";
let cx = className.bind(styles);

import { Container } from "../../../Layout/Container";

const HeroCarusel = ({ data }) => {
	const { slides } = data;

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
					{slides.map((slide, index) => (
						<div key={index}>
							<div className={cx("bckg")}>
								<Image
									src={slide?.imagen?.mediaItemUrl}
									layout="fill"
									quality={100}
									priority
									alt={slide?.imagen?.altText}
									title={slide?.imagen?.title}
								/>

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
													{slide?.titulo}
												</h1>
											) : (
												<h2
													className={cx([
														"heading",
														"heading--54",
														"color--white",
													])}
												>
													{slide?.titulo}
												</h2>
											)}
											{slide?.descripcion && (
												<div
													className="heading--16 color--white"
													dangerouslySetInnerHTML={{
														__html: slide?.descripcion,
													}}
												/>
											)}
											<span className="space space--10"></span>

											{slide?.cta && (
												<Link
													href={slide?.cta?.url}
													target={slide?.cta?.target}
												>
													<a className="button button--white">
														{slide?.cta?.title}
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
