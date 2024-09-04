import { useState } from "react";
import { toast } from "react-toastify";

const useAddCompany = () => {
    const [loading, setLoading] = useState(false);
    const [company, setCompany] = useState([]);

const addCompany = async ({ name, role, status, applyDate, city, link }) => {
  if (!name || !role || !status || !applyDate || !city || !link) {
    toast.error("Please fill all the fields");
    return;
  }

  setLoading(true);
  try {
    const response = await fetch("http://127.0.0.1:5000/api/companies", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, role, status, applyDate, city, link }),
    });

    const data = await response.json();
    
    // 捕获服务器响应的错误
    if (!response.ok) {
      console.error("Error response from server:", data);
      toast.error(data.error || "Error adding company");
      throw new Error(data.error || "Error adding company");
    }

    setCompany(data);
    return data;

  } catch (error) {
    console.error("Error during fetch:", error);
    toast.error("Error adding company");
  } finally {
    setLoading(false);
  }
};
  return {loading, addCompany};
}

export default useAddCompany
