import { notFound } from 'next/navigation';
import BackgroundImage from './BackgroundImage';
import ContentBody from './ContentBody';
import ContentHeader from './ContentHeader';

function Content({ route, contact }: { route: Route; contact?: ContactInfo }) {
  if (!route) return notFound();

  const slug = route?.slug?.current;

  return (
    <div className="content m-auto text-center">
      <BackgroundImage route={route} />
      <ContentHeader route={route} />
      <ContentBody route={route} contact={contact} slug={slug} />
    </div>
  );
}

export default Content;
