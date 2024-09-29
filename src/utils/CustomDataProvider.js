import { toast } from "react-toastify";

export const customDataProvider = {
    getList: (resource, params) => {
      // console.log('Params received:', params); // Qabul qilingan params-larni log qilish

      return fetch(`https://backend-clothing.onrender.com/api/${resource}/get-all`)
        .then(response => {
          if (!response.ok) {
            throw new Error('Error during fetch');
          }
          return response.json();
        })
        .then(json => {
          if (!Array.isArray(json)) {
            console.error('Received data is not an array:', json);
            throw new Error('Invalid data format received from server');
          }

          let sortedData = [...json]; // json-ning nusxasini yaratish
          if (params?.sort && params?.sort.field) {
            const { field, order } = params?.sort;
            sortedData?.sort((a, b) => {
              if (a[field] < b[field]) return order === 'ASC' ? -1 : 1;
              if (a[field] > b[field]) return order === 'ASC' ? 1 : -1;
              return 0;
            });
          console.log('Sorted Data: ', sortedData); // Serverdan olingan ma'lumotlarni log qilish

          }

          return {
            data: sortedData.map(item => ({ 
              ...item, 
              id: item._id || item.id, 
              sizes: item.sizes ? JSON.stringify(item.sizes) : undefined 
            })),
            total: json.length,
          };
        })
        .catch(error => {
          console.error('Error in getList:', error);
          // toast.error(`Error fetching ${resource}: ${error.message}`);
          throw error;
        });
    },
    getMany: (resource, params) => {
      return customDataProvider.getList('products')
        .then(({ data }) => ({
          data: data.filter(item => params.ids.includes(item.id)),
        }))
        .then(({ data }) => ({
          data: data.json()
        }))
        .catch(error => {
          toast.error(`Error fetching multiple ${resource}: ${error.message}`);
          throw error;
        });
    },

    getOne: (resource, params) => {
      return fetch(`https://backend-clothing.onrender.com/api/${resource}/get-one/${params.id}`)
        .then(response => {
          if (!response.ok) {
            throw new Error('Error fetching single item');
          }
          return response.json();
        })
        .then(json => ({
          data: { ...json, id: json._id, sizes: JSON.stringify(json.sizes) },
        }))
        .catch(error => {
          toast.error(`Error fetching single ${resource}: ${error.message}`);
          throw error;
        });
    },
    create: (resource, params) => {
      const formData = new FormData();
      Object.keys(params.data).forEach(key => {
        if (key !== 'image') {
          formData.append(key, params.data[key]);
        }
      });
  
      if (params.data.image && params.data.image.rawFile) {
        formData.append('image', params.data.image.rawFile);
      }
  
      return fetch(`https://backend-clothing.onrender.com/api/${resource}/create`, {
        method: 'POST',
        body: formData,
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Error during creation');
        }
        return response.json();
      })
      .then(json => ({
        data: { ...params.data, id: json._id },
      }))
      .catch(error => {
        toast.error(`Error creating ${resource}: ${error.message}`);
        throw error;  // rethrow to ensure the error is propagated
      });
    },
  
    deleteMany: (resource, params) => {
      const query = params.ids.map(id => `id=${id}`).join('&');
      console.log(params.ids);
      return fetch(`https://backend-clothing.onrender.com/api/${resource}/delete-many?${query}`, {
        method: 'DELETE',
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Error during deletion');
        }
        return response.json();
      })
      .then(json => ({
        data: params.ids,
      }))
      .catch(error => {
        toast.error(`Error deleting ${resource}: ${error.message}`);
        console.log('error delete many ', error.message);
        throw error;  // rethrow to ensure the error is propagated
      });
    }
  };