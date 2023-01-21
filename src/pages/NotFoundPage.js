import React from 'react';

function NotFoundPage() {
  return (
    <div className="notes-list-empty">
      <p>Halaman Tidak Ditemukan</p>
      <img src={'/images/not-found-page.png'} className='page-not-found' alt='not found' />
    </div>
  );
}

export default NotFoundPage;
