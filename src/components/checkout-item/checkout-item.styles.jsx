import styled, { css } from 'styled-components';

export const Checkout = styled.div`
  width: 100%;
  display: flex;
  min-height: 100px;
  border-bottom: 1px solid darkgrey;
  padding: 15px 0;
  font-size: 20px;
  align-items: center;
`;

export const Image = styled.div`
  width: 23%;
  padding-right: 15px;
  img {
    width: 100%;
    height: 100%;
  }
`;

const nameQuantityPrice = css`
  width: 23%;
`;

export const Name = styled.div`
  ${nameQuantityPrice}
`;

export const Quantity = styled.div`
  ${nameQuantityPrice}
  display: flex;
  .arrow {
      cursor: pointer;
    }

    .value {
      margin: 0 10px;
    }
`;

export const Price = styled.div`
  ${nameQuantityPrice}
`;

export const RemoveButton = styled.div`
  ${nameQuantityPrice}
  padding-left: 12px;
  cursor: pointer;
`;