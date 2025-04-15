import React, { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [searchValue, setSearchValue] = useState("");

  const handleFormSubmit = (value) => {
    setSearchValue(value);
  };


    return (
      <div style={{ fontSize: 40, color: '#010101'  }}>
        <Searchbar onSubmit={handleFormSubmit} />
        <ImageGallery searchValue={searchValue} />
        <ToastContainer autoClose={3000} />
      </div>
    );
  }

  export default App;
