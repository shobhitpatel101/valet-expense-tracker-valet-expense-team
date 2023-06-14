import variables from "../Styles/base/_base.scss"
import {toast} from 'react-toastify'
export const checkForEmptyInputs=(obj)=>{
   for(let key in obj) {
    if(!obj[key]){
      return false;
    }
   }
   return true;
}

export const onMouseOver=({target})=>{
    target.style.color ="#333333"
}
export const onMouseOut=({target})=>{
    target.style.color = "#AAAAAA";
}
export const handleResponseSuccess = (data) => {
  if(data.Status && data.type !== "fetched-data"){
    toast.success(data.Message, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  }else if(data.type !== "fetched-data"){
    toast.error(data.Message, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  }
};
export const handleInputError = (msg)=>{
  toast.warn(msg, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
  });
}

export const handleApiError = () => {
  toast.error("Something went wrong!", {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
  });
};


export const checkForSameProfileDetails = (profileDetails,data)=>{
   for(let key in profileDetails){
      if(profileDetails[key] !== data[key]){
        return false;
      }
   }
   return true;
}