import { useState } from "react";
import { useRouter } from "next/router";
import { useQuery, gql } from "@apollo/client";
import * as MENUS from "../constants/menus";
import { BlogInfoFragment } from "../fragments/GeneralSettings";
import { Footer, Main, NavigationMenu, SEO } from "../components";

import { Header } from "../components/UI/Header";
import { HeroCarusel } from "../components/UI/Heros/HeroCarusel";
import { CardsGridThree } from "../components/UI/Cards/CardsGridThree";
import { CardsMasonry } from "../components/UI/Cards/CardsMasonry";
import { BannerTextCta } from "../components/UI/Banners/BannerTextCta";

export default function Component(props, pageProps) {
	const router = useRouter();
	const { data } = useQuery(Component.query, {
		variables: Component.variables(),
	});

	const { title: siteTitle, description: siteDescription } =
		data?.generalSettings;
	const primaryMenu = data?.headerMenuItems?.nodes ?? [];
	const footerMenu = data?.footerMenuItems?.nodes ?? [];

	const grupoCarusel =
		props?.data?.pageBy?.paginaExperiencias?.grupoCarusel ?? [];
	const grupoSitios =
		props?.data?.pageBy?.paginaExperiencias?.grupositios ?? [];

	const postExperiencias = props?.data?.experiencias?.nodes ?? [];

	const grupoCta = props?.data?.pageBy?.paginaExperiencias?.grupoCta ?? [];

	const [isNavShown, setIsNavShown] = useState(false);

	return (
		<>
			<SEO title={siteTitle} description={siteDescription} />
			<Header
				title={siteTitle}
				description={siteDescription}
				isNavShown={isNavShown}
				setIsNavShown={setIsNavShown}
				router={router}
			/>
			<Main
				menuItems={primaryMenu}
				isNavShown={isNavShown}
				setIsNavShown={setIsNavShown}
			>
				<HeroCarusel data={grupoCarusel} />
				<CardsGridThree data={postExperiencias} />
				<CardsMasonry data={grupoSitios} />
				<BannerTextCta data={grupoCta} />
			</Main>
			<Footer title={siteTitle} menuItems={footerMenu} />
		</>
	);
}

Component.query = gql`
	${BlogInfoFragment}
	${NavigationMenu.fragments.entry}
	query GetPageData(
		$headerLocation: MenuLocationEnum
		$footerLocation: MenuLocationEnum
	) {
		generalSettings {
			...BlogInfoFragment
		}
		headerMenuItems: menuItems(where: { location: $headerLocation }) {
			nodes {
				...NavigationMenuItemFragment
			}
		}
		footerMenuItems: menuItems(where: { location: $footerLocation }) {
			nodes {
				...NavigationMenuItemFragment
			}
		}
		pageBy(uri: "/tours") {
			paginaExperiencias {
				grupoCarusel {
					slides {
						titulo
						descripcion
						imagen {
							mediaItemUrl
							altText
							title
						}
						cta {
							target
							title
							url
						}
					}
				}
				grupositios {
					titulo
					descripcion
					targetas {
						titulo
						imagen {
							mediaItemUrl
							altText
							title
						}
						items {
							titulo
						}
					}
					cantidad
					detalle
					cta {
						target
						title
						url
					}
				}
				grupoCta {
					imagen {
						mediaItemUrl
						altText
						title
					}
					titulo
					cta {
						url
						title
						target
					}
				}
			}
		}
		experiencias {
			nodes {
				title
				excerpt
				link
				featuredImage {
					node {
						altText
						mediaItemUrl
						title
					}
				}
				postExperiencia {
					grupocaracteristicas {
						titulo
						caracteristica {
							detalle
						}
						titulo
					}
				}
			}
		}
	}
`;

Component.variables = () => {
	return {
		headerLocation: MENUS.PRIMARY_LOCATION,
		footerLocation: MENUS.FOOTER_LOCATION,
	};
};
