from flask import Flask, render_template, redirect, request, jsonify, make_response
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
CORS(app, support_credentials=True)


     

# Enable auto-reload
app.config["TEMPLATES_AUTO_RELOAD"] = True

# Create our main route in our code, loading our index.html page
@app.route("/roadmap", methods=[ "POST", "OPTIONS"])
# def generate_roadmap():
#     if request.method == "OPTIONS":
#         # Create an appropriate response for the preflight request
#         response = make_response()
#         response.headers.add("Access-Control-Allow-Origin", "http://localhost:3000")
#         response.headers.add("Access-Control-Allow-Headers", "Content-Type,Authorization")
#         response.headers.add("Access-Control-Allow-Methods", "POST, OPTIONS")
#         return response
#     elif request.method == "POST":
#         #Parse the Json payload 
#         data = request.get_json()
#         print(data)
        
#         #check if the data is recived 
#         if not data:
#              return jsonify({"error": "No data received"}), 400
        
#         #Here we get all the data from the form '
#         Career = data.get('Career', 'N/A')
#         Major = data.get('Major', 'N/A')
#         SchoolYear = data.get('SchoolYear', 'N/A')
#         Classes = data.get('Classes', 'N/A')
#         Internship = data.get('Internships', 'N/A')
#         Extracurriculars = data.get('Extracurriculars', 'N/A')
#         Club  = data.get('Clubs', 'N/A')
#         Certifications  = data.get('Certifications', 'N/A')
#         Gpa  = data.get('Gpa', 'N/A')

#         # Handle the POST request
#         prompt = (
#           f"I am a {SchoolYear} student who is interested in studying {Major}, I have taken {Classes} classes throughout my year in school"
#           f"I have also participated in some {Internship} and have done a lot of extracurriculars here are some of them: {Extracurriculars} I"
#           f"have also participated in a lot of activities outside school like {Club}, I have done some studying outside class and have gained some {Certifications} and I currently have a GPA of {Gpa}, I would"
#           f"like you to give me a detailed step by step roadmap to reach my goal, I want to know the articles I should read, the classes I should take"
#           f"the applications or tools I should use, the certifications that I should get and the programs that I should focus on, like fellowships, internships"
#           f"summer with examples. I also want these to be year by year you can start from the year that I am currently in and move to the last year"
#           f"I want to be a {Career} in future"
#           f"Please respond in a JSON format. Do not say anything else, only output JSON. Here is an example of what I want: 
#           {
#     "track": "Software Engineer",
#     "years": [
#       {
#         "year": "Year 1",
#         "categories": [
#           {
#             "categoryName": "Courses",
#             "categoryDescription": "Take Intro to CS, Object Oriented Programming, and Data Structures and Algorithm"
#           },
#           {
#             "categoryName": "Projects",
#             "categoryDescription": "Do simple projects such as personal website or a simple video game"
#           },
#           {
#             "categoryName": "Clubs/Orgs",
#             "categoryDescription": "Join CS related clubs such as ACM and Codepath"
#           }
#         ]
#       },
#       {
#         "year": "Year 2",
#         "categories": [
#           {
#             "categoryName": "Courses",
#             "categoryDescription": "Take Operating Systems and Database Management Systems"
#           },
#           {
#             "categoryName": "Extracurricular",
#             "categoryDescription": "Compete in Hackathons, Research with professors, and contribute to open-source projects"
#           },
#           {
#             "categoryName": "Certification",
#             "categoryDescription": "Get certifications such as AWS Certified Developer and Microsoft: Azure Development Associate"
#           }
#         ]
#       },
#       {
#         "year": "Year 3",
#         "categories": [
#           {
#             "categoryName": "Courses",
#             "categoryDescription": "Take courses such as Computer Architecture and Computer Networking"
#           },
#           {
#             "categoryName": "Internships",
#             "categoryDescription": "Prep your resume, apply for summer internships in the fall semester, network with industry professionals, and attend career fairs"
#           },
#           {
#             "categoryName": "Advice",
#             "categoryDescription": "Practice Leetcode and Advance Data Structure courses"
#           }
#         ]
#       },
#       {
#         "year": "Year 4",
#         "categories": [
#           {
#             "categoryName": "Courses",
#             "categoryDescription": "Take Professional Electives and Senior Project"
#           },
#           {
#             "categoryName": "Grad School",
#             "categoryDescription": "Prepare/apply for masters or PHD program"
#           },
#           {
#             "categoryName": "Startup",
#             "categoryDescription": "If you're interested in starting your own company, look into applying for accelerator programs and competing in pitch competitions"
#           }
#         ]
#       }
#     ]
#   }
#           )

        
#         #Call the function to process the prompt with your AI model Please structure the response as follows: ""Year: The year, Courses: List courses needed to achieve the goal with descriptions of each course , ""Extracurricular: List extracurricular activities needed with the skill that needs to be gotten from the Extracurricular, ""Clubs/Orgs: List relevant clubs and organizations that the user needs to join with the description of each course , ""Internships: Describe necessary internships that the user needs to be take with the description of the internships , ""Certifications: List of certification with the description or the skill that needs t be gotten from .)"
#         response = askAI(prompt)

