import React, { useEffect } from 'react';

const AdSense = () => {
  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (err) {
      console.error("AdSense error:", err);
    }
  }, []);

  return (
    <div className="my-4 w-100 d-flex justify-content-center overflow-hidden" style={{ minHeight: '100px', background: 'transparent' }}>
      <ins 
        className="adsbygoogle"
        style={{ display: 'block', width: '100%' }}
        data-ad-client="ca-pub-4279459101747109"
        data-ad-slot="5321834773"
        data-ad-format="auto"
        data-full-width-responsive="true"
      ></ins>
    </div>
  );
};

export default AdSense;
