import styled from "styled-components";

const Drawer = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  width: 85vw;
  height: 100%;
  z-index: 1;
  transition: transform 0.5s ease;
  transform: ${(props) => (props.open ? `translateX(0)` : `translateX(85vw)`)};

  @media (min-width: 992px) {
    width: 400px;
    transform: ${(props) =>
      props.open ? `translateX(0)` : `translateX(400px)`};
  }
`;

export default Drawer;
