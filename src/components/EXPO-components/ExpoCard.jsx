import { motion } from "framer-motion";
import pic from "public/images/members/andreas.webp";
import Image from "next/image";
import { FaRegArrowAltCircleRight } from "react-icons/fa";

const Hover = {
  hidden: { scale: 0, opacity: 0 },
  visable: {
    scale: 1,
    opacity: 1,
    transition: {
      duration: 0.5,
      type: "spring",
      damping: 50,
      stiffness: 500,
    },
  },
  exit: { scale: 0, opacity: 0 },
};

const ExpoCard = ({ exhibitor, delay }) => {
  const imageSrc = `/content/EXPO-content/${exhibitor.bild}`;
  const handleClick = () => {
    const url = exhibitor.link;
    window.open(url, "_blank");
    console.log("open");
  };
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 75 },
        visible: { opacity: 1, y: 0 },
      }}
      initial="hidden"
      animate="visible"
      transition={{ duration: 0.5, delay: delay }}
      className="expo-card"
    >
      <div className="expo-card-picture">
        <Image
          src={imageSrc}
          alt="hej"
          fill
          style={{ objectFit: "scale-down" }}
        />
      </div>
      <div className="expo-card-content">
        <h2>{exhibitor.titel}</h2>
        <h3>{exhibitor.name}</h3>
        <span>{exhibitor.beskrivning}</span>
      </div>
      <div className="expo-card-icon">
        <motion.span whileHover={{ scale: 1.2 }} onClick={handleClick}>
          <FaRegArrowAltCircleRight size={60} fill="white" />
        </motion.span>
      </div>
    </motion.div>
  );
};
export default ExpoCard;
