import styled from "styled-components";

export const Overlay = styled.div`
  position: fixed;
  visibility: ${(props) => (props.open ? "visible" : "hidden")};
  opacity: ${(props) => (props.open ? "1" : "0")};
  width: 100%;
  height: 100%;
  top: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.5);
  transition: all 0.5s;
`;

export const DrawerElement = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  width: 85vw;
  height: 100%;
  z-index: 1;
  transition: transform 0.5s ease;
  transform: ${(props) => (props.open ? `translateX(0)` : `translateX(85vw)`)};
  padding: 1rem;
  background: #fff;
  border-left: 1px solid #dee2e6;

  @media (min-width: 992px) {
    width: 400px;
    transform: ${(props) =>
      props.open ? `translateX(0)` : `translateX(400px)`};
  }
`;
