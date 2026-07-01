import React, { useState, useEffect } from 'react'
import { sellerDashboardStyles as s } from '../../assets/dummyStyles';
import { useAuth } from '../../context/AuthContext';
import axios from "axios";
import API_URL from "../config";
import { HiOutlineCheckCircle,HiOutlineDownload, HiOutlineEye, HiOutlineLibrary, HiOutlinePlus, HiOutlineSearch, HiOutlineUserGroup, HiPlus } from 'react-icons/hi';
import { Link } from 'react-router-dom';

const SellerDashboard = () => {

    const { logout, user } = useAuth();
    const [stats, setStats] = useState({
        totalProperties: 0,
        activeListings: 0,
        soldProperties: 0,
        totalInquiries: 0,
        totalViews: 0,
    });

    const [propertties, setProperties] = useState([]);
    const [inquiries, setInquiries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");

    // to fetch all data
    useEffect(() => {
        const fetchData = async () => {
            try {
                const { statsRes, propsRes, inqRes } = await Promise.all([
                    axios.get(`${API_URL}/api/property/seller/dashboard`, {
                        headers: {
                            Authorization: `Bearer ${user.token}`
                        }
                    }),
                    axios.get(`${API_URL}/api/property/my`, {
                        headers: {
                            Authorization: `Bearer ${user.token}`
                        }
                    }),
                    axios.get(`${API_URL}/api/inquiry/seller`, {
                        headers: {
                            Authorization: `Bearer ${user.token}`
                        }
                    })
                ]);
                setStats(statsRes.data.stats || statsRes.data);
                const props = Array.isArray(propsRes.data) ? propsRes.data : propsRes.data.properties || [];
                setProperties(props);
                setInquiries(
                    Array.isArray(inqRes.data.inquiries) ? inqRes.data.inquiries.slice(0, 3) : Array.isArray(inqRes.data) ? inqRes.data.slice(0, 3) : [],
                );
                setLoading(false);
            } catch (err) {
                console.error("Failed to load dashboard data:", err);
                setLoading(false);
            }
        };
        fetchData();
    }, [token]);

    // to delete a property
    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this listing?")) return;
        try {
            await axios.delete(`${API_URL}/api/property/${id}`, {
                headers: {
                    Authorization: `Bearer ${user.token}`
                }
            });
            setProperties(properties.filter((p) => p._id !== id));
        } catch (err) {
            alert("Failed to delete property:");
        }
    };

    // to update status (make it sold or for sale)
    const handleStatusUpdate = async (id, currentStatus) => {
        const newStatus = currentStatus === "sold" ? "sale" : "sold";
        try {
            await axios.patch(`${API_URL}/api/property/${id}/status`, { status: newStatus }, {
                headers: {
                    Authorization: `Bearer ${user.token}`
                },
            },
            );
            setProperties(properties.map((p) => (p._id === id ? { ...p, status: newStatus } : p)));
        } catch (err) {
            alert("Failed to update property status:");
        }
    };

    // to export the data
    const handleExport = () => {
        const headers = ["Title", "Location", "Type", "Price", "Status", "Views"];
        const csvRows = properties.map((p) => [
            p.title,
            `${p.area}, ${p.city}`,
            p.propertyType,
            p.price,
            p.status,
            p.views || 0,
        ]);

        const csvContent = [headers, ...csvRows].map((e) => e.join(",")).join("\n");
        const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
        const link = document.createElement("a");
        const url = URL.createObjectURL(blob);
        link.setAttribute("href", url);
        link.setAttribute("download", "property_listings.csv");
        link.style.visibility = "hidden";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    if (loading)
  return (
    <div className="loader-full-page">
      <div className="loader"></div>
    </div>
  );

const statCards = [
  {
    title: "Total Views",
    value: stats.totalViews?.toLocaleString() || "0",
    icon: HiOutlineEye,
    color: "#0d6e59",
  },
  {
    title: "Active Leads",
    value: stats.totalInquiries?.toLocaleString() || "0",
    icon: HiOutlineUserGroup,
    color: "#0d6e59",
  },
  {
    title: "Live Listings",
    value: stats.activeListings?.toLocaleString() || "0",
    icon: HiOutlineLibrary,
    color: "#0d6e59",
  },
  {
    title: "Properties Sold",
    value: stats.soldProperties?.toLocaleString() || "0",
    icon: HiOutlineCheckCircle,
    color: "#0d6e59",
  },
];

const filteredProperties = Array.isArray(properties)
  ? properties
      .filter(
        (p) =>
          p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          p.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
          p.area.toLowerCase().includes(searchTerm.toLowerCase()),
      )
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
  : [];

    return (
        <>
            <header className={s.header}>
                <div className={s.headerLeft}>
                    <h1 className={s.headerTitle}>Seller Dashboard</h1>
                    <p className={s.headerSubtitle}>
                        Manage your property portfolio and track performance.
                    </p>
                </div>

                <div className={s.headerActions}>
                    <button className={s.exportButton} onClick={handleExport}>
                        <HiOutlineDownload size={20} />
                        Export
                    </button>
                    <Link to="/add-properties" className={s.addButton}>
                            <HiPlus size={20} />
                            Add New
                    </Link>
                </div>
            </header>

            {/* stats grid */}
            <div className={s.statsGrid}>
                {statCards.map((card, i) => (
                    <div key={i} className={s.statCard} style={{"--card-color": card.color}}>
                        <div className={s.statIconWrapper}>
                            <card.icon size={20} />
                        </div>
                        <div className={s.statTitle}>{card.title}</div>
                        <div className={s.statValue}>{card.value}</div>
                    </div>
                ))}
            </div>

            <div className={s.listingsSection}>
                <div className={s.listingsHeader}>
                    <h2 className={s.listingsTitle}>Property Listings</h2>
                    <div className={s.searchWrapper}>
                        <HiOutlineSearch className={s.searchIcon} />
                        <input
                            type="text"
                            placeholder="Search listings...."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className={s.searchInput}
                        />
                    </div>
                </div>

                {}
            </div>
        </>
    )
}

export default SellerDashboard