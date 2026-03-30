import styled from "styled-components";
import Heading from "./Heading";
import Row from "./Row";

const Subtitle = styled.p`
  color: var(--color-grey-600);
  font-size: 1.4rem;
`;

export default function PageHeader({ title, subtitle, actions }) {
  return (
    <div style={{ marginBottom: "2.4rem" }}>
      <Row type="horizontal" style={{ gap: "1.6rem", flexWrap: "wrap" }}>
        <div style={{ minWidth: 0 }}>
          <Heading as="h1">{title}</Heading>
          {subtitle ? <Subtitle>{subtitle}</Subtitle> : null}
        </div>
        {actions ? <div>{actions}</div> : null}
      </Row>
    </div>
  );
}
