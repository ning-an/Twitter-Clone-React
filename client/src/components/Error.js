import React from "react";
import styled from "styled-components";

const Error = () => {
  return (
    <Wrapper>
      <img
        src="https://image.freepik.com/free-vector/404-error-web-template-with-mad-cat_23-2147763345.jpg"
        alt="error img"
      />
      <p>Please try fresh the page.</p>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  img {
    width: 300px;
    margin-bottom: 20px;
  }

  p {
    font-size: 24px;
  }
`;

export default Error;
