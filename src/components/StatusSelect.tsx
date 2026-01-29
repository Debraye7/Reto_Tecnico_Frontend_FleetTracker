import { LuChevronsUpDown, LuLoaderCircle } from 'react-icons/lu'
import type { Status } from '../types';
import { useState } from 'react';
import { vehicleStatusOptions } from '../data/data';

const StatusSelect = ({ currentStatus, onChange, loading, disabled }:{ currentStatus:Status, onChange:(newStatus:Status) => void, loading?:boolean, disabled?:boolean }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleStatus = (newStatus:Status) => {
    onChange(newStatus);
    setIsOpen(false);
  };

  return (
    <div className="flex-1 sm:flex-none relative" tabIndex={0} onBlur={() => setIsOpen(false)}>
      <button aria-haspopup="listbox" aria-expanded={isOpen} onClick={() => setIsOpen(!isOpen)} className="w-full btn btn-secondary" disabled={disabled}>
        {!loading ? 
          <LuChevronsUpDown className=""/>
        :
          <LuLoaderCircle className="animate-spin"/>
        }
        {loading ? "Actualizando..." : "Cambiar estado"}
      </button>
      {isOpen &&
        <div className="absolute top-full left-0 z-30 flex flex-col w-full mt-2 rounded-md shadow-md">
          <ul role="listbox" className="rounded-md bg-slate-50 border border-slate-300 overflow-hidden">
            {vehicleStatusOptions.map((status) => (
              <li key={status} onMouseDown={() => currentStatus !== status ? handleStatus(status) : setIsOpen(false)} className={`text-nowrap text-sm px-4 py-2 ${currentStatus === status ? "bg-blue-500 text-slate-50 cursor-not-allowed" : "hover:bg-slate-200 cursor-pointer"} transition-colors`}>
                {currentStatus === status && "✓ "}
                {status}
              </li>
            ))}
          </ul>
        </div>
      }
    </div>
  );
};

export default StatusSelect;