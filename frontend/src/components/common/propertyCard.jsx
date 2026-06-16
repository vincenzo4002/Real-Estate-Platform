import React from 'react'
import {propertyCardStyles as s} from '../../assets/dummyStyles'
import {useAuth} from '../../context/AuthContext'

const propertyCard = ({
    property,
    renderActions,
    isWishlisted,
    onToggleWishlist
}) => {
    if (!property) return null;

    const {user} = useAuth();
    const navigate = useNavigate();

    //for wishlist click
    const handleWishlistClick = (e) => {
        e.preventDefault();
        e.stopPropagation();
    }
  return (
    <div>

    </div>
  )
}

export default propertyCard