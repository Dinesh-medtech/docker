 import React from 'react';
import styles from '@/app/styles/managedocumnents.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faFilter, faUpload, faCommentDots, faEllipsisV } from '@fortawesome/free-solid-svg-icons';

const ManageDocuments: React.FC = () => {
  return (
    <div className={styles.manageDocumentsContainer}>
      <div className={styles.header}>
        <div className={styles.docsHeading}>
        <h1 className= {'mt-2 text-xl text-black'}>Documents</h1>
        <div className={`${styles.searchContainer} ml-5`}>
          <input type="text" placeholder="Search" className={styles.searchInput} />
          <button className={`${styles.filterButton} text-black pr-4 `}>
            <FontAwesomeIcon icon={faFilter} />
          </button>
        </div>
        </div>
        <button className={styles.uploadButton}>
          <FontAwesomeIcon icon={faUpload} className="pr-4 "/> Upload Document
        </button>
      </div>
      <table className={styles.documentsTable} >
        <thead>
          <tr>
            <th>Name</th>
            <th>Publication Date</th>
            <th>Approver</th>
            <th>Approval Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {/* Add your document rows here */}
          <tr>
            <td>Document.docx</td>
            <td>24 Mar 2024</td>
            <td>First Name 1</td>
            <td>Pending</td>
            <td>
              <FontAwesomeIcon className="text-black" icon={faCommentDots} />
              <FontAwesomeIcon className="text-black" icon={faEllipsisV} />
            </td>
          </tr>
          <tr>
            <td>Document1.docx</td>
            <td>24 Mar 2024</td>
            <td>First Name 1</td>
            <td>Pending</td>
            <td>
              <FontAwesomeIcon icon={faCommentDots} />
              <FontAwesomeIcon icon={faEllipsisV} />
            </td>
          </tr>
          <tr>
            <td>Document2.docx</td>
            <td>24 Mar 2024</td>
            <td>First Name 1</td>
            <td>Pending</td>
            <td>
              <FontAwesomeIcon icon={faCommentDots} />
              <FontAwesomeIcon icon={faEllipsisV} />
            </td>
          </tr>
          <tr>
            <td>Document3.docx</td>
            <td>24 Mar 2024</td>
            <td>First Name 1</td>
            <td>Pending</td>
            <td>
              <FontAwesomeIcon icon={faCommentDots} />
              <FontAwesomeIcon icon={faEllipsisV} />
            </td>
          </tr>
          <tr>
            <td>Document4.docx</td>
            <td>24 Mar 2024</td>
            <td>First Name 1</td>
            <td>Pending</td>
            <td>
              <FontAwesomeIcon icon={faCommentDots} />
              <FontAwesomeIcon icon={faEllipsisV} />
            </td>
          </tr>
          <tr>
            <td>Document5.docx</td>
            <td>24 Mar 2024</td>
            <td>First Name 1</td>
            <td>Pending</td>
            <td>
              <FontAwesomeIcon icon={faCommentDots} />
              <FontAwesomeIcon icon={faEllipsisV} />
            </td>
          </tr>
          {/* Repeat for other documents */}
        </tbody>
      </table>
      <div className={styles.pagination}>
        <span className="text-black">1-50 of 150</span>
        <button className={`${styles.paginationButton} text-black`}>Previous</button>
        <button className={`${styles.paginationButton} text-black`}>Next</button>
      </div>
    </div>
  );
};

export default ManageDocuments;