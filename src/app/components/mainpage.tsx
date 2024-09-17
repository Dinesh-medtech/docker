"use client"
import React, { useState, useEffect } from 'react';
import styles from '@/app/styles/App.module.css';
import ChatLogTable from '@/app/components/ChatLogTable';
import ManageDocuments from '@/app/components/managedocumnets'; // Import the new component
import { Chip } from "@mui/material";
import Header from '@/app/components/header';
import Sidebar from '@/app/components/sidebar';
import Image from 'next/image';
import responses from '@/app/responses.json';
import audio_icon from '@/app/images/audio_icon.png';
import send_icon from '@/app/images/enter_icon.png';
import bot_icon from '@/app/images/ACARin logo.png'; // Add bot icon
import UserMenu from '@/app/components/userMenu'; // Add this import
import { FaThumbsUp, FaCopy } from 'react-icons/fa'; // Import icons


// Add this type assertion
const responsesTyped = responses as { [key: string]: string };

const App: React.FC = () => {
  const topics = ["Evlotime-User Guide", "Software Development", "Software Requirements", "HR Policies", "Partner Genie User Guide"];
  const [isSidebarVisible, setSidebarVisible] = useState(true);
  const [showChatLog, setShowChatLog] = useState(false);
  const [showManageDocuments, setShowManageDocuments] = useState(false); // Add this state
  const [chatHistory, setChatHistory] = useState<{ sender: string; message: string }[]>([]);
  const [inputText, setInputText] = useState('');
  const [showTitleAndTopics, setShowTitleAndTopics] = useState(true);
  const [conversations, setConversations] = useState<{ title: string; history: { sender: string; message: string }[] }[]>([]);
  const [currentChatTitle, setCurrentChatTitle] = useState('');
  const [isUserMenuVisible, setUserMenuVisible] = useState(false);
  const [likedMessages, setLikedMessages] = useState<number[]>([]); // Track liked messages
  const [liked, setLiked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedChip, setSelectedChip] = useState<string | null>(null);




  useEffect(() => {
    const savedConversations = JSON.parse(localStorage.getItem('conversations') || '[]');
    setConversations(savedConversations);
  }, []);

  const toggleSidebar = () => {
    setSidebarVisible(!isSidebarVisible);
  };

  const handleChatLogClick = () => {
    setShowChatLog(true);
    setShowManageDocuments(false); // Hide manage documents view
    setShowTitleAndTopics(false);
  };

  const handleManageDocumentsClick = () => {
    setShowManageDocuments(true);
    setShowChatLog(false); // Hide chat log view
    setShowTitleAndTopics(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value);
  };


  const handleSendClick = async () => {
    setLoading(true); // Set loading to true

    var botResponse =  "";

    if (inputText.trim() !== '') {
      const userMessage = inputText.trim();
      const newChatHistory = [...chatHistory, { sender: 'user', message: userMessage }];
      console.log(userMessage);
      setChatHistory(newChatHistory);
      setInputText('');
      setShowTitleAndTopics(false);

      try {
        // Send user query to the API
        const response = await fetch(`https://wf0qcflin7.execute-api.us-east-1.amazonaws.com/dev/getResponse?user_id=b342e67e-f914-4b1d-9c11-1b9d940c1c7a&query=${userMessage}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        // Receive bot response from the API
        const data = await response.json();
        console.log(data);
        if(data.length == 0) {
          botResponse = "I'm sorry, I don't understand that.";
        }
        else{
         botResponse = data[0].response || "I'm sorry, I don't understand that.";
        }
        const updatedChatHistory = [...newChatHistory, { sender: 'bot', message: botResponse }];
        setChatHistory(updatedChatHistory);

        const newConversation = { title: currentChatTitle || userMessage, history: updatedChatHistory };
        const updatedConversations = [...conversations.filter(conv => conv.title !== currentChatTitle), newConversation];
        setConversations(updatedConversations);
        localStorage.setItem('conversations', JSON.stringify(updatedConversations));
        setCurrentChatTitle(newConversation.title);
        setLoading(false); // Set loading to true

      } catch (error) {
        console.error('Error fetching response:', error);
      }
      try {
        // Send user query to the API
        const response = await fetch(`https://wf0qcflin7.execute-api.us-east-1.amazonaws.com/dev/getResponse?user_id=b342e67e-f914-4b1d-9c11-1b9d940c1c7a&query=${userMessage}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
         console.log(response);
        // Receive bot response from the API
        const data = await response.json();
        console.log(data);
        const botResponse = data[0].response || "I'm sorry, I don't understand that.";
        const updatedChatHistory = [...newChatHistory, { sender: 'bot', message: botResponse }];
        setChatHistory(updatedChatHistory);

        const newConversation = { title: currentChatTitle || userMessage, history: updatedChatHistory };
        const updatedConversations = [...conversations.filter(conv => conv.title !== currentChatTitle), newConversation];
        setConversations(updatedConversations);
        localStorage.setItem('conversations', JSON.stringify(updatedConversations));
        setCurrentChatTitle(newConversation.title);
      } catch (error) {
        console.error('Error fetching response:', error);
      }
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSendClick();
    }
  };

  const handleConversationClick = (conversation: any) => {
    setChatHistory(conversation.history);
    setCurrentChatTitle(conversation.title);
    setShowTitleAndTopics(false);
    setShowChatLog(false);
    setShowManageDocuments(false); // Hide manage documents view
  };

  const handleNewChatClick = () => {
    setChatHistory([]);
    setCurrentChatTitle('');
    setShowTitleAndTopics(true);
    setShowChatLog(false);
    setShowManageDocuments(false);
    setSelectedChip(""); // Hide manage documents view
  };

  const toggleUserMenu = () => {
    setUserMenuVisible(!isUserMenuVisible);
  };

   // Handle liking a bot message
   const handleLike = (index: number) => {
    if (!likedMessages.includes(index)) {
      setLikedMessages([...likedMessages, index]);
      }
    setLiked(!liked);
  };

  const handleChipClick = (chip: string) => {
    setSelectedChip(chip);  // Set the clicked chip as selected
    setInputText(chip);     // Fill the input text field with the chip value
  };

  // Handle copying a message to the clipboard
  const handleCopy = (message: string) => {
    navigator.clipboard.writeText(message)
      .then(() => {
         alert('Message copied to clipboard!');
      })
      .catch(err => {
        console.error('Failed to copy: ', err);
      });
  };

  return (
    <div className={styles.main1}>
      <Header toggleSidebar={toggleSidebar} toggleUserMenu={toggleUserMenu} />
      {isUserMenuVisible && <UserMenu />}
      <div className={styles.mainContainer}>
        <Sidebar
          isSidebarVisible={isSidebarVisible}
          handleNewChatClick={handleNewChatClick}
          conversations={conversations}
          handleConversationClick={handleConversationClick}
          handleChatLogClick={handleChatLogClick}
          handleManageDocumentsClick={handleManageDocumentsClick} 
        />
        <main className={`${styles.content} ${isSidebarVisible ? styles.contentShift : ''} `} >
          {showTitleAndTopics && (
            <>
              <div className={styles.contentTop}>
                <h1>Choose the topic you want to chat about</h1>
              </div>
              <div className={styles.topics}>
                {topics.map((topic, index) => (
                  <Chip 
                  key={index} 
                  label={topic} 
                  clickable
                  onClick={() => handleChipClick(topic)}
                  className={`${styles.chip} ${selectedChip === topic ? styles.selectedChip : ''}`}
                  />
                ))}
              </div>
            </>
          )}
          {showChatLog ? (
            <ChatLogTable />
          ) : 
         
          showManageDocuments ? (
            <ManageDocuments />
          ):(
            <div className={styles.chatContainer}>
              {chatHistory.map((chat, index) => (
                <div key={index} className={`${styles.chatMessage} ${chat.sender === 'user' ? styles.userMessage : styles.botMessage}`}>
                  {chat.sender === 'bot' && (
                    <div className={styles.botMessageContainer}>
                      <Image src={bot_icon} alt="bot_icon" />
                      <div className={styles.botMessageContent}>
                        <p>{chat.message}</p>
                        <div className={styles.botActions}>
                          <FaThumbsUp 
                            className={`${styles.likeIcon} ${!liked ? "text-gray-500" : "text-[#0BAEF3]"} ${likedMessages.includes(index) ? styles.liked : ''}`}
                            onClick={() => handleLike(index)}
                          />
                          <FaCopy className={`${styles.copyIcon} text-gray-500`} onClick={() => handleCopy(chat.message)} />
                        </div>
                      </div>
                    </div>
                  )}
                  {chat.sender === 'user' && <p>{chat.message}</p>}
                </div>
              ))}
                  {loading && (
                    <div className={`${styles.chatMessage} ${styles.botMessage} `}>
                      <div className={styles.botMessageContainer}>
                        <Image src={bot_icon} alt="bot_icon" />
                        <div className={styles.botMessageContent}>
                          <div className={styles.loadingDots}>
                            <span className={styles.dot}></span>
                            <span className={styles.dot}></span>
                            <span className={styles.dot}></span>
                            <span className={styles.dot}></span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
            </div>
          )
          
          }
          {!showChatLog && !showManageDocuments &&(
            <div className={styles.inputContainer}>
              <input
                type="text"
                placeholder="Type here..."
                value={inputText}
                onChange={handleInputChange}
                onKeyPress={handleKeyPress}
              />
              <div className={styles.inputIcons}>
                <Image src={audio_icon} alt="audio_icon" />
                <Image src={send_icon} alt="send_icon" onClick={handleSendClick} />
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default App;