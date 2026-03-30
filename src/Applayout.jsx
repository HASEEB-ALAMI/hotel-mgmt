import { Outlet } from "react-router-dom";
import Header from "./ui/Header";
import Sidebar from "./ui/Sidebar";
import styled from "styled-components";
import { useEffect, useState } from "react";

const Layout = styled.div`
  display: flex;
  min-height: 100vh;
  background: var(--color-grey-50);
  overflow-x: hidden;

  @media (max-width: 900px) {
    display: block;
  }
`;

const Main = styled.main`
  flex: 1;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  min-width: 0;
`;

const ContentWrapper = styled.div`
  flex: 1;
  padding: 2.4rem;
  min-width: 0;

  @media (max-width: 900px) {
    padding: 1.2rem;
  }
`;

const ContentCard = styled.div`
  background: var(--color-grey-0);
  border-radius: var(--border-radius-lg);
  padding: 2.4rem;
  min-height: 100%;
  border: 1px solid var(--color-grey-200);
  box-shadow: var(--shadow-md);
  min-width: 0;

  @media (max-width: 900px) {
    padding: 1.6rem;
  }
`;

const Backdrop = styled.div`
  display: none;

  @media (max-width: 900px) {
    display: ${(props) => (props.$open ? "block" : "none")};
    position: fixed;
    inset: 0;
    background: rgba(2, 6, 23, 0.35);
    backdrop-filter: blur(2px);
    z-index: 40;
  }
`;

export default function Applayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const prev = document.body.style.overflow;
    const mq = window.matchMedia("(max-width: 900px)");

    function sync() {
      if (isSidebarOpen && mq.matches) document.body.style.overflow = "hidden";
      else document.body.style.overflow = prev;
    }

    sync();
    mq.addEventListener?.("change", sync);
    return () => {
      mq.removeEventListener?.("change", sync);
      document.body.style.overflow = prev;
    };
  }, [isSidebarOpen]);

  return (
    <Layout>
      <Backdrop $open={isSidebarOpen} onClick={() => setIsSidebarOpen(false)} />
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      <Main>
        <Header onToggleSidebar={() => setIsSidebarOpen((s) => !s)} />

        <ContentWrapper>
          <ContentCard>
            <Outlet />
          </ContentCard>
        </ContentWrapper>
      </Main>
    </Layout>
  );
}
