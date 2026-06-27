import React from 'react'
import { adminLayoutStyles as s } from '../assets/dummyStyles'
import AdminSidebar from './AdminSidebar'

const AdminLayout = () => {
  return (
    <div className={s.layout}>
        <AdminSidebar />
    </div>
  )
}

export default AdminLayout