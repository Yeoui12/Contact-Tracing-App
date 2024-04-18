import { useState } from 'react';
import { Attendance } from './Attendance';
import { Register } from './Register';


function Form() {
  const [currentForm, setCurrentForm] = useState('Attendance');
  const toggleForm = (formName:any) => {
    setCurrentForm(formName);
  };

  return (
    <>
        {
        currentForm === 'Attendance' ? <Attendance onFormSwitch={toggleForm} /> : <Register onFormSwitch={toggleForm} />
      } 
    </> 
  );
}

export default Form;
