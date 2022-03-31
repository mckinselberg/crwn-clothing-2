import { useContext, Fragment } from "react";
import { useParams } from "react-router-dom";
import { CategoriesContext } from "../../contexts/categories.context";
import ProductCard from "../../components/product-card/product-card.component";

import './shop.styles.scss';

const Shop = () => {
  
  const { categoriesMap } = useContext(CategoriesContext);
  console.log(Object.keys(categoriesMap));
  console.log(Object.keys(categoriesMap).map(key => {
    return categoriesMap[key].slice(0,4).map(item => item)
  }))
  return (
    <Fragment>
      {
        Object.keys(categoriesMap).map(title => {
          return (
            <Fragment key={title}>
              <h2>{title}</h2>
              <div className="products-container">
                {categoriesMap[title].slice(0,4).map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </Fragment>
          )
        })
      }
    </Fragment>
  );
};

export default Shop;
