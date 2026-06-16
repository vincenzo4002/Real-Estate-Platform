import React, { useState } from 'react'
import { landingPageStyles as s } from '../../assets/dummyStyles';
import Navbar from '../../components/common/Navbar';
import { HiCurrencyDollar, HiHome, HiLightningBolt, HiLocationMarker, HiOfficeBuilding, HiShieldCheck, HiVideoCamera } from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useEffect } from 'react';
import axios from 'axios';
import API_URL from '../../config';

const LandingPage = () => {

  const navigate = useNavigate();
  const { user, token } = useAuth();
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [propertyType, setPropertyType] = useState("Select Type");
  const [propertyCount, setPropertyCount] = useState({
    flat: 0,
    villa: 0,
    penthouse: 0,
    commercial: 0,
  });

  const [wishlistedIds, setWishlistedIds] = useState([]);

  useEffect(() => {
    fetchProperties();
    fetchCounts();
    if (user) {
      fetchWishlist();
    }
  }, [user]);

  const fetchWishlist = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/wishlist`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setWishlistedIds(
        res.data
          .filter((item) => item.property)
          .map((item) => String(item.property._id)),
      );
    } catch (err) {
      console.error("Failed to fetch wishlist:", err);
    }
  };

  //to remove a wishlist
  const handleToggleWishlist = async (propertyId) => {
    try {
      const isWishlisted = wishlistedIds.includes(propertyId);
      if (isWishlisted) {
        await axios.delete(`${API_URL}/api/wishlist/${propertyId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setWishlistedIds((prev) => prev.filter((id) => id !== propertyId));
      } else {
        await axios.post(
          `${API_URL}/api/wishlist/${propertyId}`, {}, {
          headers: { Authorization: `Bearer ${token}` }
        }
        );//to add
        setWishlistedIds((prev) => [...prev, propertyId]);
      }
    } catch (err) {
      console.error("Failed to toggle wishlist:", err);
    }
  };

  // to fetch counts
  const fetchCounts = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/property/counts`);
      if (res.data.success) {
        setPropertyCounts(res.data.counts);
      }
    } catch (err) {
      console.error("Failed to fetch property counts:", err);
    }
  };

  //to fetch properties
  const fetchProperties = async (search = "") => {
    try {
      setLoading(true);
      const res = await axios.get(`${API_URL}/api/property?city=${search}`);
      setProperties(res.data.properties || res.data || []);
      setError(null);
    }
    catch (err) {
      setError("Failed to fetch properties. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (searchTerm) params.append("city", searchTerm);
    if (propertyType !== "Select Type") params.append("type", propertyType);
    navigate(`/properties?${params.toString()}`);
  };

  const categories = [
    {
      name: "Modern Flats",
      count: propertyCounts.flat || 0,
      icon: <HiOfficeBuilding size={32} />,
      type: "flat",
    },
    {
      name: "Luxury Villas",
      count: propertyCounts.villa || 0,
      icon: <HiHome size={32} />,
      type: "villa",
    },
    {
      name: "Penthouse",
      count: propertyCounts.penthouse || 0,
      icon: <HiOfficeBuilding size={32} />,
      type: "penthouse",
    },
    {
      name: "Commercial",
      count: propertyCounts.commercial || 0,
      icon: <HiOfficeBuilding size={32} />,
      type: "commercial",
    },
  ];

  const features = [
    {
      title: "Verified Trust",
      desc: "Every listing is strictly audited for ownership, condition, and legality.",
      icon: <HiShieldCheck size={24} />,
    },
    {
      title: "Smart Search",
      desc: "Our AI-driven algorithms help you find the best matches based on preferences.",
      icon: <HiLightningBolt size={24} />,
    },
    {
      title: "Best Value",
      desc: "Direct-from-owner listings and zero-commission options to ensure competitive prices.",
      icon: <HiCurrencyDollar size={24} />,
    },
    {
      title: "Virtual Tours",
      desc: "High-definition 3D tours allow you to experience the property from home.",
      icon: <HiVideoCamera size={24} />,
    },
  ];



  return (
    <div className={s.bgMain}>
      <Navbar />
      {/* hero section */}
      <section className={s.heroSection}>
        <div className={s.heroContent}>
          <span className={s.badge}>Trusted by 20,000+ homeowners</span>
          <h1 className={s.heroTitle}>
            Find Your <span className={s.textGradient}>Perfect</span>
            Next Chapter.
          </h1>
          <p className={s.heroSubtitle}>
            Experience the most advanced real estate search platform. Discover verified listings, connect with top agents, and find a place you'll love.
          </p>

          <form onSubmit={handleSearch} className={s.searchForm}>
            <div className={s.searchField}>
              <div className={s.textPrimary}>
                <HiLocationMarker size={26} />
              </div>
              <div className={s.flexCol}>
                <label className={s.labelSmall}>Location</label>
                <input type="text" placeholder="Where are you looking ?" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className={s.inputTransparent} />
              </div>
            </div>
            <div className={s.searchDivider}></div>
            <div className={s.searchField}>
              <div className={s.textPrimary}>
                
          </form>
        </div>
      </section>
    </div>
  );
};

export default LandingPage