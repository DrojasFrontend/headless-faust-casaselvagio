import { useRouter } from "next/router";
import { gql, useQuery } from "@apollo/client";
import { GET_FLOATING_MENU } from "../../../../queries/queries";
import Link from "next/link";
import Image from "next/image";
import styles from "./NavigationMenuFloating.module.scss";

let cx = classNames.bind(styles);
import classNames from "classnames/bind";

export default function NavigationMenuFloating({}) {
	const { data, loading, error } = useQuery(GET_FLOATING_MENU);
	const router = useRouter();
	if (loading) return <p>Loading...</p>;
	if (error) return <p>Error: {error.message}</p>;
	const menuItems =
		data?.themeGeneralSettings?.options?.grupomenufloating?.items ?? [];
	return (
		<>
			<div className={cx("floatingMenu")}>
				<div className={cx("grid")}>
					{menuItems.map((item, index) => {
						const isActive = router?.asPath === item?.enlace?.url;
						return (
							item?.enlace?.url && (
								<Link href={item?.enlace?.url} key={index}>
									<a className={cx("floatingMenuCta", { isPage: isActive })}>
										<span className={cx("deafult")}>
											<Image
												src={item?.icono?.mediaItemUrl}
												width={27}
												height={27}
												alt={item?.enlace?.title}
											/>
										</span>
										<span className={cx("active")}>
											<Image
												src={item?.iconoActive?.mediaItemUrl}
												width={27}
												height={27}
												alt={item?.enlace?.title}
											/>
										</span>
										{item?.enlace?.title}
									</a>
								</Link>
							)
						);
					})}
				</div>
			</div>
		</>
	);
}

NavigationMenuFloating.fragments = {
	entry: gql`
		fragment NavigationMenuItemFragment on MenuItem {
			id
			path
			label
			parentId
			cssClasses
			menu {
				node {
					name
				}
			}
		}
	`,
};
