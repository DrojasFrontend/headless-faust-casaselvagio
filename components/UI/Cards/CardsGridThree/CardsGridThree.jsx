import React, { useState, useEffect, useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";

import className from "classnames/bind";
import styles from "./CardsGridThree.module.scss";
let cx = className.bind(styles);

import Card from "../Card/Card";

const CardsGridThree = ({ data, heading }) => {
	var settings = {
		dots: true,
		arrows: false,
		touchMove: true,
		infinite: false,
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

	if (!data.length === 0) {
		return null;
	}

	return (
		<section className="CardsGridThree">
			<div className={cx("component")}>
				<div className="container--slick">
					<div className={cx("title")}>
						<h2 className="heading--40 color--primary">{heading && heading}</h2>
						{/* <div className="CardsGridThree__CTA">
						<button type="button" className="button button--primary">
							Tours Casa Selvaggio
						</button>
						<button type="button" className="button button--primary">
							Tours Casa Selvaggio
						</button>
						<button type="button" className="button button--primary">
							Tours Casa Selvaggio
						</button>
					</div> */}
					</div>
					{data && (
						<Slider {...settings}>
							{data.map((targeta, index) => (
								<Card
									key={index}
									title={targeta?.title}
									excerpt={targeta?.excerpt}
									postInterna={targeta?.postInterna}
									featuredImage={targeta?.featuredImage}
									info={targeta?.postInterna}
									slug={targeta?.uri}
								/>
							))}
						</Slider>
					)}
				</div>
			</div>
		</section>
	);
};

export default CardsGridThree;
