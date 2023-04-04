import React, { useEffect, useState } from "react";
import "./studentList.css";
import axios from "axios";

const StudentList = () => {
  const [studentData, setStudentData] = useState([]);
  const [limit, setLimit] = useState(5);
  const [skip, setSkip] = useState(0);
  const [total, setTotal] = useState(0);
  const [pageArray, setPageArray] = useState([]); // for pages 1 ,2  3, 4, 5, 6

  const getAllStudentData = async (myskip) => {
    try {
      const res = await axios.get(
        `http://localhost:3001/student?skip=${myskip}&limit=${limit}`
      );
      setStudentData(res.data.data);
      setTotal(res.data.total);
      let roundTotal = roundDownToMultiple(res.data.total, limit);
      setPageCountArray(roundTotal);
    } catch (err) {
      console.log(err);
    }
  };

  const getDataByPagination = async (e, button) => {
    try {
      let myskip = 0;
      if (button === "next") {
        myskip = skip + limit;
        if (myskip >= total) {
          return;
        }
        setSkip(myskip);
      }
      if (button === "previous") {
        if (skip <= 0) {
          return;
        }
        myskip = skip - limit;
        setSkip(myskip);
      }
      getAllStudentData(myskip);
    } catch (err) {
      console.log(err);
    }
  };

  const getDataByPaginationByPage = async (e, pageNumber) => { // for pages 1 ,2  3, 4, 5, 6
    try {
      let myskip = (pageNumber - 1) * limit;
      getAllStudentData(myskip);
      console.log(pageNumber);
    } catch (err) {
      console.log(err);
    }
  };

  function roundDownToMultiple(number, multiple) { // for pages 1 ,2  3, 4, 5, 6
    if (number % multiple === 0) {
      return number;
    }
    return number - (number % multiple) + multiple;
  }

  function setPageCountArray(count) { // for pages 1 ,2  3, 4, 5, 6
    count = count / limit;
    let countArray = [];
    for (let i = 1; i <= count; i++) {
      countArray.push(i);
    }
    setPageArray(countArray);
  }

  useEffect(() => {
    getAllStudentData(0);
  }, []);

  return (
    <>
      <div>
        <h2>PAGINATION</h2>
        <div className="listbar">
          <h2> Student List Without Pages</h2>
        </div>
        <div className="table-cover">
          <table className="output-table">
            <thead>
              <tr>
                <th>Sr. No.</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
              </tr>
            </thead>
            <tbody>
              {studentData.map(
                (elem, i) =>
                  elem && (
                    <tr key={i}>
                      <td>{i + 1}</td>
                      <td>{elem.name}</td>
                      <td>{elem.email}</td>
                      <td>{elem.phone}</td>
                    </tr>
                  )
              )}
              <tr>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
            </tbody>
          </table>
          <div>
            <div className="pagination_buttons">
              <button
                className="viewButton"
                onClick={(e) => {
                  getDataByPagination(e, "previous");
                }}
              >
                Previous
              </button>
              <button
                className="viewButton"
                onClick={(e) => {
                  getDataByPagination(e, "next");
                }}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
      <br />
      {/* Student List With Pages */}
      <br />
      <div>
        <div className="listbar">
          <h2> Student List With Pages</h2>
        </div>
        <div className="table-cover">
          <table className="output-table">
            <thead>
              <tr>
                <th>Sr. No.</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
              </tr>
            </thead>
            <tbody>
              {studentData.map(
                (elem, i) =>
                  elem && (
                    <tr key={i}>
                      <td>{i + 1}</td>
                      <td>{elem.name}</td>
                      <td>{elem.email}</td>
                      <td>{elem.phone}</td>
                    </tr>
                  )
              )}
              <tr>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
            </tbody>
          </table>
          <div>
            <div className="pagination_buttons_page">
              {pageArray.map((elem, i) => {
                return (
                  <button
                    key={i}
                    className="viewButton_page"
                    onClick={(e) => {
                      getDataByPaginationByPage(e, elem);
                    }}
                  >
                    {elem}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default StudentList;
