import React from "react";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

import className from "classnames/bind";
import styles from "./FormContact.module.scss";
let cx = className.bind(styles);

import SocialMedia from "../../UI/SocialMedia/SocialMedia";
import IconEnvelope from "../../SVG/IconEnvelope";
import IconPhone from "../../SVG/IconPhone";
import IconWorld from "../../SVG/IconWorld";

const FormContact = ({ redesContact }) => {
	const [formData, setFormData] = useState({
		nombre: "",
		email: "",
		ocupacion: "",
		telefono: "",
		servicios: "",
		mensaje: "",
	});

	const [isSubmitting, setIsSubmitting] = useState(false);
	const [submitStatus, setSubmitStatus] = useState(null);
	const phoneInputRef = useRef(null);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData({
			...formData,
			[name]: value,
		});
	};

	const handlePhoneChange = (value) => {
		setFormData({
			...formData,
			telefono: value,
		});
	};

	// Efecto para cerrar el dropdown al hacer clic fuera
	useEffect(() => {
		const handleClickOutside = (event) => {
			if (phoneInputRef.current && !phoneInputRef.current.contains(event.target)) {
				// Buscar el elemento dropdown y cerrarlo si está abierto
				const dropdown = document.querySelector('.react-tel-input .flag-dropdown.open');
				if (dropdown) {
					const flagButton = dropdown.querySelector('.selected-flag');
					if (flagButton) {
						flagButton.click();
					}
				}
			}
		};

		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, []);

	const handleSubmit = async (e) => {
		e.preventDefault();
		setIsSubmitting(true);
		setSubmitStatus(null);

		try {
			const response = await fetch('/api/contact', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					nombre: formData.nombre,
					email: formData.email,
					ocupacion: formData.ocupacion || 'No especificado',
					celular: formData.telefono,
					servicios: formData.servicios || 'No especificado',
					mensaje: formData.mensaje
				}),
			});

			const result = await response.json();

			if (response.ok) {
				setSubmitStatus({ success: true, message: 'Mensaje enviado correctamente' });
				setFormData({
					nombre: "",
					email: "",
					ocupacion: "",
					telefono: "",
					servicios: "",
					mensaje: "",
				});
			} else {
				setSubmitStatus({ success: false, message: result.error || 'Error al enviar el mensaje' });
			}
		} catch (error) {
			console.error('Error al enviar el formulario:', error);
			setSubmitStatus({ success: false, message: 'Error al enviar el mensaje. Intente nuevamente más tarde.' });
		} finally {
			setIsSubmitting(false);
		}
	};

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
										name="nombre"
										placeholder="Nombre"
										value={formData.nombre}
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
										name="ocupacion"
										placeholder="Ocupación"
										value={formData.ocupacion}
										onChange={handleChange}
									/>
									<div className={cx("phone-input-container")} ref={phoneInputRef}>
										<PhoneInput
											country={'co'}
											value={formData.telefono}
											onChange={handlePhoneChange}
											placeholder="Teléfono"
											inputProps={{
												name: 'telefono',
												required: true,
											}}
											containerClass={cx("phone-input")}
											inputClass={cx("phone-input-field")}
											buttonClass={cx("phone-input-button")}
											dropdownClass={cx("phone-input-dropdown")}
											searchClass={cx("phone-input-search")}
											enableSearch={true}
											disableSearchIcon={false}
											searchPlaceholder="Buscar país..."
											preferredCountries={['co', 'es', 'us', 'mx']}
											enableAreaCodes={true}
											autoFormat={true}
											countryCodeEditable={false}
										/>
									</div>
								</div>
								<div className="contact__form-full">
									<select
										name="servicios"
										value={formData.servicios}
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
										name="mensaje"
										rows={6}
										placeholder="Escribir mensaje..."
										value={formData.mensaje}
										onChange={handleChange}
									></textarea>
								</div>
								<button
									type="submit"
									className={cx([
										"button",
										"button button--primary button--right",
									])}
									disabled={isSubmitting}
								>
									{isSubmitting ? 'Enviando...' : 'Enviar'}
								</button>
								{submitStatus && (
									<div className={cx("status-message", submitStatus.success ? "success" : "error")}>
										{submitStatus.message}
									</div>
								)}
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
