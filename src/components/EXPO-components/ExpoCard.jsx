import { motion } from "framer-motion";

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
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 75 },
        visible: { opacity: 1, y: 0 },
      }}
      initial="hidden"
      animate="visible"
      transition={{ duration: 0.3, delay: delay }}
      className="expo-card"
    >
      <h2>{exhibitor.titel}</h2>
      <h3>{exhibitor.name}</h3>
      <span>{exhibitor.beskrivning}</span>
    </motion.div>
  );
};
export default ExpoCard;
