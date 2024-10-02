import React from "react";
import Image from "next/image";
import Link from "next/link";

import className from "classnames/bind";
import styles from "./BannerTextCta.module.scss";
let cx = className.bind(styles);

import { Container } from "../../../Layout/Container";

const BannerTextCta = ({ data }) => {
	const { cta, titulo, imagen } = data;
	return (
		<section className="BannerTextCta">
			<div className={cx("component")}>
				<Container>
					<div className={cx("bckg")}>
						<Image
							src={imagen?.mediaItemUrl}
							layout="fill"
							quality={100}
							priority
							sizes="100vw"
							alt={imagen?.altText}
							title={imagen?.title}
						/>
						<div className={cx("copy")}>
							<h2 className="heading--40 color--white">{titulo}</h2>

							{cta && (
								<Link href={cta?.url}>
									<a className="button button--white" target={cta?.target}>
										{cta?.title}
									</a>
								</Link>
							)}
						</div>
					</div>
				</Container>
			</div>
		</section>
	);
};

export default BannerTextCta;
