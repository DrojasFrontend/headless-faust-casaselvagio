import Link from "next/link";
import { useRouter } from "next/router";
import className from "classnames/bind";
import styles from "./Breadcrumbs.module.scss";

let cx = className.bind(styles);

export default function Breadcrumbs() {
	const router = useRouter();
	const { asPath } = router;

	const pathArray = asPath.split("/").filter((segment) => segment !== "");

	const breadcrumbs = pathArray.map((segment, index) => {
		const href = "/" + pathArray.slice(0, index + 1).join("/");
		return { segment, href };
	});

	return (
		<nav aria-label="breadcrumb">
			<ul className={cx("breadcrumbs")}>
				{/* Inicio siempre es un enlace */}
				<li>
					<Link href="/">
						<a className="heading--14 color--primary">Inicio</a>
					</Link>
				</li>
				{/* Los demás elementos no son enlaces */}
				{breadcrumbs.map((crumb, index) => (
					<li key={index}>
						{/* Mostrar los demás elementos como texto sin enlace */}
						<span>{crumb.segment.replace(/-/g, " ")}</span>
					</li>
				))}
			</ul>
		</nav>
	);
}
