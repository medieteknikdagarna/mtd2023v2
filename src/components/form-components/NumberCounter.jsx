import styles from "@/components/form-components/numberCounter.module.scss";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";

export default function NumberCounter(formValue, watch) {
  console.log(formValue, "antal ", watch("antalpåmässa"));
  const changeNumber = (value, target) => {
    const newVal = getValues(formValue) + value;
    if (newVal >= 0) {
      setValue(formValue, newVal, {
        shouldDirty: true,
        shouldValidate: true,
        shouldTouch: true,
      });
    }
  };

  return (
    <div>
      <div className={styles.counterContainer}>
        <div
          className={styles.counterDecrement}
          onClick={() => changeNumber(-1, "fair")}
        >
          <AiOutlineMinus size={24} style={{ fill: "white" }} />
        </div>
        <div className={styles.counter}>
          <label htmlFor="antalpåmässa" />
          <input
            className={styles.numberInput}
            type="number"
            id="antalpåmässa"
            readOnly
            {...register("antalpåmässa", {
              valueAsNumber: true,
            })}
          />
        </div>
        <div
          className={styles.counterIncrement}
          onClick={() => changeNumber(1, "fair")}
        >
          <AiOutlinePlus size={24} style={{ fill: "white" }} />
        </div>
      </div>
    </div>
  );
}
