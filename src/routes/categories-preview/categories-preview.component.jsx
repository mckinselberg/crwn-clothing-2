// import { useContext } from "react";
// import { CategoriesContext } from "../../contexts/categories.context";

import { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';

import { getCategoriesAndDocuments } from "../../utils/firebase/firebase.utils";
import { setCategoriesMap } from "../../store/categories/category.action";
import { selectCategories } from "../../store/categories/category.selector";

import CategoryPreview from "../../components/category-preview/category-preview.component";

const CategoriesPreview = () => {
  // const { categoriesMap } = useContext(CategoriesContext);
  const dispatch = useDispatch();

  useEffect(() => {
    const getCategoriesMap = async () => {
      const categoryMap = await getCategoriesAndDocuments();
      dispatch(setCategoriesMap(categoryMap));
    };
    getCategoriesMap();
    
  }, []);

  const categories = useSelector(selectCategories)

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
