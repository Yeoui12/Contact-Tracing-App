import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AdminLogin  from './Admin/AdminLogin'; 
import AdminHome  from './Admin/AdminHome';
import Form from './Users/Form';

function App() {
  return (
    <Router>
        <Routes>
          <Route path="/" element={<Form />} />
          <Route path="/adminlogin" element={<AdminLogin />} />
          <Route path="/adminhome" element={<AdminHome />} />
        </Routes>
    </Router>
  );
}

export default App;
