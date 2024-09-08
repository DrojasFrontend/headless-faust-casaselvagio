import React from "react";
import Image from "next/image";
import Link from "next/link";

import className from "classnames/bind";
import styles from "./CardsGridTwo.module.scss";
let cx = className.bind(styles);

import ImageLeft from "/public/images/posts/nuestras-habitaciones.webp";

const CardsGridTwo = () => {
	return (
		<section className="CardsGridTwo">
			<div className={cx("component")}>
				<div className="container">
					<div className={cx(["title", "desktop"])}>
						<h2 className="heading--44">Tejido social</h2>
						<p className="heading--16">
							En Casa Selvaggio, combinamos el lujo con la sostenibilidad para
							ofrecer una experiencia única. Nuestro hotel está diseñado para
							brindar comodidad y sofisticación con el menor impacto
							ambiental.En Casa Selvaggio, combinamos el lujo con la
							sostenibilidad para ofrecer una experiencia única. Nuestro hotel
							está diseñado para brindar comodidad y sofisticación con el menor
							impacto ambiental.
						</p>
					</div>
					<div className={cx("grid")}>
						<div className={cx("card")}>
							<Image
								layout="fill"
								src={ImageLeft}
								width={1344}
								height={951}
								quality={100}
								alt=""
							/>
							<div className={cx("title")}>
								<h3 className={cx(["card-title", "heading--20 color--white"])}>
									Vista hotel 01
								</h3>
								<p className="heading--13 color--white">
									Lorem ipsum dolor sit amet, consectetur eiusmod tempor.
								</p>
							</div>
						</div>
						<div className={cx("card")}>
							<Image
								layout="fill"
								src={ImageLeft}
								width={1344}
								height={951}
								quality={100}
								alt=""
							/>
							<div className={cx("title")}>
								<h3 className={cx(["card-title", "heading--20 color--white"])}>
									Vista hotel 01
								</h3>
								<p className="heading--13 color--white">
									Lorem ipsum dolor sit amet, consectetur eiusmod tempor.
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default CardsGridTwo;
