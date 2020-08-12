const { default: styled } = require("styled-components");
const { Paper } = require("../orders/styles");

export const RippedPaper = styled(Paper)`
  &:after {
    content: "";
    position: absolute;
    height: 2px;
    left: 0;
    right: 0;
    bottom: -2px;
    background-color: #fffee0;
    clip-path: polygon(
      0% 0%,
      5% 100%,
      10% 0%,
      15% 100%,
      20% 0%,
      25% 100%,
      30% 0%,
      35% 100%,
      40% 0%,
      45% 100%,
      50% 0%,
      55% 100%,
      60% 0%,
      65% 100%,
      70% 0%,
      75% 100%,
      80% 0%,
      85% 100%,
      90% 0%,
      95% 100%,
      100% 0%
    );
  }
`;
