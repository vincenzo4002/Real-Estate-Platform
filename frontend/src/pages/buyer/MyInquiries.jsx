import React, { useEffect } from 'react'
import { myInquiriesStyles as s } from '../../assets/dummyStyles';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Navbar from '../../components/common/Navbar';
import { HiOutlineChatAlt2 } from 'react-icons/hi';

const MyInquiries = () => {

    const { user, token } = useAuth();
    const [inquiries, setInquiries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    // to fetch the inquiry coming from server side
    useEffect(() => {
        const fetchInquiries = async () => {
            if (!user) return;
            try {
                const endpoint = user?.role === "seller" ? "seller" : "my";
                const res = await axios.get(`${API_URL}/api/inquiry/${endpoint}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    },
                });
                setInquiries(res.data.inquiries || []);
                setLoading(false);
            } catch (err) {
                console.error("Error fetching inquiries:", err);
                setError(err.response?.data?.message || "Failed to load inquiries.");
                setLoading(false);
            }
        };
        fetchInquiries();
    }, [user, token]);

    // to mark as read for the inquiry for seller
    const markAsRead = async (id) => {
        try {
            await axios.patch(`${API_URL}/api/inquiry/${id}/read`, {}, {
                headers: {
                    Authorization: `Bearer ${token}`
                },
            },
            );
            setInquiries(
                inquiries.map((inq) =>
                    inq._id === id ? { ...inq, isRead: true } : inq,),
            );
        } catch (err) {
            console.error("failed to mark read");
        }
    };

    const handleStartChat = async (inq) => {
        try {
            const res = await axios.post(`${API_URL}/api/chat/start`,
                {
                    propertyId: inq.property?._id,
                    buyerId: inq.buyer?._id,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    },
                },);
            navigate("/chat-messages", { state: { chat: res.data } });
        } catch (err) {
            console.error("Error starting chat:", err);
            alert("Failed to start chat. Please try again.");
        }
    };

    if (loading)
        return (
            <div className={s.loaderFullPage}>
                <div className={s.loader}></div>
            </div>
        );

        if(error)
            return(
        <div className={user?.role !== "seller" ? s.bgBgAltMinH : s.bgTransparentMinH}>
            {user?.role != "seller" && <Navbar />}
            <div className={s.containerPy12TextCenter}>
                <div className={s.cardPremiumPy16Px8}>
                    <h2 className={s.textDangerMb4}>Error</h2>
                    <p className={s.mb8}>{error}</p>

                    <button onClick={() => window.location.reload()}
                        className={s.btnPrimary}>
                            Try Again
                            </button>
                </div>
            </div>
        </div>
    );

    const isSeller = user?.role === "seller";


    return (
        <div className={user?.role !== "seller" ? s.bgBgAltMinH : s.bgTransparentHAuto}>
            {user?.role !== "seller" && <Navbar />}
            <div
                className={`${s.containerFadeIn} ${user?.role !== "seller" ? s.py12Pt12 : s.pt0}`}>
                <div className={s.mb12}>
                    <h1 className={s.heading}>
                        {isSeller ? "Customer Inquiries" : "My Inquiries"}
                    </h1>
                    <p className={s.textMuted}>
                        {isSeller
                        ? "Review and respond to interest in your properties
                        : "Track the status of your property inquiries."}
                    </p>
                </div>

                {inquiries.length === 0 ? (
                    <div className={s.cardPremiumPy24Px8TextCenter}>
                        <div className={s.iconContainer}>
                            <HiOutlineChatAlt2 size={40} />
                        </div>
                        <h2 className={s.mb4}>
                            No inquiries {isSeller ? "received" : "sent"}
                        </h2>
                        <p className={s.textMuted}></p>
                    </div>
                )}
            </div>
        </div>
    )
}

export default MyInquiries