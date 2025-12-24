import { Helmet } from "react-helmet-async";
import { urlFor, type PageSEO as PageSEOType } from "@/lib/sanity";

interface PageSEOProps {
  seo?: PageSEOType;
  fallbackTitle: string;
  fallbackDescription?: string;
  siteName?: string;
}

const PageSEO = ({ seo, fallbackTitle, fallbackDescription, siteName }: PageSEOProps) => {
  const title = seo?.title || fallbackTitle;
  const description = seo?.description || fallbackDescription;
  const fullTitle = siteName ? `${title} | ${siteName}` : title;
  const ogImageUrl = seo?.ogImage?.asset?._ref ? urlFor(seo.ogImage).width(1200).height(630).url() : undefined;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      {description && <meta name="description" content={description} />}
      {seo?.keywords && seo.keywords.length > 0 && (
        <meta name="keywords" content={seo.keywords.join(", ")} />
      )}
      {seo?.canonicalUrl && <link rel="canonical" href={seo.canonicalUrl} />}
      
      {/* Open Graph */}
      <meta property="og:title" content={title} />
      {description && <meta property="og:description" content={description} />}
      {ogImageUrl && <meta property="og:image" content={ogImageUrl} />}
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      {description && <meta name="twitter:description" content={description} />}
      {ogImageUrl && <meta name="twitter:image" content={ogImageUrl} />}
    </Helmet>
  );
};

export default PageSEO;
