import React, {useState} from 'react'
import { IoMdArrowDropright, IoMdArrowDropleft } from "react-icons/io";
import { useAuth } from '../hooks/AuthContext';

const Sidebar = ({ companies }) => {
    const [isOpen, setIsOpen] = useState(false);
    const handleClickOpen = () => {
        setIsOpen(true);
    }
    const handleClickClose = () => {
        setIsOpen(false);
    }

    const validCompanies = Array.isArray(companies) ? companies : [];

    const status = validCompanies.map((company) => company.status);
    const oa = status.filter((s) => s === 'OA').length;
    const interview = status.filter((s) => s === 'Interview1').length + status.filter((s) => s === 'Interview2').length + status.filter((s) => s === 'Interview3').length;
    const rejected = status.filter((s) => s === 'Rejected').length;
    const offer = status.filter((s) => s === 'Offer').length;
  return (
    <div>
        {isOpen ? (
            <div className='absolute z-20 top-[37%] left-0 h-48 w-32 flex flex-row items-center'>
                <div className='bg-base-200 bg-opacity-80 ring-1 ring-base-200 h-full w-[70%] rounded-md flex flex-col items-center justify-center'>
                    <div className='text-sm text-gray-400'>OA</div>
                    <div className='text-sm'>{oa} <span className='text-gray-400'>/ {companies.length}</span></div>
                    <div className='text-sm text-gray-400'>Interview</div>
                    <div className='text-sm'>{interview} <span className='text-gray-400'>/ {companies.length}</span></div>
                    <div className='text-sm text-gray-400'>Rejected</div>
                    <div className='text-sm'>{rejected} <span className='text-gray-400'>/ {companies.length}</span></div>
                    <div className='text-sm text-gray-400'>Offer</div>
                    <div className='text-sm'>{offer} <span className='text-gray-400'>/ {companies.length}</span></div>
                </div>
                <div 
                    className="ml-0 h-10 w-5 bg-base-200 bg-opacity-80 ring-1 ring-base-200 rounded-md flex items-center justify-center"
                    onClick={handleClickClose}
                >
                    <IoMdArrowDropleft className="text-4xl text-white"/>
                </div>
            </div>

        ) : (
            <div
            className="absolute top-[46%] left-0 h-10 w-5 bg-base-200 rounded-md flex items-center justify-center"
            onClick={handleClickOpen}
            >
            <IoMdArrowDropright className="text-4xl text-white"/>
            </div>
        )}
    </div>
  )
}

export default Sidebar
