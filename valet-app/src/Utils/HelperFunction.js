import variables from "../Styles/base/_base.scss"
import {toast} from 'react-toastify';
import axios from 'axios';

export const checkForEmptyInputs=(obj,type)=>{
   for(let key in obj) {
    if(key.toString()==="profileImage") continue;
    if(type === 'profiledetails' && key.toString() === 'password') continue;
    if(!obj[key]){
      return false;
    }else if(!isNaN(Number(obj[key])) && Number(obj[key]) < 0){
      handleInputError("Amount Value can not be less than 0.")
      return false
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

export async function sendOTPEmail(email, otp) {
  const data = {
    service_id: "service_7wk0yfn",
    template_id:"template_15lzdck",
    user_id:"FI5YeF64rdKWCdP3m",
    template_params: {
      email: email,
      message: `Your OTP for password reset is: ${otp}`,
      reply_to: "valet.expensetracker@gmail.com",
      subject: "Password Reset OTP",
      "g-recaptcha-response": "03AHJ_ASjnLA214KSNKFJAK12sfKASfehbmfd...",
    },
  };
  const response = await axios.post('https://api.emailjs.com/api/v1.0/email/send', data);
  return response;
}


export const checkForSameProfileDetails = (profileDetails,data)=>{
   for(let key in profileDetails){
    if(key.toString() !== 'password'){
      if(profileDetails[key] !== data[key]){
        return false;
      }
    }
   }
   return true;
}