import styled from "styled-components";
import { useLocation, Link, useNavigate } from "react-router-dom";
import { HiOutlineArrowRightOnRectangle } from "react-icons/hi2";
import { HiOutlineUserCircle } from "react-icons/hi2";
import { useAuth } from "../context/AuthContext";

const StyledHeader = styled.header`
  background: var(--color-grey-0);
  color: var(--color-grey-800);
  padding: 1.6rem 2.4rem;
  border-bottom: 1px solid var(--color-grey-200);
  box-shadow: 0 6px 20px rgba(15, 23, 42, 0.04);

  position: sticky;
  top: 0;
  z-index: 30;

  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.6rem;
`;

const TitleWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  min-width: 0;
`;

const AppName = styled.span`
  font-size: 1.3rem;
  font-weight: 600;
  color: var(--color-grey-500);
  letter-spacing: 0.02em;
`;

const PageTitle = styled.h2`
  font-size: 1.8rem;
  font-weight: 600;
  color: var(--color-grey-800);
  line-height: 1.2;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Right = styled.div`
  display: flex;
  align-items: center;
  gap: 1.2rem;
  flex-shrink: 0;
`;

const DateText = styled.span`
  font-size: 1.3rem;
  color: var(--color-grey-600);
  font-weight: 500;
`;

const HeaderButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  padding: 0.8rem 1rem;
  border-radius: var(--border-radius-sm);
  border: 1px solid var(--color-grey-200);
  background: var(--color-grey-0);
  color: var(--color-grey-700);
  font-size: 1.3rem;
  font-weight: 600;

  &:hover {
    background: var(--color-grey-50);
  }

  &:focus-visible {
    outline: 2px solid var(--color-brand-600);
    outline-offset: 2px;
  }

  & svg {
    width: 1.8rem;
    height: 1.8rem;
    color: var(--color-grey-500);
  }
`;

const HeaderLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  padding: 0.8rem 1rem;
  border-radius: var(--border-radius-sm);
  border: 1px solid var(--color-grey-200);
  background: var(--color-grey-0);
  color: var(--color-grey-700);
  font-size: 1.3rem;
  font-weight: 600;

  &:hover {
    background: var(--color-grey-50);
  }

  &:focus-visible {
    outline: 2px solid var(--color-brand-600);
    outline-offset: 2px;
  }

  & svg {
    width: 1.8rem;
    height: 1.8rem;
    color: var(--color-grey-500);
  }
`;

const UserPill = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  padding: 0.7rem 1rem;
  border-radius: 999px;
  background: var(--color-grey-50);
  border: 1px solid var(--color-grey-200);
  font-size: 1.3rem;
  font-weight: 700;
  color: var(--color-grey-700);

  & svg {
    width: 2rem;
    height: 2rem;
    color: var(--color-grey-500);
  }
`;

const ROUTE_TITLES = {
  "/": "Dashboard",
  "/dashboard": "Dashboard",
  "/bookings": "Bookings",
  "/cabins": "Cabins",
  "/users": "Users",
  "/settings": "Settings",
  "/account": "Account",
};

function Header() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, user, logout } = useAuth();

  const title = ROUTE_TITLES[pathname] ?? "Hotel Admin";
  const dateText = new Intl.DateTimeFormat("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date());

  return (
    <StyledHeader>
      <TitleWrap>
        <AppName>Hotel Admin</AppName>
        <PageTitle>{title}</PageTitle>
      </TitleWrap>

      <Right>
        <DateText>{dateText}</DateText>
        {isAuthenticated ? (
          <>
            <UserPill title={user?.email || "Signed in"}>
              <HiOutlineUserCircle />
              {user?.fullName || "User"}
            </UserPill>
            <HeaderButton
              type="button"
              onClick={() => {
                logout();
                navigate("/login", { replace: true });
              }}
              title="Sign out"
              aria-label="Sign out"
            >
              <HiOutlineArrowRightOnRectangle />
              Logout
            </HeaderButton>
          </>
        ) : (
          <HeaderLink to="/login" title="Go to login" aria-label="Go to login">
            <HiOutlineArrowRightOnRectangle />
            Login
          </HeaderLink>
        )}
      </Right>
    </StyledHeader>
  );
}

export default Header;
