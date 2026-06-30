import React from 'react'
import { adminContactsStyles as s } from '../../assets/dummyStyles'
import { useAuth } from '../../context/AuthContext'

const AdminContacts = () => {
  return (
    <>
    <div className={s.container}>
        <h1 className={s.heading}>Contact Requests</h1>
        <p className={s.subheading}>
            Read and manage inquiries from platform users.
        </p>
    </div>
    </>
  );
};

export default AdminContacts;