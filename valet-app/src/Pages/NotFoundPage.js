import React from "react";
import styled from "styled-components";
import pngwing from "../../src/assets/pngwing.png";
import { Link } from "react-router-dom";
function NotFoundPage() {
  return (
    <NotFoundPageStyled>
      <div className="image-container">
        <img src={pngwing} alt="404-not-found" />
        <div>
          <Link style={{}} to="/">
            Go To Homepage
          </Link>
        </div>
      </div>
    </NotFoundPageStyled>
  );
}

const NotFoundPageStyled = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100svh;
  .image-container {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    img {
      width: 40%;
    }
    div {
      height: 4rem;
      width: 30%;
      display: flex;
      justify-content: flex-end;
    }
  }
`;

export default NotFoundPage;
