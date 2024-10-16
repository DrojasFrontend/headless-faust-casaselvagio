import React from "react";
import Image from "next/image";
import Link from "next/link";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";

import className from "classnames/bind";
import styles from "./CardsGrid.module.scss";
let cx = className.bind(styles);

import { Container } from "../../../Layout/Container";

const CardGrid = ({ data, className }) => {
	const { titulo, descripcion, targetas, cta } = data;
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
		<section className="CardsGrid">
			<div className={cx("component")}>
				<Container>
					<div className={cx(["grid", className])}>
						<h2 className={cx(["heading", "heading--40", "color--primary"])}>
							{titulo}
						</h2>
						<div
							className="heading--16 color--gray"
							dangerouslySetInnerHTML={{ __html: descripcion }}
						/>
					</div>
				</Container>
				<div className="container--slick">
					<Slider {...settings}>
						{targetas.map((targeta, index) => (
							<div key={index} className={cx(["card"])}>
								<Image
									src={targeta?.imagen?.mediaItemUrl}
									width={372}
									height={440}
									quality={100}
									sizes="100vw"
									alt={targeta?.imagen?.altText}
									title={targeta?.imagen?.title}
								/>
								<div className={cx(["copy"])}>
									<h3 className="heading--24 color--white">
										{targeta?.titulo}
									</h3>
									<div
										className="heading--16 color--white"
										dangerouslySetInnerHTML={{ __html: targeta?.detalle }}
									/>
								</div>
							</div>
						))}
					</Slider>

					{cta && (
						<Link href={cta?.url}>
							<a className="button button--primary button--center" target={cta?.target}>
								{cta?.title}
							</a>
						</Link>
					)}
				</div>
			</div>
		</section>
	);
};

export default CardGrid;
