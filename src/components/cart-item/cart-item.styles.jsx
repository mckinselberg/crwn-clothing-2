import styled from 'styled-components';

export const CartItems = styled.div`
  width: 100%;
  display: flex;
  height: auto;
  margin-bottom: 15px;

  img {
    width: 30%;
  }
`
export const ItemDetails = styled.div`
  width: 70%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  padding: 10px 20px;

  .name {
    font-size: 16px;
  }
`;
