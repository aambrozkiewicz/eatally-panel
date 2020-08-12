import styled from "styled-components";

export const HooverBox = styled.div`
  background-color: #fff;
  transition: all 0.3s ease-in-out;
  font-size: 0.9rem;
  box-shadow: 0 0.75rem 1.5rem rgba(18, 38, 63, 0.03);

  &:hover {
    box-shadow: rgba(0, 0, 0, 0.22) 0px 19px 43px;
    transform: translate3d(0px, -1px, 0px);
  }
`;

export const Paper = styled.div`
  position: relative;

  @media (min-width: 992px) {
    &:before {
      content: "";
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      width: 55px;
      border-right: 2px solid rgba(255, 0, 0, 0.4);
    }
  }
`;

export const Lines = styled.div`
  background-image: repeating-linear-gradient(
    #fffee0 0px,
    #fffee0 24px,
    steelblue 25px
  );
  min-height: 74px;
  padding: 0 10px 17px 10px;
  line-height: 25px;

  @media (min-width: 992px) {
    padding-left: 77px;
  }
`;
