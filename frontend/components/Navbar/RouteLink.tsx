import useHover from '@/hooks/useHover';
import useRouteState from '@/hooks/useRouteState';
import RouteDropdownLink from './RouteDropDownLink';
import RenderDropdownContent from './RenderDropdownContent';

const RouteLink = ({ route, onNavClick, params, isMobile }: RouteLinkProps) => {
  const [isDropdownOpen, hoverEvents]: [
    boolean,
    { onMouseEnter: () => void; onMouseLeave: () => void }
  ] = useHover();

  const { isActive } = useRouteState(params, route);

  const isOpen = isMobile ? isActive || isDropdownOpen : isDropdownOpen;

  return (
    <div className="relative" {...hoverEvents}>
      <RouteDropdownLink
        route={route}
        onNavClick={onNavClick}
        params={params}
        isDropdownOpen={isOpen}
      />
      {route.children?.length
        ? RenderDropdownContent(route, onNavClick, params, isOpen)
        : null}
    </div>
  );
};

export default RouteLink;
