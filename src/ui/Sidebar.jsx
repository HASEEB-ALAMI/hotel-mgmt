import styled from "styled-components";
import Logo from "./Logo";
import MainNav from "./MainNav";

const StyledSidebar = styled.aside`
  position: sticky; /* stick to top when scrolling */
  top: 0;
  height: 100vh; /* full viewport height */
  flex: 0 0 260px;
  width: 260px;
  min-width: 260px;
  background: linear-gradient(180deg, #111827, #020617);
  color: #e5e7eb;
  padding: 2.4rem 1.6rem;
  border-right: 1px solid #0f172a;
  box-shadow: 2px 0 10px rgba(0, 0, 0, 0.08);

  display: flex;
  flex-direction: column;
  gap: 2.4rem;

  @media (max-width: 900px) {
    position: fixed;
    inset: 0 auto 0 0;
    height: 100dvh;
    width: min(28rem, 85vw);
    min-width: 0;
    z-index: 50;
    transform: translateX(${(props) => (props.$open ? "0" : "-105%")});
    transition: transform 0.22s ease;
    overflow-y: auto;
  }
`;

function Sidebar({ isOpen, onClose }) {
  return (
    <StyledSidebar
      $open={isOpen}
      onClick={(e) => {
        if (e.target.closest("a")) onClose?.();
      }}
    >
      <Logo />
      <MainNav />
    </StyledSidebar>
  );
}

export default Sidebar;
