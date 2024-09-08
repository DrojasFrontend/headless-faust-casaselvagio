import { useState } from "react";
import { useQuery, gql } from "@apollo/client";
import * as MENUS from "../constants/menus";
import { BlogInfoFragment } from "../fragments/GeneralSettings";
import { Footer, Main, NavigationMenu, SEO } from "../components";

import { Header } from "../components/UI/Header";
import { HeroImage } from "../components/UI/Heros/HeroImage";
import { CardsGrid } from "../components/UI/Cards/CardsGrid";
import { CardsBigSmall } from "../components/UI/Cards/CardsBigSmall";
import { CardsGridThreeCarusel } from "../components/UI/Cards/CardsGridThreeCarusel";

export default function Component(props) {
	const { data } = useQuery(Component.query, {
		variables: Component.variables(),
	});

	const { title: siteTitle, description: siteDescription } =
		data?.generalSettings;
	const primaryMenu = data?.headerMenuItems?.nodes ?? [];
	const footerMenu = data?.footerMenuItems?.nodes ?? [];

	const grupoHero = props?.data?.pageBy?.paginaInicio?.grupoHero ?? [];
	const grupoRefugio = props?.data?.pageBy?.paginaInicio?.gruporefugio ?? [];
	const grupohabitaciones =
		props?.data?.pageBy?.paginaInicio?.grupohabitaciones ?? [];
	const grupoexperiencias =
		props?.data?.pageBy?.paginaInicio?.grupoexperiencias ?? [];

	const [isNavShown, setIsNavShown] = useState(false);

	return (
		<>
			<SEO title={siteTitle} description={siteDescription} />
			<Header
				title={siteTitle}
				description={siteDescription}
				isNavShown={isNavShown}
				setIsNavShown={setIsNavShown}
			/>
			<Main
				menuItems={primaryMenu}
				isNavShown={isNavShown}
				setIsNavShown={setIsNavShown}
			>
				<HeroImage data={grupoHero} />
				<CardsGrid data={grupoRefugio} />
				<CardsBigSmall data={grupohabitaciones} />
				<CardsGridThreeCarusel data={grupoexperiencias} />
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
		pageBy(uri: "/") {
			paginaInicio {
				grupoHero {
					titulo
					imagen {
						mediaItemUrl
						altText
						title
					}
				}
				gruporefugio {
					descripcion
					titulo
					targetas {
						detalle
						titulo
						imagen {
							mediaItemUrl
							altText
							title
						}
					}
				}
				grupohabitaciones {
					titulo
					descripcion
					targetas {
						cta {
							url
							title
							target
						}
						titulo
						imagen {
							mediaItemUrl
							altText
							title
						}
					}
				}
				grupoexperiencias {
					titulo
					descripcion
					targetas {
						titulo
						subTitulo
						descripcion
						imagen {
							mediaItemUrl
							altText
							title
							mediaDetails {
								height
								width
							}
						}
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
