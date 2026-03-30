import styled from "styled-components";

const StyledLogo = styled.div`
  text-align: center;
`;

const Img = styled.img`
  height: 9.6rem;
  width: auto;
  border-radius: 20%;
`;

function Logo() {
  return (
    <StyledLogo>
      <Img src="/taj-logo.png" alt="Taj Hotel" />
    </StyledLogo>
  );
}

export default Logo;
