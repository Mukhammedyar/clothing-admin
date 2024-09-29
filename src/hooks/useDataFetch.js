import axios from "axios"
import { useEffect, useState } from "react"
import { useNotify } from "react-admin"

export default function useDataFetch() {
    const [products, setProducts] = useState([])
    const [categories, setCategories] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const notify = useNotify()

    useEffect(()=>{
        const fetchData = async ()=>{
            setLoading(true)
            try {
                const productsData = await axios.get('http://localhost:8080/api/products/get-all')
                const categoriesData = await axios.get('http://localhost:8080/api/categories/get-all')
                setProducts(productsData.data);
                setCategories(categoriesData.data);
                setLoading(false)
            } catch (error) {
                setError(error)
                setLoading(true)
                notify(error.message)
            }
        }
        fetchData()
    },[])
  return {products, categories, loading, error}
}
