import React, { useState } from 'react';
import axios from 'axios';
import '../styles/registerstyles.css';
import { IoMail } from "react-icons/io5";
import { FaRegIdCard } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { FaPhoneVolume } from "react-icons/fa6";
import { FaHome } from "react-icons/fa";
import { IoMdCloseCircle } from "react-icons/io";
import { FaCheckCircle } from "react-icons/fa";

export const Register = (props: any) => {
    const [idNum, setidNum] = useState('');
    const [name, setName] = useState('');
    const [contact, setContact] = useState('');
    const [email, setEmail] = useState('');
    const [generateId, setGenerateId] = useState(false);
    const [province, setProvince] = useState('');
    const [cityOrTown, setCityOrTown] = useState('');
    const [text, setText] = useState('');
    const [resDisplay, setResDisplay] = useState(false);
    const [resDisplay2, setResDisplay2] = useState(false);

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        const formData = {
            idNum: idNum,
            name: name,
            address: `${cityOrTown}, ${province}`,
            contact: contact,
            email: email
        };
        try {
            const response = await axios.post('http://localhost:4502/register.php', formData);
            if (response.data[0] === "1") {
                setText("ID Number already exists");
                setResDisplay2(true);
            } else if (response.data[0] === "2") {
                setText("Registered and timed in");
                setResDisplay(true);
            }

            setTimeout(() => {
                setResDisplay(false);
                setResDisplay2(false);
            }, 5000);
        } catch (error) {
            console.error("Error occurred:", error);
        }
    };

    const generateRandomId = () => {
        return Math.floor(10000000 + Math.random() * 90000000).toString();
    };

    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setGenerateId(e.target.checked);
        if (e.target.checked) {
            const randomId = generateRandomId();
            setidNum(randomId);
        } else {
            setidNum('');
        }
    };

    return (
        <div className='whole-register'>
            <form className='form-reg' onSubmit={handleSubmit}>
                <h1>Register</h1>
                <p className='line5'></p>

                <div className='cb-row'>
                    <div className="checkbox-wrapper-8">
                        <input className="tgl tgl-skewed" id="cb3-8" type="checkbox" checked={generateId} onChange={handleCheckboxChange} />
                        <label className="tgl-btn" data-tg-off="No" data-tg-on="Yes" htmlFor="cb3-8"></label>
                    </div>
                    <label>Are you a visitor?</label>
                </div>
                <p className='cb-label'>*Upon confirming, you will be provided with a Visitor ID, please remember this!</p>

                <div className='form-reg-in'>
                    <div className='form-row'>
                        <FaRegIdCard size="1.6em" /><label>&nbsp;&nbsp;ID Number</label>
                        <FaUser size="1.4em" /><label>&nbsp;&nbsp;Complete Name</label>
                    </div>

                    <div className='form-row'>
                        <input className={generateId ? "inputblur" : ""} value={idNum} onChange={(e) => !generateId && setidNum(e.target.value)} type="number" name='idNum' id='idNum' placeholder="xxxxxx" disabled={generateId} required />
                        <input value={name} onChange={(e) => setName(e.target.value)} type="text" name='name' id='name' placeholder="ex. Juan Dela Cruz" required />
                    </div>

                    <div className='form-row'>
                        <MdEmail size="1.6em" /><label>&nbsp;&nbsp;E-mail&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
                        <FaPhoneVolume size="1.5em" /><label>&nbsp;&nbsp;Contact Number</label>
                    </div>

                    <div className='form-row'>
                        <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" name='email' id='email' placeholder="ex. juandelacruz@gmail.com " required />
                        <input value={contact} onChange={(e) => setContact(e.target.value)} type="number" name='contact' id='contact' placeholder="ex. 09xxx" required />
                    </div>

                    <div className='form-row'>
                        <FaHome size="1.6em" /><label>&nbsp;&nbsp;Province&nbsp;&nbsp;&nbsp;</label>
                        <FaHome size="1.6em" /><label>&nbsp;&nbsp;Barangay/City/Town</label>
                    </div>

                    <div className='form-row'>
                        <input value={province} onChange={(e) => setProvince(e.target.value)} type="text" name='province' id='province' placeholder="ex. Cebu" required />
                        <input value={cityOrTown} onChange={(e) => setCityOrTown(e.target.value)} type="text" name='cityOrTown' id='cityOrTown' placeholder="ex. Talisay City" required />
                    </div>

                </div>

                <p className='cb-label2'>*Upon submitting, you will automatically be recorded for time in!</p>
                <button className='regbt' type="submit">Register</button>
                <button className="changebt2" type="button" onClick={() => props.onFormSwitch('Attendance')}>Back to Log-in</button>
            </form>

            {resDisplay && (
                <div className="result-popup3">
                    <div className="result-content2">
                        <div className="icon2"><FaCheckCircle color="rgb(23, 213, 23)" size="1.7em" /></div>
                        <p>{text}</p>
                    </div>
                </div>
            )}
            {resDisplay2 && (
                <div className="result-popup4">
                    <div className="result-content2">
                        <div className="icon2"><IoMdCloseCircle color="red" size="1.7em" /></div>
                        <p>{text}</p>
                    </div>
                </div>
            )}
        </div>
    )
}
