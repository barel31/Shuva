import { createClient, QueryParams } from 'next-sanity';
import imageUrlBuilder from '@sanity/image-url';
import { type SanityImageSource } from '@sanity/image-url/lib/types/types';

export const Client = createClient({
  projectId: 'qz8fryfa',
  dataset: 'production',
  apiVersion: '2023-05-29',
  useCdn: true,
});

export const getRoutes: Promise<Route[]> = sanityFetch({
  query: `*[_type == "routes"]{ ..., "children": coalesce(children[]->, []) } | order(_createdAt asc)`,
});

export const getRoute = (slug: string): Promise<Route> =>
  sanityFetch({
    query: `*[_type == "routes" && slug.current == "${slug}"]{ ..., "children": children[]-> }[0]`,
  });

export const getContactInfo: Promise<ContactInfo> = sanityFetch({
  query: `*[_type == "contactInfo"] | order(_createdAt asc) [0]`,
});

const builder = imageUrlBuilder(Client);

export const urlFor = (source: SanityImageSource) => builder.image(source!);

// Helper function to add next revalidation
export async function sanityFetch<QueryResponse>({
  query,
  params = {},
  revalidate = 3600, // default revalidation time in seconds (1 hour)
  tags = [],
}: {
  query: string;
  params?: QueryParams;
  revalidate?: number | false;
  tags?: string[];
}) {
  return Client.fetch<QueryResponse>(query, params, {
    next: {
      revalidate: tags.length ? false : revalidate, // for simple, time-based revalidation
      tags, // for tag-based revalidation
    },
  });
}
