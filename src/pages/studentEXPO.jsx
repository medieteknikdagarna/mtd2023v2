import Header from "../components/Header";
import ExpoCard from "@/components/EXPO-components/ExpoCard";
import Content from "public/content/EXPO-content/expo-projects.json";
import StarsCanvas from "@/components/EXPO-components/StarsCanvas";
import { useTypewriter, Typewriter } from "react-simple-typewriter";
import { useState } from "react";

const StudentEXPO = () => {
  //console.log(Content.sv.uställare[0]);
  const [doneTyping, setDoneTyping] = useState(false);

  const HandleDoneTyping = () => {
    setDoneTyping(true);
    console.log("done");
  };
  const [Text] = useTypewriter({
    words: ["Årets utställare på studentEXPO!"],
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
        <h1>{Text}</h1>
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

export default StudentEXPO;
