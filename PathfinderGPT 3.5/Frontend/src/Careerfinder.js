// Here we import the react components
import React, { useState } from "react";
function Form() {
  const [formData, setFormData] = useState({
    Activities: "",
    Subjects: " ",
    Classes: "",
    Extracurriculars: "",
    Clubs: " ",
    Certifications: " ",
    Gpa: " ",
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
        const response = await fetch('http://localhost:5000/FindMe', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });
        const responseData = await response.json(); //Converts the reponse body to JSON
        console.log('Submitted successfully:', responseData);

    } catch (error) 

    {
        console.error('Error submitting form:', error);
    }
  };

  return (
    <div>
        <form onsubmit ={handleSubmit}>
            <label>
                Activities:{""}
                <textarea 
                name = "Activities"
                value = {formData.Activities}
                placeholder=" Please input all the activites you like doing"
                onChange={handleChange}
                rows="10"
                />                    
            </label>
            <br/>
            <label>
                Subjects:{""}
                <textarea 
                name = "Subjects"
                value = {formData.Subjects}
                placeholder=" Please input all the subjects that you have interest in "
                onChange={handleChange}
                rows="10"
                />                    
            </label>
            <br/>
            <label>
                Classes:{""}
                <textarea 
                name = "Classes"
                value = {formData.Classes}
                placeholder=" Please input all your best or mot interesting classes "
                onChange={handleChange}
                rows="10"
                />                    
            </label>
            <br/>
            <label>
                Extracurriculars:{""}
                <textarea 
                name = "Extracurriculars"
                value = {formData.Extracurriculars}
                placeholder=" Please input all the extracurricular activities that you are involved in "
                onChange={handleChange}
                rows="10"
                />                    
            </label>
            <br/>
            <label>
                Clubs:{""}
                <textarea 
                name = "Clubs"
                value = {formData.Clubs}
                placeholder=" Please input all the clubs that you are in or that you are interested in  "
                onChange={handleChange}
                rows="10"
                />                    
            </label>
            <br/>
            <label>
                Certifications:{""}
                <textarea 
                name = "Certifications"
                value = {formData.Certifications}
                placeholder=" Please input your certifications if you have some  "
                onChange={handleChange}
                rows="10"
                />                    
            </label>
            <br/>
        </form>
    </div>
  );
}
export default Form ;