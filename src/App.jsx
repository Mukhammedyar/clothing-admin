import * as React from "react";
import './App.css'
import { Admin, Resource } from 'react-admin';
import CreateForm from "./components/CreateForm";
import WomanIcon from '@mui/icons-material/Woman';
import ProductList from "./components/ProductList";
import CustomEditForm from "./components/EditFrom";
import CategoryList from "./components/CategoryList";
import CategoryCreate from "./components/Category.create";
import { ToastContainer } from "react-toastify";
import { customDataProvider } from "./utils/CustomDataProvider";
import 'react-toastify/dist/ReactToastify.css';
import useDataFetch from "./hooks/useDataFetch";



const App = () => {
  const {products, categories, loading} = useDataFetch()

  
  const memoizedProducts = React.useMemo(() => products, [products]);
  const memoizedCategories = React.useMemo(() => categories, [categories]);
  
return(
  <>
    <Admin dataProvider={customDataProvider}>
      <Resource 
        name="categories" 
        list={CategoryList} 
        edit={ProductList} 
        create={CategoryCreate} />
      <Resource 
        name="products" 
        icon={WomanIcon} 
        list={<ProductList/>}
        edit={<CustomEditForm loading={loading} products={memoizedProducts}/>} 
        create={<CreateForm loading={loading} products={memoizedProducts} categories={memoizedCategories}/>} />
    </Admin>
    <ToastContainer/>
  </>
);
}

export default App;


