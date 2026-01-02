import { Link, useLocation } from "react-router-dom";
import { ReactNode } from "react";

interface NavLinkProps {
  to: string;
  children: ReactNode;
  className?: string;
  [key: string]: any;
}

const NavLink = ({ to, children, className, ...props }: NavLinkProps) => {
  const location = useLocation();
  const isCurrentPage = location.pathname === to;

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (isCurrentPage) {
      e.preventDefault();
      window.location.reload();
    }
  };

  return (
    <Link to={to} className={className} onClick={handleClick} {...props}>
      {children}
    </Link>
  );
};

export default NavLink;

