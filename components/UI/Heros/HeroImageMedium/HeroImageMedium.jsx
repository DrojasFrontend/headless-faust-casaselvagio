import Image from "next/image";

import className from "classnames/bind";
import styles from "./HeroImageMedium.module.scss";
let cx = className.bind(styles);

import Hero from "/public/images/bckg/hero.jpg";

const HeroImageMedium = ({ title }) => {
	return (
		<section className={cx(["component"])}>
			<div className={cx(["bckg"])}>
				<Image
					layout="fill"
					src={Hero}
					width={1920}
					height={1253}
					quality={100}
					alt=""
				/>
				<h1 className={cx(["heading", "heading--68", "color--white"])}>
					{title}
				</h1>
			</div>
		</section>
	);
};

export default HeroImageMedium;
