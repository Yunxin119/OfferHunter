import React, { useState } from 'react';
import useUpdateCompany from '../hooks/useUpdateCompany';
import { MdEdit } from "react-icons/md";

const EditCompany = ({ company, setCompanies }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState(company.name || '');
  const [role, setRole] = useState(company.role || '');
  const [status, setStatus] = useState(company.status || '');

  const formattedDate = company.applyDate
      ? new Date(company.applyDate).toISOString().split('T')[0]
      : '';
  const [applyDate, setApplyDate] = useState(formattedDate);

  const [city, setCity] = useState(company.city || '');
  const [link, setLink] = useState(company.link || '');
  const [imageDomain, setImageDomain] = useState(company.imageDomain || '');
  const { loading, updateCompany } = useUpdateCompany();

  const handleEdit = async (e) => {
      e.preventDefault();

      const updatedData = { name, role, status, applyDate, city, link, imageDomain };

      try {
          const updatedCompany = await updateCompany(company.id, updatedData);
          if (updatedCompany) {
              setCompanies((prevCompanies) =>
                  prevCompanies.map((c) => (c.id === company.id ? updatedCompany : c))
              );
              setIsOpen(false);
          }
      } catch (error) {
          console.error('Error updating company:', error);
      }
  };

  return (
    <div>
      {/* Edit Button */}
      <button
        className="btn btn-sm btn-ghost btn-circle"
        onClick={() => setIsOpen(true)}
      >
        <MdEdit />
      </button>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-base-300 bg-opacity-80 w-full max-w-lg p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4">Edit Company</h2>
            <form onSubmit={handleEdit}>
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

              <div className="form-control mt-3">
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

              <div className="form-control mt-3">
                <label className="label">
                  <span className="label-text">Status</span>
                </label>
                <select
                  className="select select-bordered w-full"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <option value="Submitted">Submitted</option>
                  <option value="OA">OA</option>
                  <option value="Interview1">Interview Round 1</option>
                  <option value="Interview2">Interview Round 2</option>
                  <option value="Interview3">Interview Round 3</option>
                  <option value="Rejected">Rejected</option>
                </select>
              </div>

              <div className="form-control mt-3">
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

              <div className="form-control mt-3">
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

              <div className="form-control mt-3">
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
              <div className="form-control mt-3">
                <label className="label">
                  <span className="label-text">Domain</span>
                </label>
                <input
                  type="text"
                  className="input input-bordered w-full"
                  value={imageDomain}
                  onChange={(e) => setImageDomain(e.target.value)}
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

export default EditCompany;
