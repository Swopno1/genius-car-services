import React from 'react';

const Service = ({ service }) => {
  const { name, img } = service;
  return (
    <div>
      <img src={img} alt='' />
      <h3>{name}</h3>
    </div>
  );
};

export default Service;
