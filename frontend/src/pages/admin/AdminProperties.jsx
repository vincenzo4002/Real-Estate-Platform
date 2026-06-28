import React, { useState } from 'react'
import { adminPropertiesStyles as s } from '../../assets/dummyStyles';
import { useAuth } from '../../context/AuthContext';
import PropertyCard from '../../components/common/PropertyCard';

const AdminProperties = () => {

    const [properties, setProperties] = useState([]);
    const [loading, setLoading] = useState(true);
    const { token } = useAuth();

    // to fetch properties
    useEffect(() => {
        const fetchProperties = async () => {
            try {
                const res = await axios.get(`${API_URL}/api/admin/properties`, {
                    headers: { Authorization: `Bearer ${token}` },
                });

                const props = Array.isArray(res.data)
                ? res.data
                : res.data.properties || [];
                setProperties(props);
                setLoading(false);
            } catch (err) {
                console.error("Failed to load properties:", err);
                setLoading(false);
            }
        };
        fetchProperties();
    }, []);

    // to delete a particular property

  return (
    <>
    <div className={s.headerContainer}>
        <h1 className={s.pageTitle}>Property Moderation</h1>
        <p className={s.pageSubtitle}>
            Review and manage all property listings across the platform.
        </p>
    </div>
    <div className={s.headerContainer}>
        {" "}
    </div>
    </>
  )
}

export default AdminProperties