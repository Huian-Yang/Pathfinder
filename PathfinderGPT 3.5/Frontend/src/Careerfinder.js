// Here we import the react components
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
function Form() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    Activities: "",
    Subjects: "",
    Classes: "",
    Extracurriculars: "",
    Clubs: "",
    Certifications: "",
    Gpa: "",
  });

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
      const response = await fetch("http://localhost:5000/FindMe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const responseData = await response.json();
      console.log("Submitted successfully:", responseData);
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
        backgroundColor: "#5bc5b8",
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
          <textArea
            type="text"
            name="Activites"
            placeholder="Please input all the activites you like doing"
            value={formData.Activities}
            onChange={handleChange}
            rows="2"
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

        <label style={{ display: "block", margin: "5px 0" }}>
          <textarea
            name="Subjects"
            type="text"
            value={formData.Subjects}
            placeholder="Please input all the subjects that you have interest in "
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
            name="Classes"
            type="text"
            placeholder="Please input all your best or mot interesting classes "
            value={formData.Classes}
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
            placeholder="Please your extracurriculars"
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
            background: "#5bc5b8",
            color: "white",
            padding: "10px 20px",
            border: "none",
            borderRadius: "10px",
            cursor: "pointer",
            marginTop: "5px",
          }}
        >
          Find your career!
        </button>
        <button
            style={{
            color: "#f4c142",
            borderColor: "#f4c142",
            background: "white",
            fontSize: "1.5em",
            borderRadius: "10px",
            padding: "10px 10px",
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
              onClick={() => navigate("/")}
            >
              Back
            </button>
      </form>
    </div>
  );
}
export default Form;
