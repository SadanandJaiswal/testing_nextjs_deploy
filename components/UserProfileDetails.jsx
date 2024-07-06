// components/UserProfileDetails.js
import React from "react";
import Image from "next/image";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';

const UserProfileDetails = ({ user, totalQuizGiven }) => {
  const { email, username, image, mobile, createdAt } = user;

  const formatDateTime = (dateTimeString) => {
    const date = new Date(dateTimeString);
    
    const optionsDate = { day: '2-digit', month: '2-digit', year: 'numeric' };
    const optionsTime = { hour: '2-digit', minute: '2-digit', hour12: false };
  
    const formattedDate = date.toLocaleDateString('en-GB', optionsDate);
    const formattedTime = date.toLocaleTimeString('en-GB', optionsTime);
  
    return `${formattedDate}, ${formattedTime}`;
  };

  return (
    <div className="w-full  p-8 pt-0">
      <div className="w-full pb-8 flex items-center justify-center text-4xl font-bold text-indigo-600 ">
        My Profile
      </div>



        <div className="w-full flex flex-col">
          <div className="flex w-full">
              <ProfileDetail label={"Email"} value={email}/>
              <ProfileDetail label={"Username"} value={username}/>
          </div>
          <div className="flex w-full">
              <ProfileDetail label={"No of Quiz Taken"} value={totalQuizGiven}/>
              <ProfileDetail label={"Account Created At"} value={formatDateTime(createdAt)}/>
          </div>
        </div>


    </div>
  );
};

export default UserProfileDetails;

const ProfileDetail = ({ label, value, borderColor = 'border-indigo-500' }) => {
  return (
    <div className={`flex justify-between mb-4 mx-4 w-full shadow-lg px-4 py-2 border-l-[6px] ${borderColor} bg-white`}>
      <div className="">
        <label className="block text-lg font-semibold ">
          {label}
        </label>
        <p className="block w-full p-2 bg-transparent">
          {value}
        </p>
      </div>
      <div className=" flex justify-center items-center">
        <button className="text-2xl text-gray-500 hover:text-gray-700">
          <FontAwesomeIcon icon={faEdit} />
        </button>
      </div>
    </div>
  );
};
