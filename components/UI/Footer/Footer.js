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
	const redes = themeGeneralSettings?.options?.grupoFooter?.redes;
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
								<a className="heading--20 font-weight--500 color--white">
									Contacto
								</a>
							</Link>
							{menuItems?.map((link, index) => (
								<Link key={index} href={link?.path}>
									<a className="heading--20 font-weight--500 color--white">
										{link?.label}
									</a>
								</Link>
							))}
						</div>

						<div className={cx("menu-social")}>
							<div className={cx("menu")}>
								{menuItemsMain?.map((link, index) => (
									<Link key={index} href={link?.path}>
										<a className="heading--20 font-weight--500 color--white">
											{link?.label}
										</a>
									</Link>
								))}
							</div>
							{/* Social */}
							{redes && (
								<div className={cx("social")}>
									{redes.map((social, index) => (
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

					<div className={cx("mobile")}>
						<div className={cx(["menu", "mobile"])}>
							<Link href="/contacto">
								<a className="heading--20 font-weight--500 color--white">
									Contacto
								</a>
							</Link>
							{menuItems?.map((link, index) => (
								<Link key={index} href={link?.path}>
									<a className="heading--20 font-weight--500 color--white">
										{link?.label}
									</a>
								</Link>
							))}
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
