import Header from "../components/Header";
import ExpoCard from "@/components/EXPO-components/ExpoCard";
import Content from "public/content/EXPO-content/expo-projects.json";
import StarsCanvas from "@/components/EXPO-components/StarsCanvas";
import { useTypewriter, Cursor, isDone } from "react-simple-typewriter";
import { useState } from "react";

const studentEXPO = () => {
  //console.log(Content.sv.uställare[0]);
  const [doneTyping, setDoneTyping] = useState(false);

  const HandleDoneTyping = () => {
    setDoneTyping(true);
    console.log("done");
  };
  const [text] = useTypewriter({
    words: ["Årets utställare på studentEXPO"],
    onLoopDone: HandleDoneTyping,
  });
  return (
    <>
      <Header
        style={{ backgroundColor: "black" }}
        lightContrast
        changeOnScroll
      />
      <StarsCanvas />
      <div className="expo-title">
        <h1>{text}</h1>
      </div>

      {doneTyping && (
        <>
          <div className="expo-cards-container">
            {Content.sv.uställare.map((utställare, index) => (
              <ExpoCard
                key={utställare}
                index={index}
                exhibitor={utställare}
                delay={index / 5}
              />
            ))}
          </div>
        </>
      )}
    </>
  );
};

export default studentEXPO;
