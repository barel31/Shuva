import Link from 'next/link';
import { IconChevronDown } from '@/lib/icons';
import useRouteState from '@/hooks/useRouteState';
import { cn } from '@/lib/utils';

const RouteDropdownLink = ({
  route,
  onNavClick,
  params,
  isChild = false,
  isDropdownOpen,
}: RouteLinkComponentProps & {
  isDropdownOpen: boolean;
}) => {
  const { classes } = useRouteState(params, route, isChild);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // if (route.children?.length) {
    //   e.preventDefault();
    // } else {
      onNavClick();
    // }
  };

  return (
    <Link
      className={classes}
      // href={route.children?.length ? '#' : '/' + route.slug.current}
      href={'/' + route.slug.current}
      onClick={handleClick}
      title={route.name}>
      {route.name}
      {route.children?.length ? (
        <IconChevronDown
          className={cn(
            'transition size-4 flex align-middle relative top-[0.1rem] right-[0.2rem] transform',
            {
              'rotate-180': !isDropdownOpen,
            }
          )}
        />
      ) : null}
    </Link>
  );
};

export default RouteDropdownLink;
