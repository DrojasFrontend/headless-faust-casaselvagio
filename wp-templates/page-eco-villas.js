import { useState } from "react";
import { useQuery, gql } from "@apollo/client";
import * as MENUS from "../constants/menus";
import { BlogInfoFragment } from "../fragments/GeneralSettings";
import { Footer, Main, NavigationMenu, SEO } from "../components";

import { Header } from "../components/UI/Header";
import { HeroCarusel } from "../components/UI/Heros/HeroCarusel";
import { TextImage } from "../components/UI/TextImages";

export default function Component(props) {
	const { data } = useQuery(Component.query, {
		variables: Component.variables(),
	});

	const { title: siteTitle, description: siteDescription } =
		data?.generalSettings;
	const primaryMenu = data?.headerMenuItems?.nodes ?? [];
	const footerMenu = data?.footerMenuItems?.nodes ?? [];

  const grupocarusel = props?.data?.pageBy?.paginaEcoVillas?.grupocarusel ?? [];
  const grupoTexto = props?.data?.pageBy?.paginaEcoVillas?.grupoTexto ?? [];

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
        <HeroCarusel data={grupocarusel} />
        <TextImage data={grupoTexto}/>
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
    pageBy(uri: "/eco-villas") {
      paginaEcoVillas {
        grupocarusel {
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
        grupoTexto {
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
