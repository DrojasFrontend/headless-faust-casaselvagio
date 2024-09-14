import React from "react";
import Image from "next/image";
import Link from "next/link";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";

import className from "classnames/bind";
import styles from "./HeroImageTextCTA.module.scss";
let cx = className.bind(styles);

import { Container } from "../../../Layout/Container";
import ImageNotAvailable from "/public/img/image-not-available-desktop.svg";

const HeroImageText = ({ data }) => {
	const { title, excerpt, postInterna, titulo, descripcion, cta, imagen } = data;
	return (
		<section className="HeroImageText">
			<div className={cx(["component"])}>
				<div className={cx("bckg")}>
					{postInterna?.grupobanner?.imagen ? (
						<Image
							src={postInterna?.grupobanner?.imagen?.mediaItemUrl}
							layout="fill"
							quality={100}
							priority
							alt={postInterna?.grupobanner?.imagen?.altText}
							title={postInterna?.grupobanner?.imagen?.title}
						/>
					) :  imagen?.mediaItemUrl ? (
						<Image
							src={imagen?.mediaItemUrl}
							layout="fill"
							quality={100}
							priority
							alt={imagen?.altText}
							title={imagen?.title}
						/>
					) : (
						<Image
							src={ImageNotAvailable}
							layout="fill"
							quality={100}
							priority
							alt="Imagen no disponible"
							title="no disponible"
						/>
					)}

					<div className={cx("content")}>
						<Container>
							<div className={cx("copy")}>
								{title ? (
									<h1
										className={cx(["heading", "heading--54", "color--white"])}
									>
										{title}
									</h1>
								) : (
									<h1
										className={cx(["heading", "heading--54", "color--white"])}
									>
										{titulo}
									</h1>
								)}

								{excerpt ? (
									<div
										className="heading--16 color--white"
										dangerouslySetInnerHTML={{ __html: excerpt }}
									/>
								) : (
									<div
										className="heading--16 color--white"
										dangerouslySetInnerHTML={{ __html: descripcion }}
									/>
								)}

								<span className="space space--10"></span>

								{postInterna?.grupobanner?.cta ? (
									<Link
										href={postInterna?.grupobanner?.cta?.url}
										target={postInterna?.grupobanner?.cta?.target}
									>
										<a className="button button--white">
											{postInterna?.grupobanner?.cta?.title}
										</a>
									</Link>
								) : (
									<Link href={cta?.url} target={cta?.target}>
										<a className="button button--white">{cta?.title}</a>
									</Link>
								)}
							</div>
						</Container>
					</div>
				</div>
			</div>
		</section>
	);
};

export default HeroImageText;
