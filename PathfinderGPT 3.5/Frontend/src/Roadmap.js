// Here we import the react components
import React, { useState } from "react";
import testData from "./testData";
import { useLocation, useNavigate } from "react-router-dom";

function Roadmap() {
  const location = useLocation();

//   const { aiResponse } = location.state || {};

//   if (aiResponse instanceof Object) {
//     console.log("responseData is an instance of Object");
//   }

//   // Check the type of responseData.response
//   if (typeof aiResponse === 'object') {
//     console.log("responseData.response is an object");
//   } else {
//     console.log("responseData.response is not an object");
//   }

//   console.log(aiResponse)
  const navigate = useNavigate();
  const colors = ["#f4c142", "#ec695b", "#5bc5b8", "#f4b6c0"];

//    // If aiResponse or aiResponse.years is undefined, return a loading or error message
//   if (!aiResponse || !aiResponse.years) {
//     return <div>Loading or error... Please ensure data is passed correctly.</div>;
//   }

  return (
    <div
      style={{
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        width: "100vw",
        backgroundColor: "white",
        textAlign: "center",
      }}
    >
      <button
        className="btn"
        style={{
          backgroundColor: "#ec695b",
          border: "none",
          borderRadius: "25px",
          position: "absolute",
          top: "3%",
          left: "2%",
        }}
        onClick={() => navigate("/")}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="white"
          className="w-5 h-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>
      <h1
        style={{
          fontSize: "4em",
          fontFamily: "sans-serif",
          color: "#5bc5b8",
          margin: "0px",
        }}
      >
        {testData.track}
      </h1>
      <h1
        style={{
          fontSize: "2em",
          fontFamily: "sans-serif",
          color: "white",
          backgroundColor: "#ec695b",
          borderRadius: "25px",
          margin: "0% 30%",
        }}
      >
        Track
      </h1>

      <ul
        className="timeline timeline-snap-icon max-md:timeline-compact timeline-vertical"
        style={{ margin: "20px" }}
      >
        {testData.years.map((yearData, yearIndex) => (
          <li key={yearIndex}>
            <hr
              style={{
                border: "2px dotted #a6a6a6",
                backgroundColor: "#a6a6a6",
              }}
            />
            <div className="timeline-middle">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill={colors[yearIndex % colors.length]}
                className="h-5 w-5"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div
              className={`timeline-${
                yearIndex % 2 === 0 ? "start" : "end"
              } mb-10 ${yearIndex % 2 === 0 ? "md:text-end" : ""}`}
            >
              <div
                className="text-lg font-black"
                style={{ color: colors[yearIndex % colors.length] }}
              >
                {yearData.year}
              </div>
              <ul>
                {yearData.categories.map((category, catIndex) => (
                  <li key={catIndex}>
                    <button
                      className="btn"
                      style={{
                        backgroundColor: "white",
                        borderColor: colors[catIndex % colors.length],
                        borderWidth: "2px",
                        borderStyle: "dotted",
                        width: "200px",
                        color: colors[catIndex % colors.length],
                      }}
                      onClick={() =>
                        document
                          .getElementById(`modal_${yearIndex}_${catIndex}`)
                          .showModal()
                      }
                    >
                      {category.categoryName}
                    </button>
                    <dialog
                      id={`modal_${yearIndex}_${catIndex}`}
                      className="modal"
                    >
                      <div
                        className="modal-box"
                        style={{
                          backgroundColor: colors[catIndex % colors.length],
                          color: "white",
                          textAlign: "left",
                        }}
                      >
                        <form method="dialog">
                          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                            ✕
                          </button>
                        </form>
                        <h3 className="font-bold text-lg">
                          {category.categoryName}
                        </h3>
                        <p className="py-4">{category.categoryDescription}</p>
                      </div>
                    </dialog>
                  </li>
                ))}
              </ul>
            </div>
            <hr />
          </li>
        ))}
        <li>
          <hr />
          <div className="timeline-middle">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="#f4c142"
              className="h-8 w-8"
            >
              <path d="M12 .587l3.668 7.429L24 9.264l-6 5.857 1.417 8.263L12 18.904l-7.417 4.48L6 15.121 0 9.264l8.332-1.248z" />
            </svg>
          </div>
        </li>
      </ul>
    </div>
  );
}
export default Roadmap;
