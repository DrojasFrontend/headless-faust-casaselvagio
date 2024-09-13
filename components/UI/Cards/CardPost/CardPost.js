import React from "react";
import Image from "next/image";
import Link from "next/link";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";

import className from "classnames/bind";
import styles from "./CardPost.module.scss";
let cx = className.bind(styles);

import ImageNotAvailable from "/public/img/image-not-available.png";

const CardPost = ({ data, className }) => {
	const { title, excerpt, uri, featuredImage } = data.node;

	return (
		<article className={cx("component")}>
			<Link href={uri}>
				<a className={cx("img")}>
					{featuredImage ? (
						<Image
							src={featuredImage?.node?.mediaItemUrl}
							width={372}
							height={230}
							sizes="100vw"
							alt={featuredImage?.node?.altText}
							title={featuredImage?.node?.title}
						/>
					) : (
						<Image
							src={ImageNotAvailable}
							width={372}
							height={230}
							sizes="100vw"
							alt="Imagen no disponible"
							title="no disponible"
						/>
					)}
				</a>
			</Link>
			<Link href={uri}>
				<a className={cx("info")}>
					<h3 className="heading--18 color--primary">{title}</h3>
					<div
						className="heading--16 color--gray"
						dangerouslySetInnerHTML={{ __html: excerpt }}
					/>
				</a>
			</Link>
		</article>
	);
};

export default CardPost;
