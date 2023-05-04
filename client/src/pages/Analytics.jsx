import { useState, useEffect } from "react";
import "../styles/Analytics.scss";

const skills = ["HTML", "CSS", "JS", "REACT", "PYTHON", "SQL"];

const FrontPage = () => {
  const [users, setUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    fetch('http://localhost:8000/user')
   .then(response => response.json())
   .then(data => console.log(data));
  }, []);

  return (
    <div className="main">
      <div className="content">
        <h1>Testaus</h1>
      </div>
    </div>
  );
};

export default FrontPage;
