import { useState } from "react";
import { toast } from "react-toastify";
import { useAuth } from "./AuthContext";

const useAddCompany = () => {
    const [loading, setLoading] = useState(false);
    const [company, setCompany] = useState([]);
    const { authUser } = useAuth();

const addCompany = async ({ name, role, status, applyDate, city, link, imageDomain }) => {
  if (!name || !role || !status || !applyDate || !city || !link) {
    toast.error("Please fill all the fields");
    return;
  }

  setLoading(true);
  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/api/companies`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authUser.token}`,
      },
      body: JSON.stringify({ name, role, status, applyDate, city, link, imageDomain }),
    });

    const data = await response.json();
    
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
