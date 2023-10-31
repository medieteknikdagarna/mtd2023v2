import { motion } from "framer-motion";
import ForetagBackdrop from "./Backdrop";
import Image from "next/image";

const dropIn = {
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

const Modal = ({ handleClose, currentComp, imageLink, isLoaded }) => {
  return (
    <ForetagBackdrop onClick={handleClose}>
      <motion.div
        onClick={(e) => e.stopPropagation()}
        className="foretag_modal"
        variants={dropIn}
        initial="hidden"
        animate="visable"
        exit="exit"
      >
        <motion.span
          className="close"
          onClick={handleClose}
          whileHover={{ scale: 1.3 }}
        >
          &times;
        </motion.span>
        {isLoaded && (
          <>
            <div className="foretag_modal_image">
              <Image
                src={imageLink}
                width={250}
                height={250}
                alt="Missing Image"
              />
            </div>

            {currentComp.map((data, index) => {
              return (
                <div className="foretag_modal_info">
                  <h2> {data.data.company}</h2>
                  <span>{data.data.description}</span>
                </div>
              );
            })}
          </>
        )}
      </motion.div>
    </ForetagBackdrop>
  );
};

export default Modal;
