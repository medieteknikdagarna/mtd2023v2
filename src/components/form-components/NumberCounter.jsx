import styles from "@/components/form-components/numberCounter.module.scss";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";

export default function NumberCounter({ register, changeNumber, id, target }) {
  return (
    <div>
      <div className={styles.counterContainer}>
        <div
          className={styles.counterDecrement}
          onClick={() => changeNumber(-1, target)}
        >
          <AiOutlineMinus size={24} style={{ fill: "white" }} />
        </div>
        <div className={styles.counter}>
          <label htmlFor={id} />
          <input
            className={styles.numberInput}
            type="number"
            id={id}
            readOnly
            {...register(id, {
              valueAsNumber: true,
            })}
          />
        </div>
        <div
          className={styles.counterIncrement}
          onClick={() => changeNumber(1, target)}
        >
          <AiOutlinePlus size={24} style={{ fill: "white" }} />
        </div>
      </div>
    </div>
  );
}
