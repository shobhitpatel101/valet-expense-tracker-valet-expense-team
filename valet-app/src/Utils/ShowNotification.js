import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ShowNotification() {
  const contextClass = {
    success: "green",
    error: "red",
    info: "bg-gray-600",
    warning: "bg-orange-400",
    default: "bg-indigo-600",
    dark: "green",
  };
  return (
    <ToastContainer
    />
  );
}

export default ShowNotification;
