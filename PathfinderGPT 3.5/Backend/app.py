from flask import Flask, render_template, redirect, request, jsonify
import json
from flask_cors import CORS
from openai import OpenAI
import os
from dotenv import load_dotenv, dotenv_values

# Load environment variables
load_dotenv()

# Access your API key
api_key = os.getenv('OPENAI_API_KEY')

connection = OpenAI(api_key=api_key)

app = Flask(__name__)   
CORS(app)
     

# Enable auto-reload
app.config["TEMPLATES_AUTO_RELOAD"] = True

# Create our main route in our code, loading our index.html page
@app.route("/roadmap", methods=[ "POST"])
def generate_roadmap():
    if request.method == "POST":
        #Parse the Json payload 
        data = request.get_json()
        print(data)
        
        #check if the data is recived 
        if not data:
             return jsonify({"error": "No data received"}), 400
        
        #Here we get all the data from the form '
        Career = data.get('Career', 'N/A')
        Major = data.get('Major', 'N/A')
        SchoolYear = data.get('SchoolYear', 'N/A')
        Classes = data.get('Classes', 'N/A')
        Internship = data.get('Internships', 'N/A')
        Extracurriculars = data.get('Extracurriculars', 'N/A')
        Club  = data.get('Clubs', 'N/A')
        Certifications  = data.get('Certifications', 'N/A')
        Gpa  = data.get('Gpa', 'N/A')

        # Handle the POST request
        prompt = (
          f"I am a {SchoolYear} student who is interested in studying {Major}, I have taken {Classes} classes throughout my year in school"
          f"I have also participated in some {Internship} and have done a lot of extracurriculars here are some of them: {Extracurriculars} I"
          f"have also participated in a lot of activities outside school like {Club}, I have done some studying outside class and have gained some {Certifications} and I currently have a GPA of {Gpa}, I would"
          f"like you to give me a detailed step by step roadmap to reach my goal, I want to know the articles I should read, the classes I should take"
          f"the applications or tools I should use, the certifications that I should get and the programs that I should focus on, like fellowships, internships"
          f"summer with examples. I also want these to be year by year you can start from the year that I am currently in and move to the last year"
          f"I want to be a {Career} in future"
          )

        
        #Call the function to process the prompt with your AI model 
        response = askAI(prompt)

        print("AI Response", response)

        #Return AI reponse as a JSON
        return jsonify({"response": response})
    
    else:
        #For any non -Post request 
        return jsonify({"error": "Method not allowed "})
    
@app.route("/FindYourCareer", methods=["GET", "POST"])
def FindyourCareer():
    #Get the data in json format 
    if request.method == "POST":
        data = request.get_json()
        
        #check if the data is recived 
        if not data:
             return jsonify({"error": "No data received"}), 400
        
    #Here we get the data from the form 
    Activities = data.get('Activities','N/A')
    Subjects = data.get('Subjects','N/A')
    Classes = data.get('Classes','N/A')
    Extracurriculars = data.get(' Extracurriculars','N/A')
    Clubs = data.get('Clubs','N/A')
    Certifications = data.get('Certifcation','N/A')
    Gpa = data.get('Gpa','N/A')


    #Handle the costume prompt 
    prompt = f""

    

          
         
        
        
    #     # Return the result to the template
    #     return render_template("index.html", output=output)
    # else:
    #     # GET method
    #     return render_template("index.html")

def askAI(prompt):
    try:
        completion = connection.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=
            [
                {
                    "role": "user",
                    "content": prompt
                },
                {
                    "role": "system",
                    "content": "Answer the prompt with accuracy and detail and I want you to start and end with the year and let it to be step by step"
                }
            ],
            temperature=0
        )
        # Correct way to access the content of the response
        response = completion.choices[0].message.content
        return response
    except Exception as e:
        print("Error occurred: ", str(e))
        return "Error processing your request."

