import { Box, Typography } from '@mui/material';
import { TextInput, SimpleForm, Create, FileInput, FileField, SelectArrayInput } from 'react-admin';

// File upload field in the form
const CreateForm = ({products, categories}) => {

  return(
    <Create>
        <SimpleForm>
            <Box className="flex_fullScreen">
                <TextInput source="name" label="Name" />
                <TextInput source="productId" label="Product ID" />
            </Box>
            <div className="flex_fullScreen">
                <TextInput source="type" label="Type" />
                <SelectArrayInput
                    source="categoryType"
                    label="categoryType"
                    optionText={(choice) => (
                        <Box display="flex" key={choice.name} alignItems="center">
                            <img 
                                src={`https://backend-clothing.onrender.com/static/${choice.image}`} 
                                alt={choice.name} 
                                style={{ width: 50, height: 50, marginRight: 10, objectFit: 'contain' }} 
                            />
                            <Typography>{choice.name}</Typography>
                        </Box>
                    )}
                    optionValue="name"
                    choices={categories}
                    fullWidth
                />
            </div>
            <div className="flex_fullScreen">
                <TextInput source="color" label="Colors" />
                <TextInput source="colorName" label="Color Name" />
                <TextInput source="price" label="Price" />
                <TextInput source="sizes" label="Sizes" />
            </div>
            {/* File input for image upload */}
            <div className="flex_fullScreen">
                <SelectArrayInput
                    source="complect1"
                    label="Complects"
                    optionText={(choice) => (
                        <Box display="flex" key={choice._id} alignItems="center">
                            <img 
                                src={`https://backend-clothing.onrender.com/static/${choice.image}`} 
                                alt={choice.productId} 
                                style={{ width: 50, height: 50, marginRight: 10, objectFit: 'contain' }} 
                            />
                            <Typography>{choice.productId}</Typography>
                        </Box>
                    )}
                    optionValue="productId"
                    choices={products}
                    fullWidth
                />
                <FileInput source="image" label="Image" accept="image/*">
                    <FileField source="src" title="title" />
                </FileInput>
            </div>
        </SimpleForm>
    </Create>
);  
}
    



export default CreateForm;