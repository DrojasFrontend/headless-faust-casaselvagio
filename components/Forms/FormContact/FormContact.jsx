import React from "react";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

import className from "classnames/bind";
import styles from "./FormContact.module.scss";
let cx = className.bind(styles);

import SocialMedia from "../../UI/SocialMedia/SocialMedia";
import IconEnvelope from "../../SVG/IconEnvelope";
import IconPhone from "../../SVG/IconPhone";
import IconWorld from "../../SVG/IconWorld";

const FormContact = ({ redesContact }) => {
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		occupation: "",
		phone: "",
		service: "",
		message: "",
	});

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData({
			...formData,
			[name]: value,
		});
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		// Aquí puedes manejar el envío del formulario, por ejemplo, enviarlo a una API
		console.log("Form Data Submitted: ", formData);
	};

	console.log(redesContact);

	return (
		<section className="FormContact">
			<div className={cx("component")}>
				<div className="container">
					<div className={cx("title")}>
						<h2 className="heading--44">
							¿Tienes alguna pregunta o deseas hacer una reserva?
						</h2>
						<span className="space space--20"></span>
					</div>
					<div className={cx("grid")}>
						<div className={cx("form")}>
							<form onSubmit={handleSubmit} className="contact__form">
								<div className="contact__form-group">
									<input
										type="text"
										name="name"
										placeholder="Nombre"
										value={formData.name}
										onChange={handleChange}
										required
									/>
									<input
										type="email"
										name="email"
										placeholder="Email"
										value={formData.email}
										onChange={handleChange}
										required
									/>
								</div>
								<div className="contact__form-group">
									<input
										type="text"
										name="occupation"
										placeholder="Ocupación"
										value={formData.occupation}
										onChange={handleChange}
									/>
									<input
										type="tel"
										name="phone"
										placeholder="Teléfono"
										value={formData.phone}
										onChange={handleChange}
									/>
								</div>
								<div className="contact__form-full">
									<select
										name="service"
										value={formData.service}
										onChange={handleChange}
									>
										<option value="" disabled>
											Servicios
										</option>
										<option value="service1">Servicio 1</option>
										<option value="service2">Servicio 2</option>
										<option value="service3">Servicio 3</option>
									</select>
								</div>
								<div className="contact__form-full">
									<textarea
										name="message"
										rows={6}
										placeholder="Escribir mensaje..."
										value={formData.message}
										onChange={handleChange}
									></textarea>
								</div>
								<button
									type="submit"
									className={cx([
										"button",
										"button button--primary button--right",
									])}
								>
									Enviar
								</button>
							</form>
						</div>
						<div className={cx("info")}>
							<Link href="mailto:info@casaselvaggio.com">
								<a className={cx("link")}>
									<span>
										<IconEnvelope />
									</span>
									info@casaselvaggio.com
								</a>
							</Link>
							<Link href="tel:+(+57) 3142619508">
								<a className={cx("link")}>
									<span>
										<IconPhone />
									</span>
									+1 (378) 400-1234
								</a>
							</Link>
							<Link href="https://www.casaselvaggio.com/">
								<a className={cx("link")}>
									<span>
										<IconWorld />
									</span>
									casaselvaggio.com
								</a>
							</Link>
							<div className={cx("social")}>
								{/* <SocialMedia /> */}
								{redesContact && (
									<div className={cx("social")}>
										{redesContact.map((social, index) => (
											<Link
												key={index}
												href={social?.link?.url}
												target={social?.link?.target}
											>
												<a aria-label="Enlace a Instagram de Casaselvaggio">
													<Image
														priority
														src={social?.icon?.mediaItemUrl}
														width={24}
														height={24}
														alt={social?.link?.title}
														title={`visitar ${social?.link?.title}`}
													/>
												</a>
											</Link>
										))}
									</div>
								)}
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default FormContact;
