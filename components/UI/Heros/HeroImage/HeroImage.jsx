import Image from "next/image";

import className from "classnames/bind";
import styles from "./HeroImage.module.scss";
let cx = className.bind(styles);

const HeroImage = ({data}) => {
	const {titulo, imagen } = data;

	return (
		<section className={cx(["component"])}>
			<div className={cx(["bckg"])}>
				<Image
					src={imagen.mediaItemUrl}
					layout="fill"
					priority
					quality={100}
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

export default HeroImage;
