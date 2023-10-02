import axios from "axios";
export default{
    //     findMany: async function() {
    //     return await axios.get(import.meta.env.VITE_SV_HOST + "categories")
    // },
       create: async function(formData: FormData) {
        return await axios.post(import.meta.env.VITE_SV_HOST + "products", formData,{
            headers: {
                "Content-Type": "multipart/form-data"
            }
        })
    },
    getAll: async function(takeItem:number, skipItem:number){
        return await axios.get(import.meta.env.VITE_SV_HOST + `products?skip=${skipItem}&take=${takeItem}`)
    },
    get: async function(){
        return await axios.get(import.meta.env.VITE_SV_HOST + `products`)
    },
    findByCategory: async function(id:string, takeItem:number, skipItem:number){
        return await axios.get(import.meta.env.VITE_SV_HOST + `products/category/${id}?skip=${skipItem}&take=${takeItem}`)
    },
    search: async function(key:string,takeItem:number,skipItem:number){
        console.log("key api",key);
        
        return await axios.get(import.meta.env.VITE_SV_HOST + `products?key=${key}&skip=${skipItem}&take=${takeItem}`)
    },
    newProduct: async function(takeItem:number){
        return await axios.get(import.meta.env.VITE_SV_HOST +`products/newProducts?=take${takeItem}`) 
    }
}