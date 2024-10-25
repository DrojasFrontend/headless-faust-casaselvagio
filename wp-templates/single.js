import { gql } from "@apollo/client";
import { useState } from "react";
import * as MENUS from "../constants/menus";
import { BlogInfoFragment } from "../fragments/GeneralSettings";
import Image from "next/image";
import Link from "next/link";
import { sanitize } from "../utils/miscellaneous";

import { useFaustQuery } from "@faustwp/core";
import {
	Container,
	ContentWrapper,
	FeaturedImage,
	Footer,
	FormatDate,
	Main,
	NavigationMenu,
	SEO,
} from "../components";

import { HeaderGreen } from "../components/UI/Header/HeaderGreen";
import { Breadcrumbs } from "../components/Breadcrumbs";

import ImageNotAvailable from "/public/img/image-not-available.png";

const GET_LAYOUT_QUERY = gql`
	${BlogInfoFragment}
	${NavigationMenu.fragments.entry}
	query GetLayout(
		$headerLocation: MenuLocationEnum
		$menuHeaderLocation: MenuLocationEnum
		$footerLocationMain: MenuLocationEnum
		$footerLocation: MenuLocationEnum
	) {
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
				grupoFooter {
					redes {
						link {
							target
							title
							url
						}
						icon {
							mediaItemUrl
						}
					}
				}
			}
		}
		headerMenuItems: menuItems(where: { location: $headerLocation }) {
			nodes {
				...NavigationMenuItemFragment
			}
		}
		menuHeaderMenuItems: menuItems(where: { location: $menuHeaderLocation }) {
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

const GET_POST_QUERY = gql`
	${FeaturedImage.fragments.entry}
	query GetPost($databaseId: ID!, $asPreview: Boolean = false) {
		post(id: $databaseId, idType: DATABASE_ID, asPreview: $asPreview) {
			title
			content
			date
			seo {
				title
				metaDesc
				canonical
				opengraphImage {
					mediaItemUrl
				}
			}
			author {
				node {
					name
				}
			}
			...FeaturedImageFragment
		}
	}
`;

const GET_RECENT_POSTS_QUERY = gql`
	query GetRecentPosts($first: Int!) {
		posts(first: $first) {
			edges {
				node {
					id
					title
					uri
					excerpt
					date
					featuredImage {
						node {
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
export default function Component(props) {
	// Loading state for previews
	if (props.loading) {
		return <>Loading...</>;
	}

	const { post } = useFaustQuery(GET_POST_QUERY);
	const { posts } = useFaustQuery(GET_RECENT_POSTS_QUERY);

	const siteSeo = post?.seo;

	const recentPosts = posts?.edges ?? [];
	const {
		generalSettings,
		headerMenuItems,
		menuHeaderMenuItems,
		footerMenuItems,
		footerMenuItemsMain,
		themeGeneralSettings,
	} = useFaustQuery(GET_LAYOUT_QUERY);

	const primaryMenu = headerMenuItems?.nodes ?? [];
	const headerMenu = menuHeaderMenuItems?.nodes ?? [];
	const footerMenu = footerMenuItems?.nodes ?? [];
	const footerMenuMain = footerMenuItemsMain?.nodes ?? [];
	const { title, content, featuredImage, date, author } = post ?? {};

	const [isNavShown, setIsNavShown] = useState(false);

	return (
		<>
			<SEO data={siteSeo} themeGeneralSettings={themeGeneralSettings} />
			<HeaderGreen
				title={siteSeo?.title}
				isNavShown={isNavShown}
				setIsNavShown={setIsNavShown}
				menuItems={primaryMenu}
				menuHeaderItems={headerMenu}
			/>
			<Main
				menuItems={primaryMenu}
				isNavShown={isNavShown}
				setIsNavShown={setIsNavShown}
			>
				<>
					{/* TODO */}
					<div className="sectionDetailPost">
						<Container>
							<div className="sectionDetailPost__grid">
								<section>
									<Breadcrumbs />
									<h1 className="heading--54 color--primary">{title}</h1>
									<div className="sectionDetailPost__img">
										{featuredImage?.node?.sourceUrl && (
											<Image
												layout="fill"
												src={featuredImage.node.sourceUrl}
												priority
												alt={featuredImage.node.altText}
												title={featuredImage.node.title}
												objectFit="cover"
											/>
										)}
									</div>
									<ContentWrapper content={content} />
								</section>
								<section className="sectionSideBar">
									<h2 className="heading--18 color--primary">Recientes</h2>
									{recentPosts.map((post, index) => (
										<div key={index}>
											<Link href={post?.node?.uri}>
												<a className="sectionDetailPost__post">
													<div className="sectionDetailPost__thumbnail">
														{post?.node?.featuredImage ? (
															<Image
																src={
																	post?.node?.featuredImage?.node?.mediaItemUrl
																}
																layout="fill"
																objectFit="cover"
																sizes="100vw"
																alt={featuredImage?.node?.altText}
																title={featuredImage?.node?.title}
															/>
														) : (
															<Image
																src={ImageNotAvailable}
																width={372}
																height={230}
																sizes="100vw"
																alt="Imagen no disponible"
																title="no disponible"
															/>
														)}
													</div>
													<div className="sectionDetailPost__info">
														<h3
															className="heading--14 color--primary"
															dangerouslySetInnerHTML={{
																__html: sanitize(post?.node?.title),
															}}
														/>

														<p className="heading--12 color--gray">
															<FormatDate data={post?.node?.date} />
															{post?.node?.date && (
																<time dateTime={post?.node?.date}>
																	<FormatDate date={post?.node?.date} />
																</time>
															)}
														</p>
													</div>
												</a>
											</Link>
										</div>
									))}
								</section>
							</div>
						</Container>
					</div>
				</>
			</Main>
			<Footer
				themeGeneralSettings={themeGeneralSettings}
				menuItemsMain={footerMenuMain}
				menuItems={footerMenu}
			/>
		</>
	);
}

Component.queries = [
	{
		query: GET_LAYOUT_QUERY,
		variables: (seedNode, ctx) => ({
			headerLocation: MENUS.PRIMARY_LOCATION,
			menuHeaderLocation: MENUS.HEADER_LOCATION,
			footerLocationMain: MENUS.FOOTER_LOCATION_MAIN,
			footerLocation: MENUS.FOOTER_LOCATION,
		}),
	},
	{
		query: GET_POST_QUERY,
		variables: ({ databaseId }, ctx) => ({
			databaseId,
			asPreview: ctx?.asPreview,
		}),
	},
	{
		query: GET_RECENT_POSTS_QUERY,
		variables: () => ({
			first: 5,
		}),
	},
];
