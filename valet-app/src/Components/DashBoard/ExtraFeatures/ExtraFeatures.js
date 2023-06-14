import React from "react";
import ExpenseByCategory from "./ExpenseByCategory";
import ManageBudget from "./ManageBudget";
import Overview from "./Overview";
import SavingGoals from "./SavingGoals";
import "../../../Styles/Components/ExtraFeatures.scss";
import { useState } from "react";
import { LuFlipHorizontal } from "react-icons/lu";
import ReactIcons from "../../ReactIcons";
import styled from 'styled-components'
function ExtraFeatures() {
  const [showHoverClass, setShowHoverClass] = useState(false);
  const handleHoverClass = () => {
    setShowHoverClass((prev) => !prev);
  };
  return (
    <>
      <FlipIconStyled >
        <ReactIcons
          styles={{ cursor: "pointer", width: "1.2rem", height: "1.2rem" }}
        >
          <LuFlipHorizontal
            onClick={() => {
              handleHoverClass();
            }}
          />
        </ReactIcons>
      </FlipIconStyled>
      <div
        className={
          !showHoverClass
            ? "extra-features-container flip-container"
            : "extra-features-container flip-container hover"
        }
      >
        <div className="flipper">
          <div className="front">
            <ManageBudget />
            <Overview />
            <SavingGoals />
          </div>
          <div className="category-saving-goals-tracker back">
            <ExpenseByCategory />
          </div>
        </div>
      </div>
    </>
  );
}

const FlipIconStyled = styled.div`
    position: relative;
    top: 0.5rem;
    z-index: 1;
    left: 2rem;
    /* left: 78%; */
    /* right: -44rem; */
`
export default ExtraFeatures;
