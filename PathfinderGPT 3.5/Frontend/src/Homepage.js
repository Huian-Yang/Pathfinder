import React from "react";
import { useNavigate } from "react-router-dom";
import heroImg from "./heroimg.png";

function Homepage() {
  const navigate = useNavigate();

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        height: "100vh",
        width: "100%",
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          height: "100%",
          width: "50%",
          flex: "1",
          display: "block",
          backgroundImage: `url(${heroImg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      ></div>
      <div
        style={{
          display: "grid",
          height: "100%",
          padding: "1rem",
          width: "50%",
          backgroundColor: "white",
          placeItems: "center",
        }}
      >
        <div className="card-body">
          <h1
            style={{
              fontSize: "5em",
              fontFamily: "sans-serif",
              color: "#5bc5b8",
              margin: "0px",
            }}
          >
            Welcome to
          </h1>
          <h1
            style={{
              fontSize: "5em",
              fontFamily: "sans-serif",
              color: "white",
              backgroundColor: "#ec695b",
              borderRadius: "25px",
              padding: "10px",
            }}
          >
            Pathfinder!
          </h1>

          <p
            style={{
              fontSize: "1.5em",
              fontFamily: "sans-serif",
              margin: "2em",
            }}
          >
            Designed to help students to discover their interests and provide a
            smooth pathway to navigate their career journey effectively.
          </p>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "20px",
            }}
          >
            <button
              style={{
                color: "#f4c142",
                borderColor: "#f4c142",
                background: "white",
                fontSize: "1.5em",
                borderRadius: "25px",
                padding: "50px 10px",
                fontWeight: "bold",
                borderWidth: "10px",
                borderStyle: "dotted",
                fontFamily: "sans-serif",
                lineHeight: "1.5",
                textAlign: "center",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              onClick={() => navigate("/careerfinder")}
            >
              Find your Career
            </button>
            <button
              className="button-upload"
              style={{
                color: "#f4b6c0",
                borderColor: "#f4b6c0",
                background: "white",
                fontSize: "1.5em",
                borderRadius: "25px",
                padding: "50px 10px",
                fontWeight: "bold",
                borderWidth: "10px",
                borderStyle: "dotted",
                fontFamily: "sans-serif",
                lineHeight: "1.5",
                textAlign: "center",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              onClick={() => navigate("/form")}
            >
              Generate Roadmap
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Homepage;
