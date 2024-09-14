import React from "react";
import Image from "next/image";
import Link from "next/link";

import IconCheck from "../../../SVG/IconCheck";

import className from "classnames/bind";
import styles from "./Card.module.scss";
let cx = className.bind(styles);

import ImageNotAvailable from "/public/img/image-not-available.png";

export default function Card({
	title,
	excerpt,
	slug,
	postInterna,
	featuredImage,
}) {
	return (
		<article className="Card">
			<div className={cx("component")}>
				<div className={cx("item")}>
					<div className={cx("img")}>
						{featuredImage ? (
							<Image
								src={featuredImage?.node?.mediaItemUrl}
								layout="fill"
								quality={100}
								priority
								sizes="100vw"
								alt={featuredImage?.node?.altText}
								title={featuredImage?.node?.title}
							/>
						) : (
							<Image
								src={ImageNotAvailable}
								width={372}
								height={200}
								quality={100}
								priority
								sizes="100vw"
								alt="Imagen no disponible"
								title="no disponible"
							/>
						)}
						<h3 className={cx(["title", "heading--24 color--white"])}>
							<Link href={slug}>
								<a>
									{title}
									<span className="button--circle"></span>
								</a>
							</Link>
						</h3>
					</div>
					<div className={cx("info")}>
						<Link href={slug}>
							<a>
								<div
									className="heading--16 color--gray"
									dangerouslySetInnerHTML={{ __html: excerpt }}
								/>
								<h3 className="heading--18 color--primary">
									{postInterna?.grupocaracteristicas?.titulo}
								</h3>
								<ul className="">
									{postInterna?.grupocaracteristicas?.caracteristica && (
										<>
											{postInterna?.grupocaracteristicas?.caracteristica?.map(
												(icon, index) => (
													<li key={index}>
														<span className={cx("icon")}>
															<IconCheck />
														</span>
														{icon?.detalle}
													</li>
												)
											)}
										</>
									)}
								</ul>
							</a>
						</Link>
					</div>
				</div>
			</div>
		</article>
	);
}
