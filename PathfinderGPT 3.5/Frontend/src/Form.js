// Here we import the react components
import React, { useState } from "react";

function Form() {
  const [aiResponse, setAiResponse] = useState("");
  const [formData, setFormData] = useState({
    Major: "",
    SchoolYear: " ",
    classNamees: "",
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
      console.log("Submitted successfully:", responseData);
      setAiResponse(responseData.response);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
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
      <form
        onSubmit={handleSubmit}
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
          <label style={{ display: "block", margin: "5px 0" }}>
            <input
              type="text"
              name="GPA"
              placeholder="GPA"
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
            />
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
              padding: "10px",
              background: "#e9ecef",
              borderRadius: "5px",
            }}
          >
            <h3>AI Response:</h3>
            <p>{aiResponse}</p>
          </div>
        )}
      </form>
    </div>
  );
}
export default Form;
