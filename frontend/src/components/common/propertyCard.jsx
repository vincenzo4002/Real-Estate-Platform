import React from 'react'
import { propertyCardStyles as s } from '../../assets/dummyStyles'
import { useAuth } from '../../context/AuthContext'
import { Link, useNavigate } from 'react-router-dom';
import { HiHeart, HiOutlineHeart, HiShieldCheck } from 'react-icons/hi';

const PropertyCard = ({
    property,
    renderActions,
    isWishlisted,
    onToggleWishlist
}) => {
    if (!property) return null;

    const { user } = useAuth();
    const navigate = useNavigate();

    //for wishlist click
    const handleWishlistClick = (e) => {
        e.preventDefault();
        e.stopPropagation();

        if (!user) {
            navigate('/login');
            return;
        }
        if (onToggleWishlist) {
            onToggleWishlist(property._id);
        }
    };

    const formattedPrice = new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
        maximumFractionDigits: 0,
    }).format(property.price);

    const statusBadgeClass = s.badgeStatus(property.status);

    return (
        <div className={s.card}>
            <Link to={`/property/${property._id}`} className={s.link} >
            <div className={s.imageSection}>
                <img src={property.images[0]} alt={property.title} className={s.image} />

                {/* top badges */}
                <div className={s.topBadges}>
                    <div className={s.badgeLeft}>
                        {renderActions ?(
                            <span className={statusBadgeClass}>
                                {property.status === "sale" ? "available" : property.status}
                            </span>
                            ) : (
                            <span className={s.badgeNew}>
                                New
                            </span>
                        )}
                        <span>
                            <HiShieldCheck size={14} /> Verified
                        </span>
                    </div>

                    {(!user || user.role === "buyer") && (
                        <button className={s.wishlistButton(isWishlisted)}
                        onClick={handleWishlistClick}>
                            {isWishlisted ? (
                                <HiHeart size={20} />
                            ) : (
                                <HiOutlineHeart size={20} />
                            )}
                        </button>
                    )}
                </div>

                <div className={s.priceOverlay}>
                    <h3 className={s.price}>{formattedPrice}</h3>
                </div>

                <div>
                    
                </div>
            </div>
            </Link>
        </div>
    )
}

export default PropertyCard