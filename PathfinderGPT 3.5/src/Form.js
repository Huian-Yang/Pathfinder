// Here we import the react components
import React, { useState } from "react";

function Form() {
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
        const response = await fetch('YOUR_BACKEND_ENDPOINT', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });
        const responseData = await response.json();
        console.log('Submitted successfully:', responseData);
    } catch (error) {
        console.error('Error submitting form:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Major:{" "}
        <input
          type="text"
          name="major"
          placeholder="Please input your Major "
          value={formData.Major}
          onChange={handleChange}
        />
      </label>
      <br />
      <label>
        Year :{" "}
        <select name="School Year" value= {formData.SchoolYear} onChange={handleChange}>
            <option value = ""> Select a Year  </option>
            {SchoolYear.map((year,index) => (
                <option key={index} value ={year}>{year}</option>
            ))}
        </select>
      </label>
      <label>
        Classes:{" "}
        <textarea
          name="classes"
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
          name="internships"
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
          name="extracurriculars"
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
          
          name="clubs"
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
          name="certifications"
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
          type="text"
          name="gpa"
          value={formData.Gpa}
          onChange={handleChange}
        />
      </label>
      <br />
      <button type="submit">Submit</button>
    </form>
  );
}
export default Form;
