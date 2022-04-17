import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
// import { CategoriesContext } from "../../contexts/categories.context";
import { useSelector } from 'react-redux';

import { selectCategories } from "../../store/categories/category.selector";
import ProductCard from "./../../components/product-card/product-card.component";

import { CategoryContainer, Title} from "./category.styles";

const Category = () => {
  const { category } = useParams();
  const categories = useSelector(selectCategories);
  // const { categoriesMap } = useContext(CategoriesContext);
  const [products, setProducts] = useState(categories[category]);

  useEffect(() => {
    setProducts(categories[category]);
  }, [category, categories]);

  return (
    <>
      <Title>{category.toUpperCase()}</Title>
      <CategoryContainer>
        {products &&
          products.map((product) => (
            <ProductCard key={product.id} product={product} />
            ))}
      </CategoryContainer>
    </>
  );
};

export default Category;
