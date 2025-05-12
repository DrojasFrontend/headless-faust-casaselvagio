import React from "react";
import Image from "next/image";
import Link from "next/link";

import className from "classnames/bind";
import styles from "./CardsBigSmall.module.scss";
let cx = className.bind(styles);

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";

import { Container } from "../../../Layout/Container";

const CardsBigSmall = ({ data }) => {
	const { titulo, descripcion, targetas } = data;

	console.log(targetas);

	if (!targetas.length === 0) {
		return <p>No hay tarjetas disponibles.</p>;
	}

	var settings = {
		dots: false,
		arrows: false,
		infinite: true,
		speed: 500,
		fade: false,
		slidesToShow: 1,
		slidesToScroll: 1,
		autoplay: true,
		autoplaySpeed: 3000,
	};

	return (
		<section className="CardsBigSmall">
			<div className={cx(["component"])}>
				<Container>
					<div className="container">
						<div className={cx(["title"])}>
							<h2 className={cx(["heading--40", "color--primary"])}>
								{titulo}
							</h2>
							<div
								className="heading--16 color--gray"
								dangerouslySetInnerHTML={{ __html: descripcion }}
							/>
						</div>
						<div className={cx("grid")}>
							{targetas.map((targeta, index) => (
								<div key={index} className={cx("card", { "gridColumn": targeta.columnas === 2 })} >
									<Slider {...settings}>
										{targeta.imagen.map((imagen, index) => (
											<div className={cx(["card__img"])} style={{ position: 'relative', width: '100%', height: '100%' }}>
												<Image
													layout="fill"
													src={imagen?.mediaItemUrl}
													quality={100}
													priority
													objectFit="cover"
													alt={imagen?.altText}
													title={imagen?.title}
												/>
											</div>
										))}
									</Slider>

									<div className={cx(["copy"])}>
										<h3
											className={cx(["heading", "heading--24", "color--white"])}
										>
											{targeta?.titulo}
										</h3>
										{targeta?.cta?.url && (
											<Link href={targeta?.cta?.url}>
												<a className="button button--white" target={targeta?.cta?.target}>
													{targeta?.cta?.title}
												</a>
											</Link>
										)}
									</div>
								</div>
							))}
						</div>
					</div>
				</Container>
			</div>
		</section>
	);
};

export default CardsBigSmall;
