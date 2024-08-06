// Here we import the react components
import React, { useState } from "react";

function Form() {
  const [aiResponse, setAiResponse] = useState("");
  const [formData, setFormData] = useState({
    Major: "",
    SchoolYear: " ",
    Classes: "",
    Internships: " ",
    Extracurriculars: "",
    Clubs: " ",
    Certifications: " ",
    Gpa: " ",
  });

  const SchoolYear = [
    "Middle school ",
    "Higshcool ",
    "First Year ", 
    "Second Year ",
    "Third Year ",
    "Fourth Year ",
    "Graduate Student"
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
        const response = await fetch('http://localhost:5000/roadmap', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });
        const responseData = await response.json(); //Converts the reponse body to JSON
        console.log('Submitted successfully:', responseData);
        setAiResponse(responseData.response); 

    } catch (error) 

    {
        console.error('Error submitting form:', error);
    }
  };

  return (
    <div>
    <form onSubmit={handleSubmit}>
      <label>
        Major:{" "}
        <input
          type="text"
          name="Major"
          placeholder="Please input your Major "
          value={formData.Major}
          onChange={handleChange}
        />
      </label>
      <br />
      <label>
        Year :{" "}
        <select name="SchoolYear" value= {formData.SchoolYear} onChange={handleChange}>
            <option value = ""> Select a Year  </option>
            {SchoolYear.map((year,index) => (
                <option key={index} value ={year}>{year}</option>
            ))}
        </select>
      </label>
      <label>
        Classes:{" "}
        <input
          name="Classes"
          type="text"
          value={formData.Classes}
          placeholder="Please input all the classes or courses that you have taken  "
          onChange={handleChange}
          rows="10"
        />
      </label>
      <br />
      <label>
        Internships:{" "}
        <textarea
          name="Internships"
          type="text"
          placeholder="Please input your internship and what you did or N/A"
          value={formData.Internships}
          onChange={handleChange}
          rows = "10"
        />
      </label>
      <br />
      <label>
        Extracurriculars:{" "}
        <textarea
          name="Extracurriculars"
          type="text"
          placeholder="Please input your Extracurriculars or N/A "
          value={formData.Extracurriculars}
          onChange={handleChange}
          rows="10"
        />
      </label>
      <br />
      <label>
        Clubs:{" "}
        <textarea
          
          name="Clubs"
          type="text"
          placeholder="Please input your Clubs or N/A "
          value={formData.Clubs}
          onChange={handleChange}
          rows="10"
        />
      </label>
      <br />
      <label>
        Certifications:{" "}
        <textarea
          name="Certifications"
          type="text"
          placeholder="Please input your certifIcations or N/A "
          value={formData.Certifications}
          onChange={handleChange}
          row = "10"
        />
      </label>
      <br />
      <label>
        GPA:{" "}
        <input
          type="integer"
          name="Gpa"
          placeholder = "Please enter your Money "
          value={formData.Gpa}
          onChange={handleChange}
        />
      </label>
      <br />
      <button type="submit">Submit</button>
    </form>
    {aiResponse && <div className="ai-response">
      <h3>AI Response:</h3>
      <p>{aiResponse}</p>
    </div>}
  </div>
  );
}
export default Form;
