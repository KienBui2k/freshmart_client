import axios from "axios";

export default {
    findAll: async function (take: number, skip: number) {
        return await axios.get(`${import.meta.env.VITE_SV_HOST}receipts?take=${take}&skip=${skip}`);
      },
      findById: async function (id: string) {
        return await axios.get(`${import.meta.env.VITE_SV_HOST}receipts/${id}`);
      },
}