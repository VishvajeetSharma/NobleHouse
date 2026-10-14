import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import styles from "./AdminSideBar.module.css"
import { 
  FiHome, 
  FiUserCheck, 
  FiDollarSign, 
  FiShield, 
  FiSettings, 
  FiLogOut,
  FiChevronLeft,
  FiChevronRight
} from 'react-icons/fi';


interface AdminSidebarProps {
  isCollapsed: boolean;
  isMobileOpen: boolean;
  onCloseMobile: () => void;
}

const AdminSidebar: React.FC<AdminSidebarProps> = ({ 
  isCollapsed, 
  isMobileOpen, 
  onCloseMobile 
}) => {
  const navigate = useNavigate();

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: FiHome, path: '/admin/dashboard' },
    { id: 'pending-sellers', label: 'Pending Sellers', icon: FiUserCheck, path: '/admin/pending-sellers' },
    { id: 'payments', label: 'Payments', icon: FiDollarSign, path: '/admin/payments' },
    { id: 'verified-sellers', label: 'Verified Sellers', icon: FiShield, path: '/admin/verified-sellers' },
    { id: 'settings', label: 'Settings', icon: FiSettings, path: '/admin/settings' },
  ];

  const handleLogout = () => {
    // Add logout logic here
    navigate('');
  };

  const sidebarClasses = `
    ${styles.sidebar} 
    ${isCollapsed ? styles.sidebarCollapsed : ''} 
    ${isMobileOpen ? styles.sidebarMobileOpen : ''}
  `;

  return (
    <>
      <aside className={sidebarClasses}>
        {/* Logo Area */}
        <div className={styles.logoArea}>
          <div className={styles.logo}>
            <span className={styles.logoIcon}>✨</span>
            {!isCollapsed && <span className={styles.logoText}>Admin</span>}
          </div>
        </div>

        {/* Navigation */}
        <nav className={styles.nav}>
          {menuItems.map((item) => (
            <NavLink
              key={item.id}
              to={item.path}
              className={({ isActive }) => 
                `${styles.navItem} ${isActive ? styles.navItemActive : ''}`
              }
              onClick={() => {
                if (window.innerWidth < 768) {
                  onCloseMobile();
                }
              }}
            >
              {({ isActive }) => (
                <>
                  <div className={styles.navIcon}>
                    <item.icon size={20} strokeWidth={1.5} />
                  </div>
                  {!isCollapsed && (
                    <span className={styles.navLabel}>{item.label}</span>
                  )}
                  {isActive && <div className={styles.activeIndicator} />}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Bottom Section */}
        <div className={styles.bottomSection}>
          <button className={styles.logoutButton} onClick={handleLogout}>
            <div className={styles.navIcon}>
              <FiLogOut size={20} strokeWidth={1.5} />
            </div>
            {!isCollapsed && <span className={styles.navLabel}>Logout</span>}
          </button>
        </div>
      </aside>
    </>
  );
};

export default AdminSidebar;