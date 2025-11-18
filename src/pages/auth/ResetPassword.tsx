import { useState } from "react";
import logo from "../../assets/login/logo.png";
import ResetForm from "../../components/ResetForm";

export default function ResetPassword() {
  const [otpSent, setOtpSent] = useState(false);

  return (
    <div className="w-screen h-screen bg-linear-to-br from-[#3c79e5] to-[#5593FF] flex justify-center items-center">
      <div className="absolute rounded-full aspect-square bg-white w-75 opacity-10 -top-20 -left-20"></div>
      <div className="absolute rounded-full aspect-square bg-white w-75 opacity-10 -bottom-20 -right-20"></div>
      <div className="relative w-[70%] h-[70%] flex">
        <div className="bg-white flex-1 rounded-l-4xl flex justify-center items-center">
          <div className="flex flex-col w-[60%]">
            {otpSent ? <></> : <ResetForm setOtpSent={setOtpSent} />}
          </div>
        </div>
        <div className="bg-linear-to-br from-[#0D57C9] to-[#062B63] flex-1 rounded-r-4xl flex justify-center items-center">
          <img src={logo} alt="logo" />
        </div>
      </div>
    </div>
  );
}
