import React, { useEffect, useState } from "react";

const Task = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8001/api/emp")
      .then((response) => response.json())
      .then((data) => {
        if (!data || data.length === 0) {
          alert("No data found");
          return;
        }
        setData(data);
        console.log(data);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <table id="tblSearchData" className="mytable" border="1">
      <thead>
        <tr>
          <th>Id</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Email</th>
          <th>Gender</th>
          <th>Job</th>
          <th>Ip Address</th>
          <th>Age</th>
        </tr>
      </thead>
      <tbody>
        {data.map((ele) => (
          <tr key={ele.id}>
            <td>{ele.id}</td>
            <td>{ele.first_name}</td>
            <td>{ele.last_name}</td>
            <td>{ele.email}</td>
            <td>{ele.gender}</td>
            <td>{ele.job}</td>
            <td>{ele.ip_address}</td>
            <td>{ele.age}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Task;
