import { useState, useEffect } from "react";
import "../styles/AnalyticPage.scss";

const AnalyticPage = () => {
  const [users, setUsers] = useState([]);
  const [skills, setSkills] = useState([]);
  const [formattedSkills, setFormattedSkills] = useState([]);

  const fetchUsers = async () => {
    try {
      const userlist = [];
      const res = await fetch("http://localhost:8000/user");
      const data = await res.json();
      data.forEach((user) => {
        userlist.push(user);
      });
      setUsers(userlist);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (users.length > 0) {
      let totalgrades = [];
      let ka = [];
      for (let i = 0; i < users[0].skills.length; i++) {
        totalgrades[i] = 0;
      }
      for (let i = 0; i < users.length; i++) {
        for (let j = 0; j < users[i].skills.length; j++) {
          totalgrades[j] = totalgrades[j] + parseInt(users[i].skills[j].grade);
          ka[j] = { name: users[0].skills[j].skill, total: totalgrades[j] / (i + 1) };
        }
      }
      setSkills(ka);
    }
  }, [users]);

  useEffect(() => {
    if (skills.length > 0) {
      const sorted = skills.sort((a, b) => parseFloat(b.total) - parseFloat(a.total));
      const cutted = sorted.slice(0, 10);
      setFormattedSkills(cutted);
      console.log(cutted);
    }
  }, [skills]);

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="analytic-main">
      <div className="analytic-content">
        <div className="chart-content">
          {formattedSkills.map((skill, index) => {
            let new_total = parseFloat(skill.total) * 100;
            return (
              <div className="chart-row" key={index}>
                <div className="chart-column">
                  <div className="grade">{skill.total.toFixed(2)}</div>
                  <div className="diagram" style={{ height: new_total }} />
                  <div className="name">{skill.name < 7 ? skill.name : skill.name.substring(0, 7)}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default AnalyticPage;
