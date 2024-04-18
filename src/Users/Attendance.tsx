import React, { useState, useEffect } from "react";
import axios from "axios";
import '../styles/attendancestyles.css';
import cpe from "../images/cpe.jpg"; 
import id from "./images/id.jpg";
import { FaRegIdCard } from "react-icons/fa";
import { IoMdCloseCircle } from "react-icons/io";
import { IoMail } from "react-icons/io5";

export const Attendance = (props: any) => {
  const [idNum, setidNum] = useState("");
  const [data, setData] = useState([]);
  const [showVerify, setVerify] = useState(false);
  const [showNone, setNone] = useState(false);
  const [result, setResult] = useState([]);
  const [resDisplay, setResDisplay] = useState(false);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const formData = {
      idNum: idNum,
    };
    axios
      .post("http://localhost:4502/attendance.php", formData)
      .then((response) => {
        if (response.data.error) {
          setNone(true);
          setVerify(false);
        } else {
          setData(response.data);
          setVerify(true);
          setNone(false);
        }
      })
      .catch((error) => {
        setNone(true);
      });
  };

  const handleVerification = (e: any) => {
    setVerify(false);
    e.preventDefault();
    const formData2 = {
        idNum: idNum,
      };
      axios
      .post("http://localhost:4502/record.php", formData2)
      .then((response) => {
        setResult(response.data);
        console.log(response.data);
        setResDisplay(true);
        setTimeout(() => {
          setResDisplay(false);
        }, 5000);
      })
      .catch((error) => {
        setResult(error.data);
      });
      
  };

  return (
    <div>
    <div className={showVerify ? "blur-container" : "whole"}> 
      <form className="form1" onSubmit={handleSubmit}>
        <h1>Sign in / Sign out</h1>
        <p className="line2"></p>
        <div className="inputicon">
        <FaRegIdCard size = '2rem' />
        <input
          value={idNum}
          onChange={(e) => setidNum(e.target.value)}
          type="text"
          name="idNum"
          id="idNum"
          placeholder="Enter ID Number"
          required
        />
        </div>
        <p className="line"></p>
        <p className='cb-label3'>*Upon submitting, automatically signs in for the day and sign out in the next submission. Can only log once a day!</p>

        <button className="submitbt" type="submit">SUBMIT</button>
        <p className="changebtp">Don't have an account? <button className="changebt" type="button" onClick={() => props.onFormSwitch("Register")}>
          Sign-up here.
        </button>
        </p>
      </form>
  

      <div className="imageclass">
        <img alt="heroImg" className="heroimg1" src={cpe} />
      </div>
      {showNone && (
        <div className="failed">
          <p><IoMdCloseCircle color ='red'/> No ID Number found in records!</p>
        </div>
      )}

    

    </div>

      {showVerify && (
        <div className="popup">
        <div className="popupheader">
        <h2>Confirm Details</h2>
        </div>
        <div className="line3"></div>
        <p><b>ID NUMBER&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:</b> {data[7]}</p>
        <p><b>NAME&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:</b> {data[0]}</p>
        <p><b>ADDRESS&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:</b> {data[1]}</p>
        <p><b>CONTACT NUMBER&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:</b> {data[2]}</p>
        <p><b>E-MAIL&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:</b> {data[3]}</p>
        <button className="cancelbt" onClick={() => setVerify(false)}>Cancel</button>
        <button className="proceedbt" onClick={handleVerification}>Proceed</button>
      </div>
      )}

{resDisplay && (
      <div className="result-popup">
        <p><IoMail color="#802cec" size="2em"/></p>
        <div className="result-text">
        <p><b>|</b>&nbsp;&nbsp;&nbsp;{result}</p>
        </div>
      </div> 
      )}

    </div>
  );
};