#         print("AI Response", response)

#         #Return AI reponse as a JSON
#         return jsonify({"response": response})
    
#     else:
#         #For any non -Post request 
#         return jsonify({"error": "Method not allowed "})

def generate_roadmap():
    if request.method == "OPTIONS":
        # Create an appropriate response for the preflight request
        response = make_response()
        response.headers.add("Access-Control-Allow-Origin", "http://localhost:3000")
        response.headers.add("Access-Control-Allow-Headers", "Content-Type,Authorization")
        response.headers.add("Access-Control-Allow-Methods", "POST, OPTIONS")
        return response
    elif request.method == "POST":
        # Parse the JSON payload 
        data = request.get_json()
        print(data)
        
        # Check if the data is received 
        if not data:
             return jsonify({"error": "No data received"}), 400
        
        # Here we get all the data from the form 
        Career = data.get('Career', 'N/A')
        Major = data.get('Major', 'N/A')
        SchoolYear = data.get('SchoolYear', 'N/A')
        Classes = data.get('Classes', 'N/A')
        Internship = data.get('Internships', 'N/A')
        Extracurriculars = data.get('Extracurriculars', 'N/A')
        Club = data.get('Clubs', 'N/A')
        Certifications = data.get('Certifications', 'N/A')
        Gpa = data.get('Gpa', 'N/A')

        # Handle the POST request
        prompt = (
          f"I am a {SchoolYear} student who is interested in studying {Major}, I have taken {Classes} classes throughout my year in school. "
          f"I have also participated in some {Internship} and have done a lot of extracurriculars. Here are some of them: {Extracurriculars}. "
          f"I have also participated in a lot of activities outside school like {Club}. I have done some studying outside class and have gained some {Certifications} and I currently have a GPA of {Gpa}. "
          f"I would like you to give me a detailed step-by-step roadmap to reach my goal. I want to know the articles I should read, the classes I should take, the applications or tools I should use, the certifications that I should get, and the programs that I should focus on, like fellowships, internships, and summer programs with examples. "
          f"I also want these to be year by year. You can start from the year that I am currently in and move to the last year. "
          f"I want to be a {Career} in the future. "
          f"Only provide a RFC8259 compliant JSON response. Do not say anything else. Here is an example of what I want: "
          '{'
          '"track": "Software Engineer",'
          '"years": ['
          '{'
          '"year": "Year 1",'
          '"categories": ['
          '{'
          '"categoryName": "Courses",'
          '"categoryDescription": "Take Intro to CS, Object Oriented Programming, and Data Structures and Algorithms"'
          '},'
          '{'
          '"categoryName": "Projects",'
          '"categoryDescription": "Do simple projects such as a personal website or a simple video game"'
          '},'
          '{'
          '"categoryName": "Clubs/Orgs",'
          '"categoryDescription": "Join CS related clubs such as ACM and Codepath"'
          '}'
          ']'
          '},'
          '{'
          '"year": "Year 2",'
          '"categories": ['
          '{'
          '"categoryName": "Courses",'
          '"categoryDescription": "Take Operating Systems and Database Management Systems"'
          '},'
          '{'
          '"categoryName": "Extracurricular",'
          '"categoryDescription": "Compete in Hackathons, Research with professors, and contribute to open-source projects"'
          '},'
          '{'
          '"categoryName": "Certification",'
          '"categoryDescription": "Get certifications such as AWS Certified Developer and Microsoft: Azure Development Associate"'
          '}'
          ']'
          '},'
          '{'
          '"year": "Year 3",'
          '"categories": ['
          '{'
          '"categoryName": "Courses",'
          '"categoryDescription": "Take courses such as Computer Architecture and Computer Networking"'
          '},'
          '{'
          '"categoryName": "Internships",'
          '"categoryDescription": "Prep your resume, apply for summer internships in the fall semester, network with industry professionals, and attend career fairs"'
          '},'
          '{'
          '"categoryName": "Advice",'
          '"categoryDescription": "Practice Leetcode and Advance Data Structure courses"'
          '}'
          ']'
          '},'
          '{'
          '"year": "Year 4",'
          '"categories": ['
          '{'
          '"categoryName": "Courses",'
          '"categoryDescription": "Take Professional Electives and Senior Project"'
          '},'
          '{'
          '"categoryName": "Grad School",'
          '"categoryDescription": "Prepare/apply for masters or PhD program"'
          '},'
          '{'
          '"categoryName": "Startup",'
          '"categoryDescription": "If you\'re interested in starting your own company, look into applying for accelerator programs and competing in pitch competitions"'
          '}'
          ']'
          '}'
          ']'
          '}'
        )

        # Call the function to process the prompt with your AI model
        response = askAI(prompt)

        print("AI Response", response)

        # Return AI response as a JSON
        return jsonify({"response": response})
    
    else:
        # For any non-POST request 
        return jsonify({"error": "Method not allowed"})

    
