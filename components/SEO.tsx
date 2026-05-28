import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from '../i18n';

const SITE_URL = 'https://ingecon.com.co';
const DEFAULT_OG_IMAGE = `${SITE_URL}/images/logo-ingecon-CUG5jr9Z.webp`;

interface SEOProps {
  /** Path relative to SITE_URL, e.g. "/carreras". Defaults to "/" */
  path?: string;
  /** Full <title>. If omitted, uses the site default. */
  title?: string;
  description?: string;
  /** Optional absolute OG image URL. */
  ogImage?: string;
  /** Optional Schema.org JSON-LD object for this route. */
  schema?: object;
  /** Hide from indexing (e.g. policy pages). */
  noindex?: boolean;
}

const SEO: React.FC<SEOProps> = ({
  path = '/',
  title,
  description,
  ogImage = DEFAULT_OG_IMAGE,
  schema,
  noindex = false,
}) => {
  const { locale } = useTranslation();
  const url = `${SITE_URL}${path}`;
  const ogLocale = locale === 'es' ? 'es_CO' : 'en_US';
  const altLocale = locale === 'es' ? 'en_US' : 'es_CO';

  return (
    <Helmet>
      {title && <title>{title}</title>}
      {description && <meta name="description" content={description} />}
      <link rel="canonical" href={url} />
      {noindex && <meta name="robots" content="noindex,follow" />}

      <meta property="og:url" content={url} />
      <meta property="og:locale" content={ogLocale} />
      <meta property="og:locale:alternate" content={altLocale} />
      {title && <meta property="og:title" content={title} />}
      {description && <meta property="og:description" content={description} />}
      <meta property="og:image" content={ogImage} />

      {title && <meta name="twitter:title" content={title} />}
      {description && <meta name="twitter:description" content={description} />}
      <meta name="twitter:image" content={ogImage} />

      {schema && (
        <script type="application/ld+json">{JSON.stringify(schema)}</script>
      )}
    </Helmet>
  );
};

export default SEO;
