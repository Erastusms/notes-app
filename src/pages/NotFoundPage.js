import React from 'react';

const NotFoundPage = () => {
  return (
    <div className="page-not-found">
      <p>Halaman Tidak Ditemukan</p>
      <img src={'/images/not-found-page.png'} className='page-not-found' alt='not found' />
    </div>
  );
}

export default NotFoundPage;
