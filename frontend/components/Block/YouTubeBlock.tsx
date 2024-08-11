import { type PortableTextTypeComponentProps } from 'next-sanity';

export default ({ value }: PortableTextTypeComponentProps<any>) => {
  const { url } = value;
  if (!url) {
    return null;
  }
  const videoId = url.split('v=')[1];
  const embedUrl = `https://www.youtube.com/embed/${videoId}`;

  return (
    <div className="youtube-block">
      <iframe
        className="max-md:w-full"
        width="560"
        height="315"
        src={embedUrl}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        title="YouTube video"
        allowFullScreen
      />
    </div>
  );
};
