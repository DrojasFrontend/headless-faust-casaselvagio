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
	const { title, excerpt, postExperiencia } = data;
	return (
		<section className="HeroImageText">
			<div className={cx(["component"])}>
				<div className={cx("bckg")}>
					{postExperiencia?.grupobanner?.imagen ? (
						<Image
							src={postExperiencia?.grupobanner?.imagen?.mediaItemUrl}
							layout="fill"
							quality={100}
							priority
							alt={postExperiencia?.grupobanner?.imagen?.altText}
							title={postExperiencia?.grupobanner?.imagen?.title}
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
								<h1 className={cx(["heading", "heading--68", "color--white"])}>
									{title}
								</h1>

								<div
									className="heading--16 color--white"
									dangerouslySetInnerHTML={{ __html: excerpt }}
								/>

								<span className="space space--10"></span>

								{postExperiencia?.grupobanner?.cta && (
									<Link
										href={postExperiencia?.grupobanner?.cta?.url}
										target={postExperiencia?.grupobanner?.cta?.target}
									>
										<a className="button button--white">
											{postExperiencia?.grupobanner?.cta?.title}
										</a>
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
