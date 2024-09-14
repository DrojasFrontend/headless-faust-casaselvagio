import { useState } from "react";
import { useRouter } from "next/router";
import { useQuery, gql } from "@apollo/client";
import * as MENUS from "../constants/menus";
import { BlogInfoFragment } from "../fragments/GeneralSettings";
import { Accordion, Footer, Main, NavigationMenu, SEO } from "../components";

import { Header } from "../components/UI/Header";
import { HeroImageMedium } from "../components/UI/Heros/HeroImageMedium";

export default function Component(props, pageProps) {
	const router = useRouter();
	const { data } = useQuery(Component.query, {
		variables: Component.variables(),
	});

	const { title: siteTitle, description: siteDescription } =
		data?.generalSettings;
	const primaryMenu = data?.headerMenuItems?.nodes ?? [];
	const footerMenu = data?.footerMenuItems?.nodes ?? [];

	const grupoHero = props?.data?.pageBy?.paginaFaqs?.grupoHero ?? [];
	const mostrarHero = props?.data?.pageBy?.paginaFaqs?.mostrarHero ?? "";
	const grupoPreguntas = props?.data?.pageBy?.paginaFaqs?.grupoPreguntas ?? [];
	const mostrarPreguntas =
		props?.data?.pageBy?.paginaFaqs?.mostrarPreguntas ?? "";

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
				{mostrarHero && <HeroImageMedium data={grupoHero} />}
				{mostrarPreguntas && <Accordion data={grupoPreguntas} />}
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
		pageBy(uri: "/preguntas-frecuentes") {
			paginaFaqs {
				mostrarHero
				mostrarPreguntas
				grupoHero {
					titulo
					imagen {
						mediaItemUrl
						altText
						title
					}
				}
				grupoPreguntas {
					imagen {
						mediaItemUrl
						altText
						title
					}
					items {
						pregunta
						respuesta
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
