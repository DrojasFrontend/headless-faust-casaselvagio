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

export default function Footer() {
	return (
		<footer className={cx("component")}>
			<div className={cx("bckg")}>
				<Container>
					<div className={cx("grid")}>
						<div className={cx("logo")}>
							<Link href="/">
								<a>
									<Image src={LogoDefault} alt="" title="logo footer" />
								</a>
							</Link>
						</div>

						<div className={cx(["menu", "desktop"])}>
							<Link href="/contacto">
								<a className="heading--20 font-weight--100 color--white">
									Contacto
								</a>
							</Link>
							<Link href="/faqa">
								<a className="heading--20 font-weight--100 color--white">FAQ</a>
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

						<div className={cx("menu-social")}>
							<div className={cx("menu")}>
								<Link href="/eco-villas">
									<a className="heading--20 font-weight--100 color--white">
										{" "}
										Eco-villas
									</a>
								</Link>
								<Link href="/restaurante">
									<a className="heading--20 font-weight--100 color--white">
										{" "}
										Restaurante
									</a>
								</Link>
								<Link href="/tours">
									<a className="heading--20 font-weight--100 color--white">
										{" "}
										Experiencias
									</a>
								</Link>
								<Link href="/diario-selvaggio">
									<a className="heading--20 font-weight--100 color--white">
										{" "}
										Diario Selvaggio
									</a>
								</Link>
								<Link href="/galeria">
									<a className="heading--20 font-weight--100 color--white">
										{" "}
										Galería
									</a>
								</Link>
								<Link href="/blog">
									<a className="heading--20 font-weight--100 color--white">
										{" "}
										Blog
									</a>
								</Link>
							</div>
							<div className={cx("social")}>
								<Link href="#">
									<a>
										<IconInstagram />
									</a>
								</Link>
								<Link href="#">
									<a>
										<IconFacebook />
									</a>
								</Link>
								<Link href="#">
									<a>
										<IconWaze />
									</a>
								</Link>
								<Link href="#">
									<a>
										<IconYoutube />
									</a>
								</Link>
								<Link href="#">
									<a>
										<IconWhatsapp />
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
							<Link href="/faqa">
								<a className="heading--20 font-weight--100 color--white">FAQ</a>
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
