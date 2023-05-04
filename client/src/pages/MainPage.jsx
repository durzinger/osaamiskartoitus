import { useState, useEffect } from "react";
import "../styles/MainPage.scss";

const skills = [
  "HTML",
  "CSS",
  "Javascript",
  "Python",
  "SQL",
  "React",
  "VUE",
  "Ruby",
  "Typescript",
  "PHP",
  "C++",
  "Java",
  "Design UI/UX",
  "Leadership",
  "CSS Frameworks",
  "MERN/PERN",
  "Scrum",
  "Svelte",
  "Node.JS",
  "GIT/SVN",
];

const initSkills = () => {
  const skill_list = [];
  for (let i = 0; i < skills.length; i++) {
    skill_list.push({ skill: skills[i], grade: 0 });
  }
  return skill_list;
};

const MainPage = () => {
  const [users, setUsers] = useState([{ name: "", skills: [] }]);
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [userskills, setUserskills] = useState([]);

  const fetchUsers = async () => {
    const userlist = [];
    await fetch("http://localhost:8000/user")
      .then((response) => response.json())
      .then((data) =>
        data.forEach((d) => {
          userlist.push(d);
        })
      );
    setUsers(userlist);
  };

  useEffect(() => {
    setUserskills(initSkills());
    fetchUsers();
  }, []);

  const createUser = async () => {
    try {
      await fetch("http://localhost:8000/user", {
        method: "POST",
        headers: {
          "content-type": "application/JSON",
        },
        body: JSON.stringify({ name: name, skills: userskills }),
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="main">
      <div className="content">
        <div className="left-content">
          <div className="name-content">
            {users.map((user, index) => (
              <div className="name-label" key={index}>
                {user.name}
              </div>
            ))}
          </div>
        </div>
        <div className="right-content">
          <div className="matrix">
            <div className="skills-row title">
              <div className="name-label">Käyttäjä</div>
              {skills.map((skill, index) => (
                <div className="skills-label" key={index}>
                  {skill < 7 ? skill : skill.substring(0, 7)}
                </div>
              ))}
            </div>
            {users.map((user, index) => (
              <div className={`skills-row ${index % 2 === 0 ? "even" : ""}`} key={index}>
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
              <div className="modal-field-content">
                <div className="name-password-inputs">
                  <div className="input-field">
                    <input type="text" placeholder="Nimi" value={name} onChange={(e) => setName(e.target.value)} />
                  </div>
                  <div className="input-field">
                    <input type="password" placeholder="Salasana" value={password} onChange={(e) => setPassword(e.target.value)} />
                  </div>
                </div>
                <div className="skills-content">
                  {userskills.map((skill, index) => (
                    <div className="skill-row" key={index}>
                      <div className="skill-label">
                        <label>{skill.skill}</label>
                      </div>
                      <div className="skill-input">
                        <input
                          type="number"
                          min="0"
                          max="5"
                          value={skill.grade}
                          onChange={(e) => {
                            let userskills_copy = JSON.parse(JSON.stringify(userskills));
                            userskills_copy[index].grade = e.target.value;
                            setUserskills(userskills_copy);
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="button-content">
                <button
                  className="modal-button"
                  onClick={() => {
                    createUser();
                    setShowModal(false);
                  }}
                >
                  tallenna
                </button>
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
        </div>
      )}
    </div>
  );
};

export default MainPage;
