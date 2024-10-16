import React from "react";
import Image from "next/image";
import Link from "next/link";

import className from "classnames/bind";
import styles from "./CardsBigSmall.module.scss";
let cx = className.bind(styles);

import { Container } from "../../../Layout/Container";

const CardsBigSmall = ({ data }) => {
	const { titulo, descripcion, targetas } = data;

	if (!targetas.length === 0) {
		return <p>No hay tarjetas disponibles.</p>;
	}

	return (
		<section className="CardsBigSmall">
			<div className={cx(["component"])}>
				<Container>
					<div className="container">
						<div className={cx(["title"])}>
							<h2 className={cx(["heading--40", "color--primary"])}>
								{titulo}
							</h2>
							<div
								className="heading--16 color--gray"
								dangerouslySetInnerHTML={{ __html: descripcion }}
							/>
						</div>
						<div className={cx("grid")}>
							{targetas.map((targeta, index) => (
								<div key={index} className={cx("card", { "gridColumn": targeta.columnas === 2 })} >
									<Image
										layout="fill"
										src={targeta?.imagen?.mediaItemUrl}
										quality={100}
										sizes="100vw"
										objectFit="cover"
										alt={targeta?.imagen?.altText}
										title={targeta?.imagen?.title}
									/>

									<div className={cx(["copy"])}>
										<h3
											className={cx(["heading", "heading--24", "color--white"])}
										>
											{targeta?.titulo}
										</h3>
										{targeta?.cta?.url && (
											<Link href={targeta?.cta?.url}>
												<a className="button button--white">
													{targeta?.cta?.title}
												</a>
											</Link>
										)}
									</div>
								</div>
							))}
						</div>
					</div>
				</Container>
			</div>
		</section>
	);
};

export default CardsBigSmall;
