import React, { useEffect, useState, useRef } from "react";
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
	const videoRefs = useRef({});
	const [playingVideos, setPlayingVideos] = useState({});
	const [isMobile, setIsMobile] = useState(false);

	useEffect(() => {
		const checkMobile = () => {
			setIsMobile(window.innerWidth <= 1024);
		};

		checkMobile();
		window.addEventListener('resize', checkMobile);

		return () => {
			window.removeEventListener('resize', checkMobile);
		};
	}, []);

	useEffect(() => {
		if (!isMobile) {
			// Reproducir automáticamente en desktop
			Object.keys(videoRefs.current).forEach(key => {
				if (videoRefs.current[key]) {
					videoRefs.current[key].play();
					setPlayingVideos(prev => ({
						...prev,
						[key]: true
					}));
				}
			});
		}
	}, [isMobile]);

	const handlePlay = (index) => {
		// Detener todos los videos primero
		Object.keys(videoRefs.current).forEach(key => {
			if (videoRefs.current[key]) {
				videoRefs.current[key].pause();
			}
		});

		// Reproducir el video seleccionado
		if (videoRefs.current[index]) {
			videoRefs.current[index].play();
			setPlayingVideos(prev => ({
				...prev,
				[index]: true
			}));
		}
	};

	var settings = {
		dots: false,
		arrows: false,
		touchMove: true,
		infinite: false,
		speed: 500,
		slidesToShow: 3.4,
		slidesToScroll: 1,
		centerMode: false,
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
							<div key={index}>
								<div key={index} className={cx(["card"])}>
									{targeta?.video?.mediaItemUrl ? (
										<div className={cx("video-container")}>
											<video
												ref={el => videoRefs.current[index] = el}
												muted={true}
												loop
												playsInline
												className={cx(["video"])}
												onEnded={() => setPlayingVideos(prev => ({
													...prev,
													[index]: false
												}))}
											>
												<source src={targeta?.video?.mediaItemUrl} type="video/mp4" />
											</video>
											{isMobile && !playingVideos[index] && (
												<button
													onClick={() => handlePlay(index)}
													className={cx(["play-btn"])}
													aria-label="Reproducir video"
												>
													<svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
														<circle cx="20" cy="20" r="20" fill="rgba(0,0,0,0.5)" />
														<polygon points="16,13 28,20 16,27" fill="#fff"/>
													</svg>
												</button>
											)}
										</div>
									) : targeta?.imagen?.mediaItemUrl ? (
										<Image
											src={targeta?.imagen?.mediaItemUrl}
											width={372}
											height={440}
											quality={100}
											sizes="100vw"
											alt={targeta?.imagen?.altText}
											title={targeta?.imagen?.title}
										/>
									) : null}
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
								{targeta.cta && (
									<Link href={targeta.cta?.url}>
										<a className="button button--primary button--center" target={targeta.cta?.target}>
											{targeta.cta?.title}
										</a>
									</Link>
								)}
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
