import React from "react";
import Image from "next/image";
import Link from "next/link";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";

import className from "classnames/bind";
import styles from "./CardsMasonry.module.scss";
let cx = className.bind(styles);

import { Container } from "../../../Layout/Container";

const CardsMasonry = ({ data }) => {
	const { targetas, titulo, descripcion, cta, cantidad, detalle } = data;
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

	if (!targetas.length === 0) {
		return <p>No hay tarjetas disponibles.</p>;
	}
	return (
		<section className="sectionCardsMasonry">
			<div className={cx("component")}>
				<Container>
					<div className={cx("title")}>
						{titulo && <h2 className="heading--40 color--primary">{titulo}</h2>}
						{descripcion && (
							<div
								className="heading--16 color--gray"
								dangerouslySetInnerHTML={{ __html: descripcion }}
							/>
						)}
					</div>
					{/* Desktop */}
					<div className={cx("desktop")}>
						<div className={cx("grid")}>
							<div className={cx("left")}>
								<div className={cx("grid-card")}>
									{targetas.map(
										(targeta, index) =>
											(index === 0 || index === 1) && (
												<div key={index} className={cx("card")}>
													<Image
														src={targeta?.imagen?.mediaItemUrl}
														width={372}
														height={500}
														quality={100}
														priority
														sizes="100vw"
														objectFit="cover"
														alt={targeta?.imagen?.altText}
														title={targeta?.imagen?.title}
													/>
													{targeta.titulo && (
														<h3
															className={cx([
																"card-title",
																"heading--20 color--white",
															])}
														>
															{targeta.titulo}
														</h3>
													)}
													<p>Here</p>
												</div>
											)
									)}
								</div>
								<div className={cx("full")}>
									<div className="">
										{cantidad && (
											<p className="heading--40 color--white">{cantidad}</p>
										)}
										{detalle && (
											<div
												className="heading--13 color--white"
												dangerouslySetInnerHTML={{ __html: detalle }}
											/>
										)}
									</div>
									<div className="">
										{cta && (
											<Link href={cta?.url}>
												<a className="button button--white" target={cta?.target}>
													{cta?.title}
												</a>
											</Link>
										)}
									</div>
								</div>
							</div>
							<div className={cx("right")}>
								{targetas.map(
									(targeta, index) =>
										(index === 2 || index === 3) && (
											<div key={index} className={cx(["card", "card--medium"])}>
												<Image
													src={targeta?.imagen?.mediaItemUrl}
													width={350}
													height={350}
													quality={100}
													priority
													sizes="100vw"
													objectFit="cover"
													alt={targeta?.imagen?.altText}
													title={targeta?.imagen?.title}
												/>
												<h3
													className={cx([
														"card-title",
														"heading--20 color--white",
													])}
												>
													{titulo && targeta.titulo}
												</h3>
											</div>
										)
								)}
							</div>
						</div>
					</div>
				</Container>
				{/* Mobile */}
				<div className={cx("mobile")}>
					<div className="container--slick">
						<Slider {...settings}>
							{targetas.map((targeta, index) => (
								<div key={index}>
									<div className={cx("card")}>
										<Image
											src={targeta?.imagen?.mediaItemUrl}
											width={350}
											height={350}
											quality={100}
											priority
											sizes="100vw"
											objectFit="cover"
											alt={targeta?.imagen?.altText}
											title={targeta?.imagen?.title}
										/>
										<h3
											className={cx(["card-title", "heading--20 color--white"])}
										>
											Sitio de interes 01
										</h3>
									</div>
								</div>
							))}
						</Slider>
					</div>
				</div>
			</div>
		</section>
	);
};

export default CardsMasonry;
