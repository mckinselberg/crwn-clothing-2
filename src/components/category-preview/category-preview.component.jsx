// import { Link } from "react-router-dom";
import ProductCard from "../product-card/product-card.component";

import { Categories, LinkTitle } from "./category-preview.styles";

const CategoryPreview = ({ title, products }) => {
  return (
    <Categories>
      <h2>
        <LinkTitle to={title}>
          <span>{title.toUpperCase()}</span>
        </LinkTitle>
      </h2>
      <div className="preview">
        {
          products
            .filter((_, idx) => idx < 4)
            .map((product) => <ProductCard key={product.id} product={product} />)
        }
      </div>
    </Categories>
  );
};

export default CategoryPreview;
