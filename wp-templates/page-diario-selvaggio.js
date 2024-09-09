import { useState } from "react";
import { useRouter } from "next/router";
import { useQuery, gql } from "@apollo/client";
import * as MENUS from "../constants/menus";
import { BlogInfoFragment } from "../fragments/GeneralSettings";
import {
	Footer,
	HeroImageTextCTA,
	Main,
	NavigationMenu,
	SEO,
} from "../components";

import { Header } from "../components/UI/Header";
import { CardsGridTwo } from "../components/UI/Cards/CardsGridTwo";
import { TextImage } from "../components/UI/TextImages";
import { CardsGridFourCarusel } from "../components/UI/Cards/CardsGridFourCarusel";

export default function Component(props, pageProps) {
	const router = useRouter();
	const { data } = useQuery(Component.query, {
		variables: Component.variables(),
	});

	const { title: siteTitle, description: siteDescription } =
		data?.generalSettings;
	const primaryMenu = data?.headerMenuItems?.nodes ?? [];
	const footerMenu = data?.footerMenuItems?.nodes ?? [];

	const grupoTexto =
		props?.data?.pageBy?.paginaDiarioSelvaggio?.grupotexto ?? [];
	const grupoHero = props?.data?.pageBy?.paginaDiarioSelvaggio?.grupoHero ?? [];
	const grupoTargetas =
		props?.data?.pageBy?.paginaDiarioSelvaggio?.grupotargetas ?? [];
	const grupoEquipo =
		props?.data?.pageBy?.paginaDiarioSelvaggio?.grupoequipo ?? [];

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
				<HeroImageTextCTA data={grupoHero} />
				<TextImage data={grupoTexto} />
				<CardsGridTwo data={grupoTargetas} />
				<CardsGridFourCarusel data={grupoEquipo} />
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
		pageBy(uri: "/diario-selvaggio") {
			paginaDiarioSelvaggio {
				grupoHero {
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
				grupotexto {
					items {
						estilo
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
						items {
							titulo
						}
					}
				}
				grupotargetas {
					titulo
					descripcion
					items {
						titulo
						detalle
						imagen {
							mediaItemUrl
							altText
							title
						}
					}
				}
				grupoequipo {
					titulo
					descripcion
					items {
						nombre
						rol
						imagen {
							mediaItemUrl
							altText
							title
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
