import React from 'react';
import { 
  List, 
  Datagrid, 
  TextField, 
  NumberField, 
  FunctionField,
  FilterButton,
  TopToolbar,
  CreateButton,
  ExportButton,
  TextInput,
  ReferenceInput,
  SelectInput
} from 'react-admin';
import { Card, CardContent, Box } from '@mui/material';

const ListActions = () => (
  <TopToolbar>
    <FilterButton />
    <CreateButton />
    <ExportButton />
  </TopToolbar>
);

const productFilters = [
  <TextInput source="q" label="Qidiruv" alwaysOn />,
  <ReferenceInput source="categoryType" reference="categories">
    <SelectInput optionText="name" />
  </ReferenceInput>,
  <TextInput source="type" label="Turi" />,
  <TextInput source="colorName" label="Rangi" />,
];

const ProductList = () => (
  <List 
    filters={productFilters}
    actions={<ListActions />}
    sort={{ field: 'name', order: 'ASC' }}
  >
    <Datagrid rowClick="edit">
      <TextField source="name" />
      <TextField source="type" />
      <NumberField source="price" />
      <TextField source="categoryType" />
      <TextField source="colorName" />
      <FunctionField
        label="Image"
        render={record => (
          <img 
            src={`https://backend-clothing.onrender.com/static/${record.image}`}  
            className='bg-zinc-900 rounded-lg p-1 w-[70px] h-32 object-contain' 
            alt={record.name} 
            title={record.name}  
          />
        )}
      />
    </Datagrid>
  </List>
);

export default ProductList;
