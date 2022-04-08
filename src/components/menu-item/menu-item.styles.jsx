import styled from 'styled-components';

export const MenuItemContainer = styled.div`
  min-width: 30%;
  height: 240px;
  flex: 1 1 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid black;
  margin: 0 7.5px 15px;
  overflow: hidden;
  height: ${({ size }) => size === `large` ? `380px;` : `auto`};
  &:hover {
    cursor: pointer;
  }
  &:first-child {
    margin-right: 7.5px;
  }

  &:last-child {
    margin-left: 7.5px;
  }
`

export const Content = styled.div`
  height: 90px;
  padding: 0 25px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 1px solid black;
  background-color: #fff;
  opacity: 0.7;
  position: absolute;

  .title {
    font-weight: bold;
    margin: 0;
    font-size: 22px;
    color: #4a4a4a;
  }

  .subtitle {
    font-weight: lighter;
    font-size: 16px;
  }
  ${MenuItemContainer}:hover & {
      opacity: 0.9;
  }
`

export const BackgroundImage = styled.div`
  transition: transform 750ms cubic-bezier(0.25, 0.45, 0.45, 0.95);
  background-image: ${({ imageUrl }) => `url(${imageUrl})`};
  width: 100%;
  height: 100%;
  background-position: center;
  background-size: cover;
  ${MenuItemContainer}:hover & {
      transform: scale(1.1);
      transition: transform 6s cubic-bezier(0.25, 0.45, 0.45, 0.95);
  }
`

// .menu-item {

//   &.large {
    
//   }

//   & .background-image {
//   }

//   &:hover {
//     // cursor: pointer;
  
//     & .background-image {
//     }
  
//     & .content {
//     }
//   }

//   .background-image {
    
//   }

//   .content {
//   }
// }