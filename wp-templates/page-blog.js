import { gql } from "@apollo/client";
import * as MENUS from "../constants/menus";
import { BlogInfoFragment } from "../fragments/GeneralSettings";
import {
	Header,
	Footer,
	Main,
	NavigationMenu,
	FeaturedImage,
	SEO,
} from "../components";

import { Container } from "../components/Layout/Container";
import { HeroCarusel } from "../components/UI/Heros/HeroCarusel";
import { CardPost } from "../components/UI/Cards/CardPost";

export default function Component(props) {
	// Loading state for previews
	if (props.loading) {
		return <>Loading...</>;
	}

	const { title: siteTitle, description: siteDescription } =
		props?.data?.generalSettings;
	const primaryMenu = props?.data?.headerMenuItems?.nodes ?? [];
	const footerMenu = props?.data?.footerMenuItems?.nodes ?? [];
	const { title, content, featuredImage } = props?.data?.page ?? { title: "" };

	const grupoCarusel = props?.data?.page?.paginaBlog?.grupocarusel ?? [];
	const mostrarCarusel = props?.data?.page?.paginaBlog?.mostrarcarusel ?? "";
	const posts = props?.data?.posts?.edges ?? [];

	if (!posts.length === 0) {
		return null;
	}

	return (
		<>
			<SEO
				title={siteTitle}
				description={siteDescription}
				imageUrl={featuredImage?.node?.sourceUrl}
			/>
			<Header
				title={siteTitle}
				description={siteDescription}
				menuItems={primaryMenu}
			/>
			<Main>
				{mostrarCarusel && <HeroCarusel data={grupoCarusel} />}
				<div className="CardsPost">
					<Container>
						<h2 className="heading--40 color--primary">Descubrir artículos</h2>
						<div className="CardsPost__grid">
							{posts.map((post, index) => (
								<CardPost key={index} data={post} />
							))}
						</div>
					</Container>
				</div>
			</Main>
			<Footer title={siteTitle} menuItems={footerMenu} />
		</>
	);
}

Component.variables = ({ databaseId }, ctx) => {
	return {
		databaseId,
		headerLocation: MENUS.PRIMARY_LOCATION,
		footerLocation: MENUS.FOOTER_LOCATION,
		asPreview: ctx?.asPreview,
	};
};

Component.query = gql`
	${BlogInfoFragment}
	${NavigationMenu.fragments.entry}
	${FeaturedImage.fragments.entry}
	query GetPageData(
		$databaseId: ID!
		$headerLocation: MenuLocationEnum
		$footerLocation: MenuLocationEnum
		$asPreview: Boolean = false
	) {
		page(id: $databaseId, idType: DATABASE_ID, asPreview: $asPreview) {
			title
			content
			...FeaturedImageFragment
			paginaBlog {
				mostrarcarusel
				grupocarusel {
					slides {
						titulo
						descripcion
						cta {
							target
							title
							url
						}
						imagen {
							mediaItemUrl
							altText
							title
						}
					}
				}
			}
		}
		posts(first: 9) {
			edges {
				node {
					id
					featuredImage {
						node {
							mediaItemUrl
							altText
							title(format: RAW)
						}
					}
					title(format: RAW)
					uri
					excerpt
				}
			}
		}
		generalSettings {
			...BlogInfoFragment
		}
		footerMenuItems: menuItems(where: { location: $footerLocation }) {
			nodes {
				...NavigationMenuItemFragment
			}
		}
		headerMenuItems: menuItems(where: { location: $headerLocation }) {
			nodes {
				...NavigationMenuItemFragment
			}
		}
	}
`;
