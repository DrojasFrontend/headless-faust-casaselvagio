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
	const [isMobile, setIsMobile] = useState(false);
	const [isMobileDevice, setIsMobileDevice] = useState(false);
	const [playingVideos, setPlayingVideos] = useState({});
	const videoRefs = useRef({});

	useEffect(() => {
		const checkMobile = () => setIsMobile(window.innerWidth < 1024);
		const checkMobileDevice = () => {
			const userAgent = typeof window !== 'undefined' ? window.navigator.userAgent.toLowerCase() : '';
			return /iphone|ipad|ipod|android/.test(userAgent);
		};
		checkMobile();
		setIsMobileDevice(checkMobileDevice());
		window.addEventListener('resize', checkMobile);
		return () => window.removeEventListener('resize', checkMobile);
	}, []);

	const handlePlay = async (index) => {
		try {
			const video = videoRefs.current[index];
			if (video) {
				video.focus();
				const playPromise = video.play();
				if (playPromise !== undefined) {
					await playPromise;
					setPlayingVideos(prev => ({
						...prev,
						[index]: true
					}));
				}
			}
		} catch (error) {
			console.error('No se pudo reproducir el video:', error);
			setPlayingVideos(prev => ({
				...prev,
				[index]: false
			}));
		}
	};

	const handleVideoEnd = (index) => {
		setPlayingVideos(prev => ({
			...prev,
			[index]: false
		}));
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
												src={targeta?.video?.mediaItemUrl}
												width={372}
												height={440}
												quality={100}
												sizes="100vw"
												poster={targeta?.imagen?.mediaItemUrl}
												muted
												loop
												playsInline
												className={cx("video")}
												controls={isMobileDevice || !isMobile}
												tabIndex="0"
												onPlay={() => setPlayingVideos(prev => ({ ...prev, [index]: true }))}
												onPause={() => setPlayingVideos(prev => ({ ...prev, [index]: false }))}
												onEnded={() => handleVideoEnd(index)}
											/>
											{isMobileDevice && !playingVideos[index] && (
												<button 
													className={cx("play-button")}
													style={{zIndex: 4, pointerEvents: 'auto'}}
													onClick={() => handlePlay(index)}
												>
													<svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
														<circle cx="20" cy="20" r="20" fill="rgba(0,0,0,0.5)"/>
														<path d="M13 16H17L21 12V28L17 24H13V16Z" stroke="#fff" strokeWidth="2" strokeLinejoin="round"/>
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
