import React from "react";
import styled from "styled-components";
import _ from "lodash";

const GraphElement = styled.div`
  display: flex;
  padding-top: 1rem;
  padding-bottom: 1.5rem;

  @media (max-width: 1200px) {
    overflow-x: scroll;
  }
`;

const Bars = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: flex-start;
  height: 100px;
  position: relative;
`;

const Bar = styled.div`
  width: 2rem;
  background: #5979f7;
  margin: 0 5px;
  cursor: pointer;
  font-size: 0.75rem;
  font-weight: 700;

  &:hover {
    &:before {
      transition: all 1s;
      opacity: 1;
    }
  }

  &:before {
    content: attr(data-value);
    position: absolute;
    top: -1rem;
    text-align: center;
    width: 2rem;
    opacity: 0;
  }

  &:after {
    content: attr(data-label);
    width: 2rem;
    text-align: center;
    position: absolute;
    bottom: -1.25rem;
  }
`;

export default function Graph(props) {
  const maxValue = _.max(_.map(props.bars, "value"));
  const p = (x) => (x * 100) / maxValue;

  return (
    <GraphElement>
      <Bars>
        {props.bars.map((bar, i) => (
          <Bar
            className="rounded"
            key={i}
            data-value={bar.value}
            data-label={bar.label}
            style={{ height: `${p(bar.value)}%` }}
          ></Bar>
        ))}
      </Bars>
    </GraphElement>
  );
}
