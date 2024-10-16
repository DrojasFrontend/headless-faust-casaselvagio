import React, { useState } from "react";

import Image from "next/image";
import Link from "next/link";

import className from "classnames/bind";
import styles from "./Accordion.module.scss";
let cx = className.bind(styles);

import { Container } from "../../Layout/Container";
import IconChevronDown from "../../SVG/IconChevronDown";
import IconChevronUp from "../../SVG/IconChevronUp";

const Accordion = ({ data }) => {
	const { items, imagen } = data;
	const [activeIndex, setActiveIndex] = useState(null);

	const toggleAccordion = (index) => {
		setActiveIndex(activeIndex === index ? null : index);
	};

	return (
		<section className="component">
			<Container>
				<div className={cx("component")}>
					<div className={cx("grid")}>
						<div className={cx("items")}>
							{items.map((item, index) => (
								<div className={cx("accordion-item")} key={index}>
									<div
										className={cx(["accordion-header", activeIndex === index ? "active" : ""])}
										onClick={() => toggleAccordion(index)}
									>
										<h2 className="heading--24 color--primary">{item.pregunta}</h2>
										<span>
											{activeIndex === index ? (
												<IconChevronUp />
											) : (
												<IconChevronDown />
											)}
										</span>
									</div>
									{activeIndex === index && (
										<div
											className="heading--16 color--gray"
											dangerouslySetInnerHTML={{ __html: item.respuesta }}
										/>
									)}
								</div>
							))}
						</div>
						<div className={cx("img")}>
							<Image
								layout="fill"
								src={imagen?.mediaItemUrl}
								quality={100}
								priority
								sizes="100vw"
								objectFit="cover"
								alt={imagen?.altText}
								title={imagen?.title}
							/>
						</div>
					</div>
				</div>
			</Container>
		</section>
	);
};

export default Accordion;
