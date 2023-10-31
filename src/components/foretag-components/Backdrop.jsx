import { motion } from "framer-motion";

const ForetagBackdrop = ({ children, onClick }) => {
  return (
    <motion.div
      className="foretag_backdrop"
      onClick={onClick}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {children}
    </motion.div>
  );
};
export default ForetagBackdrop;
