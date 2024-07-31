export default function GoogleMapsEmbed({ address }: { address: string }) {
  return (
    <iframe
      title={process.env.NEXT_PUBLIC_SITE_NAME}
      className="m-auto w-full h-full min-h-[300px]"
      loading="lazy"
      allowFullScreen
      src={`https://www.google.com/maps/embed/v1/place?q=${address}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_EMBED_KEY}`}></iframe>
  );
}
