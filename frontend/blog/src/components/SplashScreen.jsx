import Lottie from 'lottie-react';
import splashAnimation from '../animations/splash.json'; 


const SplashScreen = () => {
  return (
    <div className="splash-container">
      <div style={{maxHeight:"100px" , width:"100px"}}>
      <Lottie  animationData={splashAnimation} loop={true} />
      </div>
    </div>
  );
};

export default SplashScreen;