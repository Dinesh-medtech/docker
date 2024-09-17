import React from 'react';
import styles from '@/app/styles/userMenu.module.css';
import Image from 'next/image';
import user_icon from '@/app/images/Stacked card.png'

const UserMenu: React.FC = () => {
  return (
    <div className={styles.userMenu}>
      <div className={styles.userInfo}>
        <div className={styles.userIcon}>
          {/* <img src="/path/to/user-icon.png" alt="User Icon" /> */}
          <Image src={user_icon} alt="User Icon" />
        </div>
        <div className={styles.userDetails}>
          <p className={`${styles.userName} text-black`}>User Name</p>
          <p className={styles.userRole}>Admin</p>
        </div>
      </div>
      <div className={styles.userActions}>
        <button className={`${styles.signOutButton} text-black`}>Sign Out</button>
        <button className={styles.addAccountButton}>Add account</button>
      </div>
    </div>
  );
};

export default UserMenu;