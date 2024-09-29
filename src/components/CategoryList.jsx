import React from 'react'
import { Datagrid, FunctionField, List, NumberField, TextField } from 'react-admin'

export default function CategoryList(props) {
  return (
    <List {...props}>
        <Datagrid>
            <FunctionField
                label="ID"
                render={record => `${record._id.substring(0, 8)}...`} 
            />
            <TextField source='name'/>
            <TextField source='type'/>
            <NumberField source='count'/>
            <FunctionField
                label="Image"
                render={record => (
                    <img src={`http://localhost:8080/static/${record.image}`} className='bg-zinc-900 rounded-lg p-1 w-[70px] h-32 object-contain' alt={record.name} title={record.name}  />
                )}
            />
        </Datagrid>
    </List>
  )
}
