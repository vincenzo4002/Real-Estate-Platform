import React, { useState } from 'react'
import { landingPageStyles as s } from '../../assets/dummyStyles';
import Navbar from '../../components/common/Navbar';
import { HiLocationMarker } from 'react-icons/hi';
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
  try{
    const isWishlisted = wishlistedIds.includes(propertyId);
    if (isWishlisted) {
      await axios.delete(`${API_URL}/api/wishlist/${propertyId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setWishlistedIds((prev) => prev.filter((id) => id !== propertyId));
    }else{
      await axios.post(
        `${API_URL}/api/wishlist/${propertyId}`, {}, {
          headers: { Authorization: `Bearer ${token}` }
        }
      );//to add
      setWishlistedIds((prev) => [...prev, propertyId]);
    }
  }catch(err){
    console.error("Failed to toggle wishlist:", err);
  }
};

// to fetch counts


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
          </form>
        </div>
      </section>
    </div>
  );
};

export default LandingPage