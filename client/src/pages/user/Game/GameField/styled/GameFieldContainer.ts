import styled from "styled-components";
import { SQUARE_SIZE } from "../../../../../Constants";

export default styled('div')`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: ${SQUARE_SIZE * 8}px;
  height: ${SQUARE_SIZE * 8}px;
  background: #f0f2f5;
  margin: 0 auto;
  border: 1px solid black;
`