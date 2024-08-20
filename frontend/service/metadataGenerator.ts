import { getRoute } from '@/lib/client';
import { type ResolvingMetadata, type Metadata } from 'next';

export default async function generateMetadata(
  slug: string,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const [route, data] = await Promise.all([getRoute(slug), parent]);

  const previousTitle = data.title?.absolute;
  const previousDescription = data.description;
  const previousKeywords = data.keywords;

  if (!route) {
    return {
      title: previousTitle ? `עמוד לא נמצא | ${previousTitle}` : 'עמוד לא נמצא',
      description: `העמוד שחיפשת לא נמצא | ${previousDescription}`,
    };
  }

  // Exclude the home (/) prefix from the title
  const title =
    slug === '/'
      ? previousTitle
      : `${process.env.NEXT_PUBLIC_SITE_NAME_NO_DESCRIPTION} | ${route.name}`;

  return {
    title: title || route.name,
    description: `${route.content[0].children[0].text} | ${previousDescription}`,
    keywords: `${route.keywords}, ${previousKeywords}`,
  };
}
