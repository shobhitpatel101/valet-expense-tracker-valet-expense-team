import React from "react";
import "../../../Styles/Components/Categories.scss";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { useState, useEffect, useMemo } from "react";
import Button from "@mui/material/Button";
import { getCategories } from "../../../Redux/DashBoard/Category/CategoryAction";
import CategoryPopup from "../../Popups/CategoryPopup";
import ReactIcons from "../../ReactIcons";
import { MdModeEditOutline } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { muiContainedButtonStyle } from "../../../Styles/MUI/Mui";
import { getCategoryById } from "../../../Redux/DashBoard/Category/CategoryAction";
import ConfirmationDialog from "../../MuiComponents/ConfirmationDialog";
import { deleteCategory } from "../../../Redux/DashBoard/Category/CategoryAction";
import { deleteTransactionsFromCategory } from "../../../Redux/DashBoard/Category/CategoryAction";
import { getTransactions } from "../../../Redux/DashBoard/Transactions/TransactionsAction";
import { getExpenseByCategory } from "../../../Redux/DashBoard/Category/CategoryAction";
function Categories() {
  const { category } = useSelector((state) => state, shallowEqual) || {};
  const { singleCategory } =
    useSelector(({ category }) => category, shallowEqual) || {};
  const dispatch = useDispatch();
  //   const categoryData = category?.categories?.data?.data || [];
  const categoriesData = useMemo(() => getCategoriesData(category), [category]);
  function getCategoriesData(category) {
    if (category && category.categories && category.categories) {
      return category.categories.data;
    }
    return [];
  }
  const [showMore, setShowMore] = useState(
    categoriesData && categoriesData.length > 3
  );
  const [open, setOpen] = useState(false);
  const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
  const [categoryIdToBeDeleted, setCategoryIdToBeDeleted] = useState("");
  const [selectedCategory, setSelectedCategory] = useState({
    categoryName: "",
  });
  const [isToBeEdited, setIsToBeEdited] = useState(false);

  const handleEditCategory = (id) => {
    setIsToBeEdited(true);
    dispatch(getCategoryById({ id }));
  };
  const handleClose = () => {
    setOpen(false);
    setIsToBeEdited(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };
  const handleAddCategoryOpen = () => {
    setIsToBeEdited(false);
    handleOpen();
  };
  const handleShowMore = () => {
    setShowMore((prev) => {
      if (prev) {
        setSelectedCategory(
          categoriesData && categoriesData.length > 0
            ? categoriesData[0]
            : { categoryName: "" }
        );
      }
      return !prev;
    });
  };

  const handleCloseConfirmationPopup = (id) => {
    setDeleteConfirmationOpen(false);
  };
  const handleDeleteConfirmationOpen = (id) => {
    setDeleteConfirmationOpen(true);
    setCategoryIdToBeDeleted(id);
  };

  const handleGetCategories = () => {
    dispatch(getCategories());
    handleCloseConfirmationPopup();
  };
  const handleConfirmationOfPopup = (id) => {
    dispatch(
      deleteCategory({ id: id }, (data) => {
        dispatch(deleteTransactionsFromCategory({id},(data2)=>{
          dispatch(getTransactions())
          dispatch(getExpenseByCategory())
        }));
        handleGetCategories();
      })
    );
  };
  useEffect(() => {
    if (singleCategory.isFulfilled) {
      handleOpen();
    }
  }, [singleCategory.isFulfilled]);

  useEffect(() => {
    dispatch(getCategories());
  }, []);

  useEffect(() => {
    setSelectedCategory(
      categoriesData && categoriesData.length > 0 ? categoriesData[0] : ""
    );
  }, [categoriesData]);
  return (
    <div className="categories-container">
      <div className="categories-heading-text">
        <h2>CATEGORIES</h2>
      </div>
      {/* <div className="categories-selected-text">
        <h4>
          <span>{selectedCategory.categoryName}</span>
        </h4>
      </div> */}
      {categoriesData && categoriesData.length > 0 ? (
        <div className="categories-list-cont">
          <ul
            className={
              !showMore
                ? "category-ulist-unscrollable"
                : "category-ulist-scrollable"
            }
          >
            {categoriesData.map((category, index) => {
              return (
                <li
                  key={uuidv4()}
                  className={
                    (!showMore && index < 3) || showMore
                      ? "category-op-det-visible"
                      : "category-op-det-hidden"
                  }
                >
                  <p
                    // onClick={() => {
                    //     handleSelectCategory(category._id);
                    // }}
                    className="selected-category-color"
                  >
                    {category.categoryName}
                  </p>
                  <div>
                    <ReactIcons styles={{ cursor: "pointer", color: "#33333" }}>
                      <MdModeEditOutline
                        onClick={() => {
                          handleEditCategory(category._id);
                        }}
                      />
                    </ReactIcons>
                    <ReactIcons styles={{ cursor: "pointer", color: "#33333" }}>
                      <MdDelete
                        onClick={() => {
                          handleDeleteConfirmationOpen(category._id);
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
        <div className="no-categories-found">
          <p>No Categories Found</p>
        </div>
      )}

      <div className="show-more-text-cont">
        {categoriesData.length && categoriesData.length > 3 ? (
          <p>
            <span onClick={handleShowMore}>
              {showMore ? "Show Less" : "Show More"}
            </span>
          </p>
        ) : null}
      </div>
      <div className="add-category-btn-cont">
        <Button
          onClick={handleAddCategoryOpen}
          style={{ ...muiContainedButtonStyle,color:"#fff" ,width:"8rem"}}
        >
          Add Category
        </Button>
      </div>
      <CategoryPopup
        open={open}
        isToBeEdited={isToBeEdited}
        handleClose={handleClose}
      />
      <ConfirmationDialog
        open={deleteConfirmationOpen}
        handleYes={() => handleConfirmationOfPopup(categoryIdToBeDeleted)}
        description={"Are you sure you want to delete this category? You will lose all transactions related to this category."}
        handleClose={handleCloseConfirmationPopup}
      />
    </div>
  );
}

export default Categories;
