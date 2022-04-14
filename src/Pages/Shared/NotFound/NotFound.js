import React from 'react';
import sleeping from '../../../images/logo-black.png';

const NotFound = () => {
  return (
    <div className='w-50 mx-auto'>
      <h3 className='text-primary text-center'>Mechanic is sleeping!</h3>
      <h1 className='text-danger text-center'>404</h1>
      <img className='mx-auto' src={sleeping} alt='' />
    </div>
  );
};

export default NotFound;
