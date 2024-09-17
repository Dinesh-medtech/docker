import React from 'react';
import Image from 'next/image';
import chat_log_icon from '@/app/images/chat_log_icon.png';
import manage_document_icon from '@/app/images/manage_document_icon.png';
import clear_cache_icon from '@/app/images/clear_cache_icon.png';
import styles from '@/app/styles/sidebar.module.css';
import Icon_button1 from '@/app/images/Icon_button1.png';

interface SidebarProps {
  isSidebarVisible: boolean;
  handleNewChatClick: () => void;
  conversations: any[];
  handleConversationClick: (conversation: any) => void;
  handleChatLogClick: () => void;
  handleManageDocumentsClick: () => void;
}

const groupConversationsByDate = (conversations: any[]) => {
  const grouped: { [key: string]: any[] } = {};
  conversations.forEach(conversation => {
    const date = new Date(conversation.date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
    if (!grouped[date]) {
      grouped[date] = [];
    }
    grouped[date].push(conversation);
  });
  return grouped;
};

const Sidebar: React.FC<SidebarProps> = ({ isSidebarVisible, handleNewChatClick, conversations, handleConversationClick, handleChatLogClick, handleManageDocumentsClick }) => {
  const groupedConversations = groupConversationsByDate(conversations);

  return (isSidebarVisible ?
    <aside className={`${styles.sidebar} ${isSidebarVisible ? '' : styles.hidden}`}>
      <div className="pl-4 pt-4 pb-4 pr-1">
        <button className={styles.newChatButton} onClick={handleNewChatClick}>+ New Chat</button>
        <div className={styles.chatHistoryTitle}>
        <h2 className="text-black">Chats</h2>
        </div>
        <div className={`${styles.chatHistoryContainer} mb-6 mt-10`}>
          {Object.keys(groupedConversations).map(date => (
            <div key={date}>
              {/* <h3 className={styles.dateHeader}>{date}</h3> */}
              {groupedConversations[date].map((conversation, index) => (
                <p key={index} className={styles.chatItem} onClick={() => handleConversationClick(conversation)}>
                  {conversation.title}
                </p>
              ))}
            </div>
          ))}
        </div>
        <div className={styles.sidebarBottom}>
          <button className={styles.chatLogButton} onClick={handleChatLogClick}>
            <Image src={chat_log_icon} alt="Admin" className={styles.chat_log_icon} />
            <span>Chat Log</span>
          </button>
          <button className={styles.manageDocumentButton} onClick={handleManageDocumentsClick}>
            <Image src={manage_document_icon} alt="manage_document" className={styles.manage_document_icon} />
            <span>Manage Documents</span>
          </button>
          <button className={styles.clearCacheButton}>
            <Image src={clear_cache_icon} alt="clear_cache" className={styles.clear_cache_icon} />
            <span>Clear Cache</span>
          </button>
        </div>
      </div>
    </aside> : <aside className={`${styles.sidebar1} ${!isSidebarVisible ? '' : styles.hidden1}`}>
      <div className="pl-4 pt-4 pb-4 pr-2">
        <Image onClick={handleNewChatClick} src={Icon_button1} alt="icon_button"/>
        <div className={styles.chatHistoryTitle}>
        <h2 className="text-black mt-5">Chats</h2>
        </div>
        <div className={styles.sidebarBottom}>
          <button className={styles.chatLogButton1} >
            <Image src={chat_log_icon} alt="Admin" className={styles.chat_log_icon} onClick={handleChatLogClick}/>
          </button>
          <button className={styles.manageDocumentButton1} onClick={handleManageDocumentsClick}>
            <Image src={manage_document_icon} alt="manage_document" className={styles.manage_document_icon} />
          </button>
          <button className={styles.clearCacheButton1}>
            <Image src={clear_cache_icon} alt="clear_cache" className={styles.clear_cache_icon} />
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;