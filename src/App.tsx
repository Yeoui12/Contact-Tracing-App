import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AdminLogin  from './Admin/AdminLogin'; 
import Form from './Users/Form';

function App() {
  return (
    <Router>
        <Routes>
          <Route path="/" element={<Form />} />
          <Route path="/adminlogin" element={<AdminLogin />} />
        </Routes>
    </Router>
  );
}

export default App;
