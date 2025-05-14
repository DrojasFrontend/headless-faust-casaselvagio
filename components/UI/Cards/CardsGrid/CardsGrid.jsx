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
	const [playingVideos, setPlayingVideos] = useState({});
	const videoRefs = useRef([]);
	const [isMuted, setIsMuted] = useState(true);

	useEffect(() => {
		const checkMobile = () => {
			setIsMobile(window.innerWidth <= 680);
		};
		
		checkMobile();
		window.addEventListener('resize', checkMobile);
		
		return () => window.removeEventListener('resize', checkMobile);
	}, []);

	const handlePlayVideo = (index) => {
		setPlayingVideos(prev => ({
			...prev,
			[index]: true
		}));
		if (videoRefs.current[index]) {
			videoRefs.current[index].play();
		}
	};

	const handleUnmute = () => {
		if (videoRefs.current[0]) {
			videoRefs.current[0].muted = false;
			videoRefs.current[0].volume = 1;
			setIsMuted(false);
			videoRefs.current[0].play();
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
											{isMobile && !playingVideos[index] && (
												<button 
													className={cx("play-button")}
													onClick={() => handlePlayVideo(index)}
												>
													▶
												</button>
											)}
											<video
												ref={el => videoRefs.current[index] = el}
												autoPlay={!isMobile}
												muted={true}
												loop
												playsInline
												className={cx(["video"])}
												controls={false}
											>
												<source src={targeta?.video?.mediaItemUrl} type="video/mp4" />
											</video>
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
