import React from "react";
import "../../../Styles/Components/Goals.scss";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { useState, useEffect, useMemo } from "react";
import Button from "@mui/material/Button";
import {
  deleteGoal,
  getGoals,
} from "../../../Redux/DashBoard/Goals/GoalsAction";
import AddGoalPopup from "../../Popups/AddGoalPopup";
import ReactIcons from "../../ReactIcons";
import { MdModeEditOutline } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { muiContainedButtonStyle } from "../../../Styles/MUI/Mui";
import { getGoalById } from "../../../Redux/DashBoard/Goals/GoalsAction";
import ConfirmationDialog from "../../MuiComponents/ConfirmationDialog";
import { deleteTransactionsFromGoal } from "../../../Redux/DashBoard/Goals/GoalsAction";
import { getTransactions } from "../../../Redux/DashBoard/Transactions/TransactionsAction";
import { getExpenseByGoal } from "../../../Redux/DashBoard/Goals/GoalsAction";
function Goals() {
  const { goal } = useSelector((state) => state, shallowEqual) || {};
  const { singleGoal } = useSelector(({ goal }) => goal, shallowEqual) || {};

  const dispatch = useDispatch();
  const goalsData = useMemo(() => getGoalsData(goal), [goal]);
  function getGoalsData(account) {
    if (goal && goal.goals && goal.goals.data) {
      return goal.goals.data;
    }
    return [];
  }
  const [showMore, setShowMore] = useState(goalsData && goalsData.length > 3);
  const [open, setOpen] = useState(false);
  const [isToBeEdited, setIsToBeEdited] = useState(false);

  const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
  const [goalToBeDeleted, setGoalToBeDeleted] = useState("");

  const [selectedGoal, setSelectedGoal] = useState({ goalName: "" });
  const handleClose = () => {
    setOpen(false);
    setIsToBeEdited(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };
  const handleAddGoal = () => {
    setIsToBeEdited(false);
    handleOpen();
  };
  const handleEditGoal = (id) => {
    setIsToBeEdited(true);
    dispatch(getGoalById({ id }));
  };
  const handleShowMore = () => {
    setShowMore((prev) => {
      if (prev) {
        setSelectedGoal(
          goalsData && goalsData.length > 0 ? goalsData[0] : { goalName: "" }
        );
      }
      return !prev;
    });
  };
  const handleSelectAccount = (id) => {
    setSelectedGoal(() => {
      const goal = goalsData.find((el) => el._id === id);
      return goal;
    });
  };

  const handleCloseConfirmationPopup = (id) => {
    setDeleteConfirmationOpen(false);
  };
  const handleDeleteConfirmationOpen = (id) => {
    setDeleteConfirmationOpen(true);
    setGoalToBeDeleted(id);
  };

  const handleGetGoals = () => {
    dispatch(getGoals());
    handleCloseConfirmationPopup();
  };
  const handleConfirmationOfPopup = (id) => {
    dispatch(
      deleteGoal({ id: id }, (data) => {
        dispatch(deleteTransactionsFromGoal({id},(data2)=>{
          dispatch(getTransactions())
          dispatch(getExpenseByGoal())
        }));
        handleGetGoals();
      })
    );
  };

  useEffect(() => {
    if (singleGoal.isFulfilled) {
      handleOpen();
    }
  }, [singleGoal.isFulfilled]);

  useEffect(() => {
    dispatch(getGoals());
  }, []);

  useEffect(() => {
    setSelectedGoal(goalsData && goalsData.length > 0 ? goalsData[0] : "");
  }, [goalsData]);
  return (
    <div className="goals-container">
      <div className="goals-heading-text">
        <h2>GOALS</h2>
      </div>
      {/* <div className="goals-selected-text">
        <h4>
          <span>{selectedGoal.goalName}</span>
        </h4>
      </div> */}
      {goalsData && goalsData.length > 0 ? (
        <div className="goals-list-cont">
          <ul
            className={
              !showMore ? "goal-ulist-unscrollable" : "goal-ulist-scrollable"
            }
          >
            {goalsData.map((goal, index) => {
              return (
                <li
                  key={uuidv4()}
                  className={
                    (!showMore && index < 3) || showMore
                      ? "goal-op-det-visible"
                      : "goal-op-det-hidden"
                  }
                >
                  <p
                    // onClick={() => {
                    //   handleSelectAccount(goal._id);
                    // }}
                    className="selected-goal-color"
                  >
                    {goal.goalName}
                  </p>
                  <div>
                    <ReactIcons styles={{ cursor: "pointer", color: "#33333" }}>
                      <MdModeEditOutline
                        onClick={() => {
                          handleEditGoal(goal._id);
                        }}
                      />
                    </ReactIcons>
                    <ReactIcons styles={{ cursor: "pointer", color: "#33333" }}>
                      <MdDelete
                        onClick={() => {
                          handleDeleteConfirmationOpen(goal._id);
                        }}
                      />
                    </ReactIcons>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      ) : (
        <div className="no-goals-found">
          <p>No Goals Found</p>
        </div>
      )}

      <div className="show-more-text-cont">
        {goalsData.length && goalsData.length > 3 ? (
          <p>
            <span onClick={handleShowMore}>
              {showMore ? "Show Less" : "Show More"}
            </span>
          </p>
        ) : null}
      </div>
      <div className="add-goal-btn-cont">
        <Button
          onClick={handleAddGoal}
          style={{ ...muiContainedButtonStyle,color:"#fff",width:"8rem" }}
        >
          Add Goal
        </Button>
      </div>
      <AddGoalPopup
        isToBeEdited={isToBeEdited}
        open={open}
        handleClose={handleClose}
      />
      <ConfirmationDialog
        open={deleteConfirmationOpen}
        handleYes={() => handleConfirmationOfPopup(goalToBeDeleted)}
        description={"Are you sure you want to delete this goal? You will lose all transactions related to this goal."}
        handleClose={handleCloseConfirmationPopup}
      />
    </div>
  );
}

export default Goals;
