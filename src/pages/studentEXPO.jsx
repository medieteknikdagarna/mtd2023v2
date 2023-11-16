import Header from "../components/Header";
import ExpoCard from "@/components/EXPO-components/ExpoCard";
import Content from "public/content/EXPO-content/expo-projects.json";

const studentEXPO = () => {
  //console.log(Content.sv.uställare[0]);
  return (
    <>
      <Header
        style={{ backgroundColor: "black" }}
        lightContrast
        changeOnScroll
      />
      <div className="expo-title">
        <h1>Årets utställare på StudentEXPO</h1>
      </div>
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
  );
};

export default studentEXPO;
