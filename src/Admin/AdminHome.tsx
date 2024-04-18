
import React, {useState} from 'react';
import axios from 'axios';

function AdminHome() {

    const [idNum, setidNum] = useState('');
    const [name, setName] = useState('');
    const [date, setDate] = useState('');
    const [province, setProvince] = useState('');
    const [cityOrTown, setCityOrTown] = useState('');

    const handleSubmit = (e: any) => {
        e.preventDefault();
        const formData = {
        };
        axios
          .post("http://localhost:4502/admin.php", formData)
          .then((response) => {
           
          })
          .catch((error) => {
            
          });
      };

    return (
        <>
        <h2>Contact Tracing Admin</h2>

<form onSubmit={handleSubmit}>

<label>Province</label>
<input value={province} onChange={(e) => setProvince(e.target.value)} type="text" name='province' id='province' placeholder="ex. Cebu"/>

<label>Barangay/City/Town</label>
<input value={cityOrTown} onChange={(e) => setCityOrTown(e.target.value)} type="text" name='cityOrTown' id='cityOrTown' placeholder="ex. Talisay City"/>

<label>ID Number:</label>
<input value={idNum} onChange={(e) => setidNum(e.target.value)} type="number" id="idNum" name="idNum" placeholder="Enter ID Number"/>

<label>Name:</label>
<input value={name} onChange={(e) => setName(e.target.value)} type="text" id="name" name="name" placeholder="Enter Name"/>

<label>Entry Day/Time:</label>
<input value={date} onChange={(e) => setDate(e.target.value)} type="date" id="date" name="date" />

<input type="submit" value="Search" />
</form>
        </>
    );
}

export default AdminHome;