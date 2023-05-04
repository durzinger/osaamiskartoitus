import { useState, useEffect } from "react";
import usermock from "./usermocking.json";
import "./App.scss";

const skills = ["HTML", "CSS", "JS", "REACT", "PYTHON", "SQL"];

const App = () => {
  const [users, setUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    setUsers(usermock);
  }, []);

  return (
    <div className="main">
      <div className="content">
        <div className="left-content">
          <div className="name-content">
            {users.map((user) => (
              <div className="name-label">{user.name}</div>
            ))}
          </div>
        </div>
        <div className="right-content">
          <div className="matrix">
            <div className="skills-row title">
              <div className="name-label">Käyttäjä</div>
              {skills.map((skill) => (
                <div className="skills-label">{skill}</div>
              ))}
            </div>
            {users.map((user, index) => (
              <div className={`skills-row ${index % 2 === 0 && "even"}`} key={index}>
                <div className="name-label">{user.name}</div>
                {user.skills.map((skill, index) => (
                  <div className="skills-label" key={index}>
                    {skill.grade}
                  </div>
                ))}
              </div>
            ))}
          </div>
          <div className="button-container">
            <button onClick={() => setShowModal(true)}>Lisää käyttäjä</button>
          </div>
        </div>
      </div>
      {showModal && (
        <div className="modal transparent-background">
          <div className="modal">
            <div className="modal-container">
              <button
                className="modal-button"
                onClick={() => {
                  setShowModal(false);
                }}
              >
                Sulje
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
