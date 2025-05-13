import { useRef, useState } from "react";
import Image from "next/image";

import className from "classnames/bind";
import styles from "./HeroImage.module.scss";
let cx = className.bind(styles);

const HeroImage = ({data}) => {
	const {titulo, imagen, video } = data;
	const videoRef = useRef(null);
	const [isMuted, setIsMuted] = useState(true);

	const handleUnmute = () => {
		if (videoRef.current) {
			videoRef.current.muted = false;
			videoRef.current.volume = 1;
			setIsMuted(false);
			videoRef.current.play();
		}
	};

	return (
		<section className={cx(["component"])}>
			<div className={cx(["bckg"])}>
				{video ? (
					<>
						<video
							ref={videoRef}
							autoPlay
							muted={isMuted}
							loop
							playsInline
							className={cx(["video"])}
						>
							<source src={video} type="video/mp4" />
						</video>
						{isMuted && (
							<button
								onClick={handleUnmute}
								className={cx(["unmute-btn"])}
								aria-label="Activar sonido"
							>
								{/* SVG de altavoz con X */}
								<svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
									<circle cx="20" cy="20" r="20" fill="transparent"/>
									<path d="M13 16H17L21 12V28L17 24H13V16Z" stroke="#fff" strokeWidth="2" strokeLinejoin="round"/>
									<line x1="25" y1="17" x2="29" y2="21" stroke="#fff" strokeWidth="2" strokeLinecap="round"/>
									<line x1="29" y1="17" x2="25" y2="21" stroke="#fff" strokeWidth="2" strokeLinecap="round"/>
								</svg>
							</button>
						)}
					</>
				) : (
					<Image
						src={imagen.mediaItemUrl}
						layout="fill"
						priority
						quality={100}
						alt={imagen.altText}
						title={imagen.title}
					/>
				)}
				<h1 className={cx(["heading", "heading--54", "color--white"])}>
					{titulo}
				</h1>
			</div>
		</section>
	);
};

export default HeroImage;
