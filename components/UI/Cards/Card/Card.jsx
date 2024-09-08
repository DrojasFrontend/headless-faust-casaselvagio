import React from "react";
import Image from "next/image";
import Link from "next/link";

import IconCheck from "../../../SVG/IconCheck";

import className from "classnames/bind";
import styles from "./Card.module.scss";
let cx = className.bind(styles);

import Slide1 from "/public/images/posts/slide-1.png";

export default function Card() {
	return (
		<article className="Card">
			<div className={cx("component")}>
				<div className={cx("item")}>
					<div className={cx("img")}>
						<Image
							layout="fill"
							src={Slide1}
							width={330}
							height={205}
							quality={100}
							alt=""
						/>
						<h3 className={cx(["title", "heading--24 color--white"])}>
							Tour Selvaggio 01
							<span className="button--circle"></span>
						</h3>
					</div>
					<div className={cx("info")}>
						<p className="heading--16 color--gray">
							El Restaurante Selvaggio ofrece una experiencia culinaria que
							fusiona sabores locales con técnicas gourmet. Nuestro menú cambia
							con las estaciones para aprovechar los ingredientes más frescos
							disponibles.
						</p>
						<h3 className="heading--18 color--primary">
							Características del Restaurante
						</h3>
						<ul className="">
							<li>
								<span className={cx("icon")}>
									<IconCheck />
								</span>
								Dato interes 01
							</li>
							<li>
								<span className={cx("icon")}>
									<IconCheck />
								</span>
								Dato interes 01
							</li>
							<li>
								<span className={cx("icon")}>
									<IconCheck />
								</span>
								Dato interes 01
							</li>
						</ul>
					</div>
				</div>
			</div>
		</article>
	);
}
