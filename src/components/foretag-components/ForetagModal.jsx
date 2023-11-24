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
        {isLoaded ? (
          <motion.div
            variants={{ hidden: { opacity: 0 }, visable: { opacity: 1 } }}
            initial="hidden"
            animate="visable"
            transition={{ duration: 0.25 }}
          >
            <motion.span
              className="close"
              onClick={handleClose}
              whileHover={{ scale: 1.3 }}
            >
              &times;
            </motion.span>
            <div className="foretag_modal_image">
              <Image
                src={imageLink}
                fill
                style={{ objectFit: "scale-down" }}
                alt="Missing Image"
              />
            </div>

            {currentComp.map((data, index) => {
              return (
                <div className="foretag_modal_info" key={index}>
                  <h2> {data.data.company}</h2>
                  {data.data.tjänst.length > 0 ? (
                    <>
                      <div
                        className="foretag_card_offer"
                        style={{ marginBottom: "4vh" }}
                      >
                        {data.data.tjänst.map((item, itemIndex) => (
                          <span className="offer_circle" key={itemIndex}>
                            <p>{item}</p>
                          </span>
                        ))}
                      </div>
                    </>
                  ) : (
                    <></>
                  )}
                  <span>{data.data.description}</span>
                </div>
              );
            })}
          </motion.div>
        ) : (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "20vh",
            }}
          >
            <div class="lds-ring">
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
          </div>
        )}
      </motion.div>
    </ForetagBackdrop>
  );
};

export default Modal;
