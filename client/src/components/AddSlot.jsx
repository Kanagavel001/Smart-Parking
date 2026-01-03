import React, { useState } from 'react'
import { X } from 'lucide-react'
import { toast } from 'react-toastify';
import { useAppContext } from '../context/AppContext';

const AddSlot = ({setOpenAddSlot}) => {

    const [floorName, setFloorName] = useState('');
    const [slotName, setSlotName] = useState('');

    const { axios, floors, isAdmin } = useAppContext();

    const handleSubmit = async (e) => {
        e.preventDefault()
        if(!isAdmin){
            return toast.error("Admin only access")
        }
        try {
            const slotData = { floorName, slotName };

            const { data } = await axios.post('/api/floor/add-slot', {slotData});

            if(data.success){
                toast.success(data.message);
                setOpenAddSlot(false);
            }else{
                toast.error(data.message);
            }
        } catch (error) {
            console.log(error)
        }
    }
    
  return (
    <div className='w-100 h-80 bg-white border-2 border-primary p-4 overflow-x-hidden mx-auto rounded-lg shadow-lg shadow-primary/50'>
        <div className='flex items-center justify-between'>
            <h1 className='font-bold text-2xl'>Add Slot</h1>
            <X onClick={()=>setOpenAddSlot(false)}/>
        </div>
        
        <form onSubmit={handleSubmit} className='flex flex-col my-10 items-center gap-6 '>
            <input value={slotName} onChange={(e)=>setSlotName(e.target.value)} type="text" placeholder='slot name' className='outline-none border-b-2 border-primary py-1 px-2 w-50' required/>
            <select value={floorName} onChange={(e)=>setFloorName(e.target.value)} className='outline-none border-b-2 border-primary py-1 px-2 w-50' required>
                <option value="">select floor</option>
                {floors.map((floor, i) => (
                    <option key={i} value={floor}>{floor}</option>
                ))}
            </select>
            <button type='submit' className="text-white bg-linear-to-l from-primary to-secondary hover:to-secondary/80 hover:from-primary/80 rounded-lg font-medium py-1 px-6 cursor-pointer transition-all duration-300 hover:scale-105 active:scale-100">Add Slot</button>
        </form>
    </div>
  )
}

export default AddSlot