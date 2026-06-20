import React, { useState } from 'react'
import { propertyDetailsStyles as s } from '../../assets/dummyStyles';
import Navbar from '../../components/common/Navbar';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const PropertyDetails = () => {
    const { id } = useParams();
    const { user, token } = useAuth();
    const navigate = useNavigate();
    const [property, setProperty] = useState(null);
    const [similarProperties, setSimilarProperties] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [inquiry, setInquiry] = useState({
        name: "",
        email: "",
        phone: "",
        message: "",
    });
    const [inquiryStatus, setInquiryStatus] = useState({
        loading: false,
        success: false,
        error: null,
    });
    const [isInWishlist, setIsInWishlist] = useState(false);
    react(
        <div className={s.pageContainer}>
            <Navbar />
        </div>
    )
}

export default PropertyDetails