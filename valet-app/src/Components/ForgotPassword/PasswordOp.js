import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { sendOTPEmail } from "../../Utils/HelperFunction";
import { sendForgotPasswordRequest } from "../../Redux/Auth/AuthAction";
import { validateOtp } from "../../Redux/Auth/AuthAction";
import ForgotPassword from "./ForgotPassword";
import OtpVerification from "./OtpVerification";
import ChangePassword from "./ChangePassword";
import { updatePassword } from "../../Redux/Auth/AuthAction";

function PasswordOp() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState("first");
  const [isVerified, setIsVerified] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmedPassword, setConfirmedPassword] = useState("");

  const handleSendOtpEmail = (data) => {
    sendOTPEmail(email, data.data)
      .then(() => {
        setStep("second");
      })
      .catch((err) => {
        // console.log(err);
      });
  };
  const handleSendForgotPasswordRequest = () => {
    dispatch(sendForgotPasswordRequest({ email }, handleSendOtpEmail));
  };

  const handlePasswordResetRequest = () => {
    dispatch(updatePassword({ newPassword: password },(data)=>{
      if(data.Status){
        navigate('/login')
      }
    }));
  };
  const handleOtpVerified = (data) => {
    if (data.Status) {
      setStep("third");
    }
  };

  const handleOtpVerificationRequest = () => {
    dispatch(validateOtp({ otp }, handleOtpVerified));
  };

  return (
    <>
      {step === "first" ? (
        <ForgotPassword
          setEmail={setEmail}
          email={email}
          handleSendForgotPasswordRequest={handleSendForgotPasswordRequest}
        />
      ) : step === "second" ? (
        <OtpVerification
          otp={otp}
          setOtp={setOtp}
          handleOtpVerificationRequest={handleOtpVerificationRequest}
        />
      ) : (
        <ChangePassword
          password={password}
          setPassword={setPassword}
          confirmedPassword={confirmedPassword}
          setConfirmedPassword={setConfirmedPassword}
          handlePasswordResetRequest={handlePasswordResetRequest}
        />
      )}
    </>
  );
}

export default PasswordOp;
