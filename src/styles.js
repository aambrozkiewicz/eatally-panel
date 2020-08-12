import styled from "styled-components";

export const NiceButton = styled.button`
  font-weight: 500;
  font-size: 0.8rem;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  border: none;
  border-radius: 5px;
  box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.2);
  background: #457afb;
  transition: all 0.3s ease 0s;
  outline: none !important;
  padding: 7px 15px 7px 15px;
  color: #fff;

  &:hover {
    box-shadow: 0px 15px 20px rgba(0, 0, 0, 0.4);
    transform: translateY(-2px);
  }
`;
