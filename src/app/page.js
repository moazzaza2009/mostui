"use client";
import Image from "next/image";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <div>
      <Image src={"https://ik.imagekit.io/dvjwbf9tt/mostui.png?updatedAt=1753410983685"}  onClick={() => window.location.reload()} className="mostui" width={120} height={120} />
      <a href="/Home">
      <motion.button 
       initial={{ opacity: 0 , transform: 'translate(-50%, 30%)'  }}
      animate={{ opacity: 1 , transform: 'translate(-50%, -50%)' }}
      transition={{ duration: 0.6 , ease: "easeInOut" , delay: 0.1 , easing: [0.6, 0.01, -0.05, 0.9] }}
      
      className="GetStarted">Get Started</motion.button>
      </a>
      <motion.div

      initial={{ opacity: 0 , transform: 'translate(-50%, -10%)'  }}
      animate={{ opacity: 1 , transform: 'translate(-50%, -50%)' }}
      transition={{ duration: 0.7 , ease: "easeInOut" , delay: 0.5 , easing: [0.6, 0.01, -0.05, 0.9] }}
      
      
      style={{ position: 'absolute' , top: '40%', left: '50%', textAlign: 'center'  }}>
       <Image className="splash" src="https://ik.imagekit.io/dvjwbf9tt/splash.png?updatedAt=1750118484123" alt="Picture of the author" width={500} height={500} />
      </motion.div>
    
    </div>
  );
}
