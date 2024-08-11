import Image from 'next/image';
import { urlFor } from '@/client';
import { type PortableTextTypeComponentProps } from 'next-sanity';

export default ({ value }: PortableTextTypeComponentProps<any>) => {
  const url = urlFor(value.asset).dpr(2).url();

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="w-[300px] h-[500px] m-1 inline-block align-middle">
      <Image
        src={url}
        alt={process.env.NEXT_PUBLIC_SITE_DESCRIPTION!}
        priority
        width={300}
        height={500}
        className="w-fit h-fit object-left text-transparent"
      />
    </a>
  );
};
