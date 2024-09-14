import Image from "next/image";

import className from "classnames/bind";
import styles from "./HeroImageMedium.module.scss";
let cx = className.bind(styles);

const HeroImageMedium = ({ data }) => {
	const { titulo, imagen } = data;
	return (
		<section className={cx(["component"])}>
			<div className={cx(["bckg"])}>
			<Image
					src={imagen.mediaItemUrl}
					layout="fill"
					quality={100}
					priority
					alt={imagen.altText}
					title={imagen.title}
				/>
				<h1 className={cx(["heading", "heading--54", "color--white"])}>
					{titulo}
				</h1>
			</div>
		</section>
	);
};

export default HeroImageMedium;
