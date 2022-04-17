import { useSelector } from 'react-redux';

import { selectCategoriesMap } from "../../store/categories/category.selector";

import CategoryPreview from "../../components/category-preview/category-preview.component";

const CategoriesPreview = () => {
  // const { categoriesMap } = useContext(CategoriesContext);

  const categories = useSelector(selectCategoriesMap)

  return (
    <>
      {
        Object.keys(categories).map(title => {
          const products = categories[title]
          return (
            <CategoryPreview key={title} title={title} products={products}/>
          )
        })
      }
    </>
  );
};

export default CategoriesPreview;
