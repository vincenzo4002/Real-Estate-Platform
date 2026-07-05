import React, { useState } from 'react';
import { editPropertyStyles as s } from '../../assets/dummyStyles';
import { useAuth } from '../../context/AuthContext';
import { useNavigate, useParams } from 'react-router-dom';

const EditProperty = () => {

    const { id } = useParams();
  const navigate = useNavigate();
  const { token } = useAuth();
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [existingImages, setExistingImages] = useState([]);
  const [newImages, setNewImages] = useState([]);
  const [newImagePreviews, setNewImagePreviews] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    city: "",
    area: "",
    pincode: "",
    propertyType: "flat",
    bhk: "",
    bathrooms: "",
    areaSize: "",
    furnishing: "unfurnished",
    status: "sale",
    amenities: [],
    securityDeposit: "",
    maintenance: "",
  });

  const commonAmenities = [
    "Parking",
    "Pool",
    "Gym",
    "Security",
    "Wifi",
    "Power Backup",
    "Club House",
    "Garden",
  ];

  // to fetch the property


  return (
    <div className={s.pageContainer}>
        <div className={s.innerContainer}>
            <div className={s.headerWrapper}>
                <h1 className={s.pageTitle}>Edit Property</h1>
                <p className={s.pageSubtitle}>
                    Update your property details and manage images.
                </p>
            </div>
        </div>
    </div>
  );
};

export default EditProperty;