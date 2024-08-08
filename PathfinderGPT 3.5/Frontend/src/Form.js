// Here we import the react components
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Form() {
  const navigate = useNavigate();
  const [aiResponse, setAiResponse] = useState("");
  const [formData, setFormData] = useState({
    Career: "",
    Major: "",
    SchoolYear: " ",
    Classes: "",
    Internships: "",
    Extracurriculars: "",
    Clubs: "",
    Certifications: "",
    Gpa: "",
  });

  const SchoolYear = [
    "Middle school ",
    "Higshcool ",
    "First Year ",
    "Second Year ",
    "Third Year ",
    "Fourth Year ",
    "Graduate Student",
  ];
  const gpaRanges = [
    "4.0 - 5.0",
    "3.5 - 4.0",
    "3.0 - 3.5",
    "2.5 - 3.0",
    "2.0 - 2.5",
    "1.5 - 2.0",
    "1.0 - 1.5",
    "0.5 - 1.0",
    "0.0 - 0.5",
  ];

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(formData);
    try {
      const response = await fetch("http://localhost:5000/roadmap", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const responseData = await response.json();
      console.log("Submitted successfully:", responseData.response);
      setAiResponse(responseData.response);

      navigate("/roadmap", { state: { aiResponse: responseData.response } });
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          width: "100vw",
          paddingTop: "40px",
          paddingBottom: "40px",
          backgroundColor: "#f4b6c0",
        }}
      >
        <button
          className="btn"
          style={{
            backgroundColor: "white",
            border: "0px",
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
            stroke="#f4b6c0"
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
        <form
          onSubmit={handleSubmit}
          // onSubmit={() => navigate("/roadmap")}
          style={{
            background: "#f9f9f9",
            border: "0px solid #f4b6c0",
            padding: "20px",
            borderRadius: "25px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            maxWidth: "600px",
            width: "100%",
          }}
        >
          <h2 style={{ textAlign: "center" }}>Student Information</h2>
          <label style={{ display: "block", margin: "10px 0" }}>
            <input
              type="text"
              name="Major"
              placeholder="Major"
              value={formData.Major}
              onChange={handleChange}
              style={{
                background: "white",
                color: "#f4c142",
                width: "100%",
                padding: "10px",
                borderRadius: "10px",
                border: "3px dotted #f4c142",
              }}
            />
          </label>
          <label style={{ display: "block", margin: "10px 0" }}>
            <input
              type="text"
              name="Career"
              placeholder="Career Interest"
              value={formData.Career}
              onChange={handleChange}
              style={{
                background: "white",
                color: "#f4c142",
                width: "100%",
                padding: "10px",
                borderRadius: "10px",
                border: "3px dotted #5bc5b8",
              }}
            />
          </label>

          <div style={{ display: "flex", gap: "10px", margin: "10px 0" }}>
            <label style={{ display: "block", margin: "5px 0", flex: "1" }}>
              <select
                name="SchoolYear"
                value={formData.SchoolYear}
                onChange={handleChange}
                style={{
                  background: "white",
                  color: "black",
                  width: "100%",
                  padding: "10px",
                  borderRadius: "10px",
                  border: "3px dotted #ec695b",
                }}
              >
                <option value="">Year</option>
                {SchoolYear.map((year, index) => (
                  <option key={index} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </label>

            <label style={{ display: "block", margin: "5px 0", flex: "1" }}>
              <select
                name="Gpa"
                value={formData.Gpa}
                onChange={handleChange}
                style={{
                  background: "white",
                  color: "black",
                  width: "100%",
                  padding: "10px",
                  borderRadius: "10px",
                  border: "3px dotted #ec695b",
                }}
              >
                <option value=""> GPA </option>
                {gpaRanges.map((range, index) => (
                  <option key={index} value={range}>
                    {range}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <label style={{ display: "block", margin: "5px 0" }}>
            <textarea
              name="Classes"
              type="text"
              value={formData.Classes}
              placeholder="Please input courses that you have taken"
              onChange={handleChange}
              rows="2"
              style={{
                background: "white",
                color: "black",
                width: "100%",
                padding: "10px",
                borderRadius: "10px",
                border: "3px dotted #5bc5b8",
              }}
            />
          </label>

          <label style={{ display: "block", margin: "5px 0" }}>
            <textarea
              name="Internships"
              type="text"
              placeholder="Please input any internships"
              value={formData.Internships}
              onChange={handleChange}
              rows="2"
              style={{
                background: "white",
                color: "black",
                width: "100%",
                padding: "10px",
                borderRadius: "10px",
                border: "3px dotted #f4b6c0",
              }}
            />
          </label>
          <label style={{ display: "block", margin: "5px 0" }}>
            <textarea
              name="Extracurriculars"
              type="text"
              placeholder="Please input your Extracurriculars or N/A"
              value={formData.Extracurriculars}
              onChange={handleChange}
              rows="2"
              style={{
                background: "white",
                color: "black",
                width: "100%",
                padding: "10px",
                borderRadius: "10px",
                border: "3px dotted #f4c142",
              }}
            />
          </label>
          <label style={{ display: "block", margin: "5px 0" }}>
            <textarea
              name="Clubs"
              type="text"
              placeholder="Please input your Clubs or N/A"
              value={formData.Clubs}
              onChange={handleChange}
              rows="2"
              style={{
                background: "white",
                color: "black",
                width: "100%",
                padding: "10px",
                borderRadius: "10px",
                border: "3px dotted #ec695b",
              }}
            />
          </label>
          <label style={{ display: "block", margin: "5px 0" }}>
            <textarea
              name="Certifications"
              type="text"
              placeholder="Please input your Certifications or N/A"
              value={formData.Certifications}
              onChange={handleChange}
              rows="2"
              style={{
                background: "white",
                color: "black",
                width: "100%",
                padding: "10px",
                borderRadius: "10px",
                border: "3px dotted #5bc5b8",
              }}
            />
          </label>

          <button
            type="submit"
            style={{
              background: "#f4b6c0",
              color: "white",
              padding: "10px 20px",
              border: "none",
              borderRadius: "10px",
              cursor: "pointer",
              marginTop: "5px",
            }}
          >
            Generate Roadmap
          </button>

          {aiResponse && (
            <div
              className="ai-response"
              style={{
                marginTop: "20px",
                padding: "20px",
                backgroundColor: "#f8f9fa",
                border: "1px solid #dee2e6",
                borderRadius: "10px",
                boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
                color: "#212529",
                fontFamily: "'Courier New'",
                lineHeight: "1.5",
                overflowX: "auto",
              }}
            >
              <h3>AI Response:</h3>
              <p>{aiResponse}</p>
            </div>
          )}
        </form>
      </div>
    </>
  );
}
export default Form;
