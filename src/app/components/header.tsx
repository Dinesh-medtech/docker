import React from 'react';
import menu_icon from '@/app/images/Icon_button.png';
import logo from '@/app/images/Group.png';
import user_icon from '@/app/images/Monogram custom.png';
import styles from '@/app/styles/header.module.css';
import Image from 'next/image';

interface HeaderProps {
  toggleSidebar: () => void;
}

const Header: React.FC<{ toggleSidebar: () => void; toggleUserMenu: () => void }> = ({ toggleSidebar, toggleUserMenu }) => {
  return (
    <header className={styles.AppHeader}>
      <div className={styles.header}>
        <Image src={menu_icon} alt="Menu icon" className={styles.menuIcon} onClick={toggleSidebar} />
        <Image src={logo} alt="Acarin Inc Logo" className={styles.logo}/>
        <div className={styles.userIcon} onClick={toggleUserMenu}>
          <Image src={user_icon} alt="Admin" />
        </div>
      </div>
    </header>
  );
};

export default Header;