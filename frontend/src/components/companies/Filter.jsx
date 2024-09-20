import React from 'react'

const Filter = ({statusFilter, setStatusFilter, filteredCompanies}) => {
  return (
    <div className="mb-4">
    <label htmlFor="statusFilter" className="mr-2">Filter by Status:</label>
    <select
      id="statusFilter"
      value={statusFilter}
      onChange={(e) => setStatusFilter(e.target.value)}
      className="border rounded p-1"
    >
      <option value="All">All</option>
      <option value="Submitted">Submitted</option>
      <option value="OA">OA</option>
      <option value="Interview1">Interview1</option>
      <option value="Interview2">Interview2</option>
      <option value="Interview3">Interview3</option>
      <option value="Rejected">Rejected</option>
      <option value="In Progress">In Progress</option>
    </select>
    <span className="ml-3 text-gray-500 text-sm">Showing {filteredCompanies.length} companies</span>
  </div>
  )
}

export default Filter
