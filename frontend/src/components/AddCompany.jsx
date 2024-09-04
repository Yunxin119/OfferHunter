import React, { useState } from 'react';
import useAddCompany from '../hooks/useAddCompany';
import { IoAddCircle } from "react-icons/io5";
import { toast } from 'react-toastify';

const AddCompany = ({ setCompanies }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [status, setStatus] = useState( '');
  const [applyDate, setApplyDate] = useState('');
  const [city, setCity] = useState('');
  const [link, setLink] = useState('');
  const { loading, addCompany } =useAddCompany();

  const handleAdd = async (e) => {
    e.preventDefault();
  
    if (loading) return;
  
    const formattedDate = new Date(applyDate).toLocaleDateString('en-US');
  
    console.log("Submitting company with data:", { name, role, status, applyDate: formattedDate, city, link });
  
    try {
      const addedCompany = await addCompany({
        name,
        role,
        status,
        applyDate: formattedDate,
        city,
        link,
      });
  
      if (addedCompany) {
        setCompanies((prevCompanies) => [...prevCompanies, addedCompany]);
        setIsOpen(false);
      }
    } catch (error) {
      console.error("Error adding company:", error); 
      toast.error('Error adding company');
    }
  };

  return (
    <div>
      {/* Add Button */}
      <button
        className="btn btn-sm btn-primary"
        onClick={() => setIsOpen(true)}
      >
        New Application
      </button>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-base-300 bg-opacity-80 w-full max-w-lg p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4">Add Company</h2>
            <form onSubmit={handleAdd}>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Name</span>
                </label>
                <input
                  type="text"
                  className="input input-bordered w-full"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div className="form-control mt-4">
                <label className="label">
                  <span className="label-text">Role</span>
                </label>
                <input
                  type="text"
                  className="input input-bordered w-full"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                />
              </div>

              <div className="form-control mt-4">
                <label className="label">
                  <span className="label-text">Status</span>
                </label>
                <select
                    className="select select-bordered w-full"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    >
                    <option value="">Select Status</option>  {/* 提供一个空值，提示用户必须选择 */}
                    <option value="Submitted">Submitted</option>
                    <option value="OA">OA</option>
                    <option value="Interview1">Interview Round 1</option>
                    <option value="Interview2">Interview Round 2</option>
                    <option value="Interview3">Interview Round 3</option>
                    <option value="Offer">Offer</option>
                    <option value="Rejected">Rejected</option>
                </select>

              </div>

              <div className="form-control mt-4">
                <label className="label">
                  <span className="label-text">Apply Date</span>
                </label>
                <input
                  type="date"
                  className="input input-bordered w-full"
                  value={applyDate}
                  onChange={(e) => setApplyDate(e.target.value)}
                />
              </div>

              <div className="form-control mt-4">
                <label className="label">
                  <span className="label-text">City</span>
                </label>
                <input
                  type="text"
                  className="input input-bordered w-full"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                />
              </div>

              <div className="form-control mt-4">
                <label className="label">
                  <span className="label-text">Link</span>
                </label>
                <input
                  type="text"
                  className="input input-bordered w-full"
                  value={link}
                  onChange={(e) => setLink(e.target.value)}
                />
              </div>

              <div className="flex justify-end mt-6">
                <button
                  type="button"
                  className="btn btn-secondary mr-2"
                  onClick={() => setIsOpen(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className={`btn btn-primary ${loading ? 'loading' : ''}`}
                >
                  {loading ? 'Saving...' : 'Save'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddCompany;
