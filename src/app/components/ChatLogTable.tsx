import React, { useState } from 'react';
import styles from '@/app/styles/ChatLogTable.module.css';
import { Table, TableBody, TableCell, TableContainer, TableRow, Paper, TextField, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';

const ChatLogTable: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  // Mock data for the table
  const chatLogs = [
    { id: 1, user: 'Amar', date: '24 Mar 2024 | 04:35 PM', request: 'Provide the summary of this document', response: 'Here is the summary of that document: The document is the "HR Policy Manual 2023.pdf." It outlines the qualifications, experience, and nature of duties for various positions at the institute. It also includes details about the scales of pay, reimbursement of medical expenses, and recruitment criteria. Additionally, it provides information about the contact details of the institute\'s dispensary...' },
    // Add more mock data as needed
  ];

  return (
    <div className={styles.chatLogContainer}>
      <h1 className='text-black'>Chat Log</h1>
      <div className={styles.searchContainer}>
        <TextField
          variant="outlined"
          placeholder="Search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: <SearchIcon />,
            endAdornment: (
              <IconButton>
                <FilterListIcon />
              </IconButton>
            ),
          }}
        />
      </div>
      <TableContainer component={Paper}>
        <Table>
          <TableBody>
            {chatLogs.map((log) => (
              <TableRow key={log.id}>
                <TableCell>
                  <div className={styles.chatLogEntry}>
                    <div className={styles.userInfo}>
                      <div className={styles.userAvatar}>{log.user.charAt(0)}</div>
                      <div>
                        <h3>{log.user}</h3>
                        <p>{log.date}</p>
                      </div>
                    </div>
                    <div className={styles.chatContent}>
                      <h4>Request</h4>
                      <p>{log.request}</p>
                      <h4>Response</h4>
                      <p>{log.response}</p>
                      <a href="#">View More</a>
                    </div>
                    <div className={styles.userFeedback}>User Feedback</div>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <div className={styles.pagination}>
        <span className='text-black'>1-50 of 150</span>
        <button className='text-black'>&lt;</button>
        <button className='text-black'>&gt;</button>
      </div>
    </div>
  );
};

export default ChatLogTable;