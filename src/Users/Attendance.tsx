import React, { useState, useEffect } from "react";
import axios from "axios";
import '../styles/attendancestyles.css';
import cpe from "../images/cpe.jpg"; 
import id from "./images/id.jpg";
import { FaRegIdCard } from "react-icons/fa";
import { IoMdCloseCircle } from "react-icons/io";
import { FaCheckCircle } from "react-icons/fa";


export const Attendance = (props: any) => {
  const [idNum, setidNum] = useState("");
  const [data, setData] = useState([]);
  const [showVerify, setVerify] = useState(false);
  const [showNone, setNone] = useState(false);
  const [result, setResult] = useState([]);
  const [resDisplay, setResDisplay] = useState(false);
  const [resDisplay2, setResDisplay2] = useState(false);

  const [text, setText] = useState("");

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
        if(response.data[0] == "1"){
          setText("Time in recorded");
          setResDisplay(true);
        }
        else if(response.data[0] == "2"){
          setText("Time out recorded");
          setResDisplay(true);
        }
        else if(response.data[0] == "3"){
          setText("Already logged for today");
          setResDisplay2(true);
        }
        
        setTimeout(() => {
          setResDisplay(false);
          setResDisplay2(false);
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
        <div className="popup-header"><h2>Confirm Details</h2></div>

        <div className="content-container">
        <div className="content-column">

          <div className="line-content">
            <div className="content-row-left">
              <p><b>ID NUMBER</b></p>
            </div>
            <div className="content-row-right">
              <p>:&nbsp;{data[7]}</p>
            </div>
          </div>
          <div className="line-content">
            <div className="content-row-left">
              <p><b>NAME</b></p>
            </div>
            <div className="content-row-right">
              <p>:&nbsp;{data[0]}</p>
            </div>
          </div>
          <div className="line-content">
            <div className="content-row-left">
              <p><b>ADDRESS</b></p>
            </div>
            <div className="content-row-right">
              <p>:&nbsp;{data[1]}</p>
            </div>
          </div>
          <div className="line-content">
            <div className="content-row-left">
              <p><b>CONTACT NUMBER</b></p>
            </div>
            <div className="content-row-right">
              <p>:&nbsp;{data[2]}</p>
            </div>
          </div>
          <div className="line-content">
            <div className="content-row-left">
              <p><b>E-MAIL</b></p>
            </div>
            <div className="content-row-right">
              <p>:&nbsp;{data[3]}</p>
            </div>
          </div>
          <div className="line-content">
            <div className="content-row-left">
              <p><b>LAST LOGGED DATE</b></p>
            </div>
            <div className="content-row-right">
              <p>:&nbsp;{data[4]}</p>
            </div>
          </div>
          <div className="line-content">
            <div className="content-row-left">
              <p><b>TIME IN</b></p>
            </div>
            <div className="content-row-right">
              <p>:&nbsp;{data[5]}</p>
            </div>
          </div>
          <div className="line-content">
            <div className="content-row-left">
              <p><b>TIME OUT</b></p>
            </div>
            <div className="content-row-right">
              <p>:&nbsp;{data[6]}</p>
            </div>
          </div>

        </div>
        </div>

        <div className="button-container">
          <button className="cancelbt" onClick={() => setVerify(false)}>Cancel</button>
          <button className="proceedbt" onClick={handleVerification}>Log Today</button>
        </div>
      </div>
      )}

{resDisplay && (
      <div className="result-popup">
        <div className="result-content">
        <div className="icon"><FaCheckCircle color="rgb(23, 213, 23)" size="1.7em"/></div>
        <p>{text}</p>
        </div>

      </div> 
      )}
      {resDisplay2 && (
      <div className="result-popup2">
        <div className="result-content">
        <div className="icon"><IoMdCloseCircle color="red" size="1.7em"/></div>
        <p>{text}</p>
        </div>

      </div> 
      )}

    </div>
  );
};
