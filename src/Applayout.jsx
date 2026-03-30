import { Outlet } from "react-router-dom";
import Header from "./ui/Header";
import Sidebar from "./ui/Sidebar";
import styled from "styled-components";

const Layout = styled.div`
  display: flex;
  min-height: 100vh;
  background: var(--color-grey-50);
`;

const Main = styled.main`
  flex: 1;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const ContentWrapper = styled.div`
  flex: 1;
  padding: 2.4rem;
`;

const ContentCard = styled.div`
  background: var(--color-grey-0);
  border-radius: var(--border-radius-lg);
  padding: 2.4rem;
  min-height: 100%;
  border: 1px solid var(--color-grey-200);
  box-shadow: var(--shadow-md);
`;

export default function Applayout() {
  return (
    <Layout>
      <Sidebar />

      <Main>
        <Header />

        <ContentWrapper>
          <ContentCard>
            <Outlet />
          </ContentCard>
        </ContentWrapper>
      </Main>
    </Layout>
  );
}
