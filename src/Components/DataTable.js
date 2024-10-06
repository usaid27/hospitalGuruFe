import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

function DataTable({ apiUrl, entityName }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(apiUrl);
      setData(response.data);
    } catch (error) {
      toast.error(`Error fetching ${entityName} data.`);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      try {
        await axios.post(`${apiUrl}/Delete${entityName}/${id}`);
        toast.success(`${entityName} deleted successfully!`);
        fetchData();
      } catch (error) {
        toast.error(`Failed to delete ${entityName}.`);
      }
    }
  };

  return (
    <div className="datatable-container">
      <h2>{entityName} List</h2>
      <table className="datatable">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>
                <Link to={`/view-${entityName.toLowerCase()}/${item.id}`} className="btn btn-info">View</Link>
                <Link to={`/edit-${entityName.toLowerCase()}/${item.id}`} className="btn btn-warning">Edit</Link>
                <button onClick={() => handleDelete(item.id)} className="btn btn-danger">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Link to={`/add-${entityName.toLowerCase()}`} className="btn btn-primary">Add {entityName}</Link>
    </div>
  );
}

export default DataTable;
