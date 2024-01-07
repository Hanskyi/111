import React from 'react';
import './BtnSpiner.css';

const BtnSpinner = () => {
  return (
    <div className="lds-ring-btn">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};

export default BtnSpinner;