@app.route("/FindYourCareer", methods=["GET", "POST"])
def FindyourCareer():
    if not data:
        return jsonify({"error": "No data received"}), 400
    
    #Get the data in json format 
    if request.method == "POST":
        data = request.get_json()
        
        #check if the data is recived 
        
        #Here we get the data from the form 
        Activities = data.get('Activities','N/A')
        Subjects = data.get('Subjects','N/A')
        Classes = data.get('Classes','N/A')
        Extracurriculars = data.get(' Extracurriculars','N/A')
        Clubs = data.get('Clubs','N/A')
        Certifications = data.get('Certifcation','N/A')
        Gpa = data.get('Gpa','N/A')


        #Handle the costume prompt 
        prompt = (f" I am a student in this {Classes}, I like a lot of subjects but these are my most favourite subjects {Subjects}"
                f"I participate in a lot of clubs but the ones i spend most of my time is are in these clubs {Clubs}"
                f"When I am not in clubs or in school doing my classes I take my time doing some hobbies of mine like {Extracurriculars} and some {Activities}"
                f"I do have a some stuff {Certifications} and a gpa of {Gpa}"
                f"I do not know the career that I would go into and I would like you to help me out by giving me a list of careers that I can join or that fites my interests "
                f"I also want you to give a description of how my interest would work with the career")
    
        #Call the function to process the prompt with your AI model 
        response = askAI(prompt)

        print("AI Response", response)

        #Return AI reponse as a JSON
        return jsonify({"response": response})
    
    else:
        #For any non -Post request 
        return jsonify({"error": "Method not allowed "})


def askAI(prompt):
    content = "Pathfinder is a career/counselor  who goes in depth with the topic and activities that you talk about ."
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
                    "content": content
                }
            ],

            temperature = 0
        )
        # Correct way to access the content of the response
        response = completion.choices[0].message.content
        return response
    except Exception as e:
        print("Error occurred: ", str(e))
        return "Error processing your request."
    
if __name__ == '__main__':
    app.run(debug=True, port=5000)

