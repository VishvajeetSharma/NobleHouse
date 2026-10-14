import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import AdminSidebar from '../../../components/Admin/AdminSideBar/AdminSideBar';
import AdminTopbar from '../../../components/Admin/AdminTopBar/AdminTopBar';
import styles from "./AdminLayout.module.css";

const AdminLayout: React.FC = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (!mobile) {
        setIsMobileMenuOpen(false);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div className={styles.layout}>
      {/* Sidebar */}
      <AdminSidebar 
        isCollapsed={isCollapsed} 
        isMobileOpen={isMobileMenuOpen}
        onCloseMobile={() => setIsMobileMenuOpen(false)}
      />

      {/* Overlay for mobile */}
      {isMobile && isMobileMenuOpen && (
        <div className={styles.overlay} onClick={() => setIsMobileMenuOpen(false)} />
      )}

      {/* Main Content */}
      <div 
        className={`
          ${styles.mainContent} 
          ${isCollapsed ? styles.mainContentExpanded : ''}
        `}
      >
        <AdminTopbar 
          onMenuClick={toggleMobileMenu} 
          onCollapseClick={toggleSidebar}
          isCollapsed={isCollapsed}
          pageTitle="Dashboard"
          pageSubtitle="Welcome back, Admin"
        />
        <main className={styles.pageContent}>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;