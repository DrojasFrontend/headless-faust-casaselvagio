import Head from 'next/head';

/**
 * Provide SEO related meta tags to a page.
 *
 * @param {Props} props The props object.
 * @param {string} props.title Used for the page title, og:title, twitter:title, etc.
 * @param {string} props.description Used for the meta description, og:description, twitter:description, etc.
 * @param {string} props.imageUrl Used for the og:image and twitter:image. NOTE: Must be an absolute url.
 * @param {string} props.url Used for the og:url and twitter:url.
 *
 * @returns {React.ReactElement} The SEO component
 */
export default function SEO({ data, themeGeneralSettings }) {

  if (!data && !themeGeneralSettings) {
    return null;
  }

  const {title, metaDesc, opengraphImage, canonical } = data;
  console.log(data)

  return (
    <>
      <Head>
        <meta property="og:type" content="website" />
        <meta property="twitter:card" content="summary_large_image" />
        <link rel='shortcut icon' href={themeGeneralSettings?.options?.favicon?.mediaItemUrl} />
        <meta name="google-site-verification" content="kIrRZ8SfE0YMixMItktR8EBfaTmelZVAhWh6TMsAsJk" />
        {title && (
          <>
            <title>{title}</title>
            <meta name="title" content={title} />
            <meta property="og:title" content={title} />
            <meta property="twitter:title" content={title} />
          </>
        )}
        {metaDesc && (
          <>
            <meta name="description" content={metaDesc} />
            <meta property="og:description" content={metaDesc} />
            <meta property="twitter:description" content={metaDesc} />
          </>
        )}
        {opengraphImage && (
          <>
            <meta property="og:image" content={mediaItemUrl} />
            <meta property="twitter:image" content={mediaItemUrl} />
          </>
        )}
        {/* {url && (
          <>
            <meta property="og:url" content={url} />
            <meta property="twitter:url" content={url} />
          </>
        )} */}
        <link rel="canonical" href={canonical} />
      </Head>
    </>
  );
}
