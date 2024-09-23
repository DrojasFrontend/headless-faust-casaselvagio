import Link from "next/link";
import Image from "next/image";

import classNames from "classnames/bind";
import styles from "./Footer.module.scss";
let cx = classNames.bind(styles);

import LogoDefault from "/public/img/logocasaselvaggio.svg";

import { Container } from "../../Layout/Container";
import IconInstagram from "../../SVG/IconInstagram";
import IconFacebook from "../../SVG/IconFacebook";
import IconYoutube from "../../SVG/IconYoutube";
import IconWaze from "../../SVG/IconWaze";
import IconWhatsapp from "../../SVG/IconWhatsapp";
import IconTikTok from "../../SVG/IconTikTok";

export default function Footer({
	themeGeneralSettings,
	menuItemsMain,
	menuItems,
}) {
	const Logo = themeGeneralSettings?.options?.grupoheader?.logo?.mediaItemUrl;
	return (
		<footer className={cx("component")}>
			<div className={cx("bckg")}>
				<Container>
					<div className={cx("grid")}>
						<div className={cx("logo")}>
							<Link href="/">
								<a aria-label="Ir a la página de inicio">
									<Image
										src={Logo}
										width={242}
										height={105}
										alt="Logotipo de Casaselvaggio Hotel Campestre"
										title="Casaselvaggio Hotel Campestre - Relax y naturaleza en un entorno rural"
									/>
								</a>
							</Link>
						</div>

						<div className={cx(["menu", "desktop"])}>
							<Link href="/contacto">
								<a className="heading--20 font-weight--100 color--white">
									Contacto
								</a>
							</Link>
							{menuItems?.map((link, index) => (
								<Link key={index} href={link?.path}>
									<a className="heading--20 font-weight--100 color--white">
										{link?.label}
									</a>
								</Link>
							))}
						</div>

						<div className={cx("menu-social")}>
							<div className={cx("menu")}>
								{menuItemsMain?.map((link, index) => (
									<Link key={index} href={link?.path}>
										<a className="heading--20 font-weight--100 color--white">
											{link?.label}
										</a>
									</Link>
								))}
							</div>
							<div className={cx("social")}>
								<Link
									href="https://www.instagram.com/casaselvaggio/?hl=es"
									target="_blank"
								>
									<a aria-label="Enlace a Instagram de Casaselvaggio">
										<IconInstagram />
									</a>
								</Link>
								<Link
									href="https://www.facebook.com/profile.php?id=100088355431900&mibextid=LQQJ4d"
									target="_blank"
								>
									<a aria-label="Enlace a Facebook de Casaselvaggio">
										<IconFacebook />
									</a>
								</Link>
								<Link href="#" target="_blank">
									<a aria-label="Enlace a Waze de Casaselvaggio">
										<IconWaze />
									</a>
								</Link>
								<Link href="#" target="_blank">
									<a aria-label="Enlace a YouTube de Casaselvaggio">
										<IconYoutube />
									</a>
								</Link>
								<Link href="#" target="_blank">
									<a aria-label="Enlace a WhatsApp de Casaselvaggio">
										<IconWhatsapp />
									</a>
								</Link>
								<Link
									href="https://www.tiktok.com/@casaselvaggio?_t=8phLJpiinOn&_r=1"
									target="_blank"
								>
									<a aria-label="Enlace a TikTok de Casaselvaggio">
										<IconTikTok />
									</a>
								</Link>
							</div>
						</div>
					</div>

					<div className={cx("mobile")}>
						<div className={cx(["menu", "mobile"])}>
							<Link href="/contacto">
								<a className="heading--20 font-weight--100 color--white">
									Contacto
								</a>
							</Link>
							<Link href="/preguntas-frecuentes">
								<a className="heading--20 font-weight--100 color--white">
									Preguntas Frecuentes
								</a>
							</Link>
							<Link href="/politica-de-privacidad">
								<a className="heading--20 font-weight--100 color--white">
									Política de privacidad
								</a>
							</Link>
							<Link href="/trabaja-con-nosotros">
								<a className="heading--20 font-weight--100 color--white">
									Trabaja con nosotros
								</a>
							</Link>
						</div>
					</div>

					<div className={cx("grid-bottom")}>
						<div></div>
						<div className={cx("copy")}>
							<p>© Copyright 2024, CASA SELVAGGIO</p>
						</div>
					</div>
				</Container>
			</div>
		</footer>
	);
}
