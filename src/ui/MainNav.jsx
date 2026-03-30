import { NavLink } from "react-router-dom";
import styled from "styled-components";
import {
  HiOutlineCalendarDays,
  HiOutlineCog6Tooth,
  HiOutlineHome,
  HiOutlineHomeModern,
  HiOutlineUsers,
  HiOutlineUserCircle,
} from "react-icons/hi2";

const NavList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  list-style: none;
`;

const NavTitle = styled.div`
  font-size: 1.2rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #94a3b8;
  font-weight: 700;
  padding: 0 0.8rem 0.8rem;
`;

const StyledNavLink = styled(NavLink)`
  &:link,
  &:visited {
    display: flex;
    align-items: center;
    gap: 1.2rem;

    position: relative;
    color: #cbd5e1;
    font-size: 1.5rem;
    font-weight: 600;
    padding: 1rem 1.2rem;
    border-radius: 8px;
    transition: background-color 0.2s ease, color 0.2s ease,
      transform 0.2s ease;
  }

  &:focus-visible {
    outline: 2px solid #60a5fa;
    outline-offset: 2px;
  }

  /* This works because react-router places the active class on the active NavLink */
  &:hover,
  &:active,
  &.active:link,
  &.active:visited {
    color: #ffffff;
    background-color: #1e293b;
    transform: translateX(4px);
  }

  &.active:link,
  &.active:visited {
    background-color: #2563eb;
    box-shadow: 0 8px 18px rgba(37, 99, 235, 0.25);
  }

  &.active:link::before,
  &.active:visited::before {
    content: "";
    position: absolute;
    left: -10px;
    top: 50%;
    transform: translateY(-50%);
    height: 20px;
    width: 4px;
    border-radius: 999px;
    background: #93c5fd;
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: #94a3b8;
    transition: color 0.2s ease;
  }

  &:hover svg,
  &:active svg,
  &.active:link svg,
  &.active:visited svg {
    color: #ffffff;
  }
`;

function MainNav() {
  return (
    <nav>
      <NavTitle>Menu</NavTitle>
      <NavList>
        <li>
          <StyledNavLink to="/dashboard">
            <HiOutlineHome />
            <span>Home</span>
          </StyledNavLink>
        </li>
        <li>
          <StyledNavLink to="/bookings">
            <HiOutlineCalendarDays />
            <span>Bookings</span>
          </StyledNavLink>
        </li>
        <li>
          <StyledNavLink to="/cabins">
            <HiOutlineHomeModern />
            <span>Cabins</span>
          </StyledNavLink>
        </li>
        <li>
          <StyledNavLink to="/users">
            <HiOutlineUsers />
            <span>Users</span>
          </StyledNavLink>
        </li>
        <li>
          <StyledNavLink to="/settings">
            <HiOutlineCog6Tooth />
            <span>Settings</span>
          </StyledNavLink>
        </li>
        <li>
          <StyledNavLink to="/account">
            <HiOutlineUserCircle />
            <span>Account</span>
          </StyledNavLink>
        </li>
      </NavList>
    </nav>
  );
}

export default MainNav;
