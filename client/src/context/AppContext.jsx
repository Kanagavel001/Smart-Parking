import { createContext, useContext, useEffect, useState } from  'react';
import {useNavigate} from 'react-router-dom';
import axios from 'axios'
import { toast } from 'react-toastify';
import { useAuth, useUser } from '@clerk/clerk-react';

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const AppContext = createContext(); 

export const AppProvider = ({ children }) => {

    const floors = ['3rd Floor', '2nd Floor', '1st Floor','Ground Floor']
    const [floorData, setFloorData] = useState([])
    const { user } = useUser();
    const { getToken } = useAuth();

    const fetchFloorData = async () => {
        const { data } = await axios.get('/api/floor/get')
        if(data.success){
            setFloorData(data.floorData)
        }else{
            toast.error(data.message)
        }
    }

    useEffect(() => {
        fetchFloorData();
    }, [floorData]);


    const navigate = useNavigate();

    const value = { axios,user, getToken, navigate, floorData, setFloorData, fetchFloorData, floors };

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    )
}

export const useAppContext = () => {
    return useContext(AppContext);
};