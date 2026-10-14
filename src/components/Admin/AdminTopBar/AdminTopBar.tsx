import React, { useState } from 'react';
import { FiBell, FiSearch, FiMenu, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import styles from "./AdminTopbar.module.css"

interface AdminTopbarProps {
  onMenuClick: () => void;
  onCollapseClick: () => void;
  isCollapsed: boolean;
  pageTitle: string;
  pageSubtitle: string;
}

const AdminTopbar: React.FC<AdminTopbarProps> = ({
  onMenuClick,
  onCollapseClick,
  isCollapsed,
  pageTitle,
  pageSubtitle,
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <header className={styles.topbar}>
      <div className={styles.topbarLeft}>
        {/* Mobile Menu Button */}
        <button className={styles.mobileMenuBtn} onClick={onMenuClick}>
          <FiMenu size={20} />
        </button>

        {/* Desktop Collapse Button */}
        <button className={styles.collapseBtn} onClick={onCollapseClick}>
          {isCollapsed ? <FiChevronRight size={18} /> : <FiChevronLeft size={18} />}
        </button>

        {/* Page Title Area */}
        <div className={styles.pageInfo}>
          <h1 className={styles.pageTitle}>{pageTitle}</h1>
          <p className={styles.pageSubtitle}>{pageSubtitle}</p>
        </div>
      </div>

      <div className={styles.topbarRight}>
        {/* Search */}
        <div className={styles.searchContainer}>
          <FiSearch className={styles.searchIcon} size={18} />
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={styles.searchInput}
          />
        </div>

        {/* Notification */}
        <button className={styles.notificationBtn}>
          <FiBell size={18} />
          <span className={styles.notificationBadge}>3</span>
        </button>

        {/* Admin Avatar */}
        <div className={styles.avatar}>
          <img
            src="https://ui-avatars.com/api/?background=4A101C&color=FAF7F2&name=Admin"
            alt="Admin"
            className={styles.avatarImage}
          />
        </div>
      </div>
    </header>
  );
};

export default AdminTopbar;