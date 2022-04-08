import { MenuItemContainer, Content, BackgroundImage} from './menu-item.styles';

const MenuItem = ({ title, imageUrl, size }) => (
  <MenuItemContainer size={size}>
    <BackgroundImage 
      imageUrl={imageUrl}
    />
    <Content>
      <h1 className="title">{title.toUpperCase()}</h1>
      <span className="subtitle">SHOP NOW</span>
    </Content>
  </MenuItemContainer>
);

export default MenuItem;