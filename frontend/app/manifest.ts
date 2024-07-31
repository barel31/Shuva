import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: process.env.NEXT_PUBLIC_SITE_NAME!,
    short_name: process.env.NEXT_PUBLIC_SITE_NAME_SHORT!,
    description: process.env.NEXT_PUBLIC_SITE_DESCRIPTION!,
    icons: [
      {
        src: 'favicon.ico',
        sizes: '256x256',
        type: 'image/x-icon',
        purpose: 'any',
      },
    ],
    start_url: '.',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#000000',
    id: '/manifest.webmanifest',
    orientation: 'any',
  };
}
