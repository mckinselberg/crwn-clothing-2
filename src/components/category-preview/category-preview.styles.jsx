import { Link } from "react-router-dom";
import styled from 'styled-components';

export const Categories = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 30px;
  .preview {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    column-gap: 20px;
  }
`;

export const LinkTitle = styled(Link)`
  font-size: 28px;
  margin-bottom: 25px;
  cursor: pointer;
`;
