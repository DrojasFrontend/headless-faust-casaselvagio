import Image from "next/image";

import className from "classnames/bind";
import styles from "./HeroImage.module.scss";
let cx = className.bind(styles);
import Hero from "/public/img/hero.jpg";

const HeroImage = () => {
	return (
		<section className={cx(["component"])}>
			<div className={cx(["bckg"])}>
				<Image
					src={Hero}
					layout="fill"
					quality={100}
					priority={true}
					style={{objectFit: "cover"}}
					alt="Image"
				/>
				<h1 className={cx(["heading", "heading--68", "color--white"])}>
					Sustainable eco-villas
				</h1>
			</div>
		</section>
	);
};

export default HeroImage;
