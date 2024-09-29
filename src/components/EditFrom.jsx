import React, { memo, useMemo } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useParams, useNavigate } from 'react-router-dom';
import { TextField, Button, Stack, MenuItem, Box, Skeleton } from '@mui/material';
import axios from 'axios';


const CustomEditForm = ({ products, loading }) => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { control, handleSubmit } = useForm();
    
    const filteredProducts = products.filter(f => f._id == id)[0];

    const onSubmit = async (formData) => {
        try {
            const form = new FormData();
            Object.keys(formData).forEach(key => {
                if (key === 'image' && formData[key]) {
                    form.append('image', formData[key], formData[key].name);
                } else if (key === 'colors') {
                    form.append(key, JSON.stringify(formData[key].split(',').map(color => color.trim())));
                }else if (key === 'sizes') {
                    form.append(key, JSON.stringify(formData[key].split(',').map(size => size.trim())));
                } else {
                    form.append(key, formData[key]);
                }
            });

            await axios.put(`https://backend-clothing.onrender.com/api/products/edit/${id}`, form, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            navigate('/products');
        } catch (error) {
            console.error("Mahsulotni tahrirlashda xatolik yuz berdi:", error.message);
        }
    };

    const productOptions = useMemo(() => (
        products.map((product) => (
            <MenuItem key={product._id} value={product.name}>
                {product.name}
            </MenuItem>
        ))
    ), [products]);

    return (
        <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
            <Stack spacing={2}>
                <Box className="flex gap-1">
                    <Controller
                        name="productId"
                        defaultValue={filteredProducts?.productId || ''}
                        control={control}
                        render={({ field }) => <TextField {...field} value={field.value || ''} focused label="Mahsulot ID"  />}
                    />
                    <Controller
                        name="name"
                        control={control}
                        defaultValue={filteredProducts?.name}
                        render={({ field }) => <TextField {...field} value={field.value || ''} label="Name" />}
                    />
                    <Controller
                        name="type"
                        control={control}
                        defaultValue={filteredProducts?.type}
                        render={({ field }) => <TextField {...field} value={field.value || ''} label="Type" />}
                    />
                </Box>
                <Box className="flex gap-1">
                    <Controller
                        name="price"
                        control={control}
                        defaultValue={filteredProducts?.price}
                        render={({ field }) => <TextField {...field} value={field.value || ''} label="Price" type="number" />}
                    />
                    <Controller
                        name="categoryType"
                        control={control}
                        defaultValue={filteredProducts?.categoryType}
                        render={({ field }) => <TextField {...field} value={field.value || ''} label="Category Type" />}
                    />
                    <Controller
                        name="colorName"
                        control={control}
                        defaultValue={filteredProducts?.colorName}
                        render={({ field }) => <TextField {...field} value={field.value || ''} label="Color Name" />}
                    />
                </Box>
                <Box className="flex gap-1">
                    <Controller
                        name="colors"
                        control={control}
                        defaultValue={filteredProducts?.colors ? filteredProducts?.colors.join(', ') : ''}
                        render={({ field }) => <TextField {...field} value={field.value || ''} label="Colors" helperText="Ranglarni vergul bilan ajrating" />}
                    />
                    <Controller
                        name="sizes"
                        control={control}
                        defaultValue={filteredProducts?.sizes ? filteredProducts?.sizes.join(', ') : ''}
                        render={({ field }) => <TextField {...field} value={field.value || ''} label="Sizes" helperText="O'lchamlarni vergul bilan ajrating" />}
                    />
                </Box>
                <Box className="flex gap-1">
                    <Controller
                        name="complect1"
                        control={control}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                select
                                label="Complects"
                                SelectProps={{
                                    multiple: true,
                                }}
                                value={field.value || []}
                            >
                                {loading 
                                ? <ul>
                                    <Skeleton sx={{padding: 0, margin: '0px'}} height={'60px'}/>
                                    <Skeleton sx={{padding: 0, margin: '0px'}} height={'60px'}/>
                                    <Skeleton sx={{padding: 0, margin: '0px'}} height={'60px'}/> </ul>
                                :  productOptions }
                            </TextField>
                        )}
                    />
                    <Controller
                        name="image"
                        control={control}
                        render={({ field }) => (
                            <input
                                type="file"
                                onChange={(e) => field.onChange(e.target.files[0])}
                                accept="image/*"
                            />
                        )}
                    />
                </Box>
                <Button type="submit" sx={{backgroundColor: '#272727'}}>Save</Button>
            </Stack>
        </form>
    );
};

export default memo(CustomEditForm)
