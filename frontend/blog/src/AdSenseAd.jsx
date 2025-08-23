import { useEffect } from 'react';

const AdSenseAd = () => {
  useEffect(() => {
    if (window) {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    }
  }, []);

  return (
    <ins className="adsbygoogle"
      style={{ display: 'block' }}
      data-ad-client="ca-pub-4279459101747109"
      data-ad-slot="2484494192"
      data-ad-format="auto"
      data-full-width-responsive="true"></ins>
  );
};

export default AdSenseAd;
