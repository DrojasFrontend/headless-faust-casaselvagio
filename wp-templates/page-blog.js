import { gql } from "@apollo/client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import * as MENUS from "../constants/menus";
import { BlogInfoFragment } from "../fragments/GeneralSettings";
import {
	Footer,
	Main,
	NavigationMenu,
	FeaturedImage,
	SEO,
} from "../components";

import { HeaderWhite } from "../components/UI/Header/HeaderWhite";
import { Container } from "../components/Layout/Container";
import { HeroCaruselPosts } from "../components/UI/Heros/HeroCaruselPosts";
import { CardPost } from "../components/UI/Cards/CardPost";
export default function Component(props) {
	// Loading state for previews
	if (props.loading) {
		return <>Loading...</>;
	}

	const themeGeneralSettings = props?.data?.themeGeneralSettings ?? [];
	const { title: siteTitle, description: siteDescription } =
		props?.data?.generalSettings;
	const primaryMenu = props?.data?.headerMenuItems?.nodes ?? [];
	const footerMenuMain = props?.data?.footerMenuItemsMain?.nodes ?? [];
	const footerMenu = props?.data?.footerMenuItems?.nodes ?? [];
	const { title, content, featuredImage } = props?.data?.page ?? { title: "" };

	const mostrarCarusel = props?.data?.page?.paginaBlog?.mostrarcarusel ?? "";
	const posts = props?.data?.posts?.edges ?? [];
	const categories = props?.data?.categories?.edges ?? [];

	if (!posts.length === 0) {
		return null;
	}

	const [isNavShown, setIsNavShown] = useState(false);

	console.log(posts)

	return (
		<>
			<SEO title={siteTitle} description={siteDescription} themeGeneralSettings={themeGeneralSettings} />
			<HeaderWhite
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
				{mostrarCarusel && <HeroCaruselPosts data={posts} />}
				<section className="CardsPost">
					<div className="CardsPost__scroll">
						<ul className="CardsPost__category">
							{categories
								.filter((category) => category?.node?.slug !== "uncategorized") // Filtrar "Uncategorized"
								.map((category, index) => (
									<li key={index}>
										<Link href={`categoria/${category?.node?.slug}`}>
											<a className="category">
												<Image
													src={
														category?.node?.postCategoria?.icono?.mediaItemUrl
													}
													alt={category?.node?.name}
													width={44}
													height={44}
												/>
												{category?.node?.name}
											</a>
										</Link>
									</li>
								))}
						</ul>
					</div>
					<Container>
						<h2 className="heading--40 color--primary">Descubrir artículos</h2>
						<div className="CardsPost__grid">
							{posts.map((post, index) => (
								<CardPost key={index} data={post} />
							))}
						</div>
					</Container>
				</section>
			</Main>
			<Footer
				title={siteTitle}
				menuItemsMain={footerMenuMain}
				menuItems={footerMenu}
			/>
		</>
	);
}

Component.variables = ({ databaseId }, ctx) => {
	return {
		databaseId,
		headerLocation: MENUS.PRIMARY_LOCATION,
		footerLocationMain: MENUS.FOOTER_LOCATION_MAIN,
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
		$footerLocationMain: MenuLocationEnum
		$footerLocation: MenuLocationEnum
		$asPreview: Boolean = false
	) {
		page(id: $databaseId, idType: DATABASE_ID, asPreview: $asPreview) {
			title
			content
			...FeaturedImageFragment
			paginaBlog {
				mostrarcarusel
			}
		}
		posts(first: 9) {
			edges {
				node {
					id
					title
					uri
					excerpt
					featuredImage {
						node {
							mediaItemUrl
							altText
							title(format: RAW)
						}
					}
					author {
						node {
							firstName
						}
					}
					date
					internaBlog {
						imgen {
							mediaItemUrl
							altText
							title
						}
					}
				}
			}
		}
		categories(first: 10) {
			edges {
				node {
					id
					name
					slug
					postCategoria {
						icono {
							mediaItemUrl
						}
					}
				}
			}
		}
		generalSettings {
			...BlogInfoFragment
		}
		themeGeneralSettings {
			pageSlug
			pageTitle
			options {
				favicon {
					mediaItemUrl
				}
				grupoheader {
					logo {
						mediaItemUrl
					}
					logoGreen {
						mediaItemUrl
					}
				}
			}
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
		footerMenuItemsMain: menuItems(where: { location: $footerLocationMain }) {
			nodes {
				...NavigationMenuItemFragment
			}
		}
	}
`;
