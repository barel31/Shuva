import UsePortableText from './UseRichText';
import AccordionQA from './Accordion';
import ContactMePage from './ContactMePage';
import ContactForm from '../ContactForm';
import Carousel from '../Carousel';
import { cn } from '@/lib/utils';
import { urlFor } from '@/lib/client';

const ContentBody = ({
  route,
  contact,
  slug,
}: {
  route: Route;
  contact?: ContactInfo;
  slug: string;
}) => {
  const sliders = route?.images?.map(image => urlFor(image).dpr(2).url());

  const isHomePage = slug === '/';
  const isContactPage = slug === 'contact-me' || slug === 'contact';

  return (
    <div className="content-body m-auto bg-neutral-50 dark:bg-neutral-700">
      {isHomePage ? (
        <div className="w-full">
          <ContactForm contact={contact!} />
        </div>
      ) : isContactPage ? (
        <ContactMePage contact={contact!} />
      ) : null}

      <div
        className={cn(
          'content-body-text text-right mx-4 py-6 xl:mx-36 min-h-[60vh] text-neutral-900 dark:text-neutral-300 normal-line-height',
          {
            'mt-12': route.slug.current === '/',
            'xl:pt-16': route.slug.current === '/',
          }
        )}>
        <UsePortableText value={route?.content} />
        {route?.qAndA && <AccordionQA qa={route.qAndA} />}
        {sliders && <Carousel images={sliders!} />}
      </div>
    </div>
  );
};

export default ContentBody;
