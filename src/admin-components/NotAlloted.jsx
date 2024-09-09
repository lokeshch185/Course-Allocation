import React from "react";
import AdminNavBar from "./AdminNavbar";

export default function NotAlloted() {
  const data = [
    { id: 1, name: "John", email: "sanjay@spit.ac.in", class: "SY Comps-A" },
    { id: 2, name: "Jane", email: "sanjay@spit.ac.in", class: "SY Comps-A" },
    { id: 3, name: "Bob", email: "bob@spit.ac.in", class: "SY Comps-A" },
  ];

  return (
    <>
      <AdminNavBar />
      <h4>NotAlloted</h4>
      <table className="notalloted--table">
        <thead>
          <tr>
            <th>SrNo.</th>
            <th>NAME</th>
            <th>EMAIL</th>
            <th>CLASS</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            {data.map((item, i) => (
              <tr key={i}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.email}</td>
                <td>{item.class}</td>
              </tr>
            ))}
          </tr>
        </tbody>
      </table>
    </>
  );
}
