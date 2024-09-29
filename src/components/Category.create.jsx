import { Box } from '@mui/material'
import React from 'react'
import { Create, FileField, FileInput, SimpleForm, TextInput } from 'react-admin'

export default function CategoryCreate() {
  return (
    <Create>
        <SimpleForm>
            <Box className="flex_fullScreen">
                <TextInput source="name" label="Name" />
                <TextInput source="type" label="Product ID" />
            </Box>
            <div className="flex_fullScreen">
                <FileInput source="image" label="Image" accept="image/*">
                    <FileField source="src" title="title" />
                </FileInput>
            </div>
        </SimpleForm>
    </Create>
  )
}
