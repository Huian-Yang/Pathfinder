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

app.config["TEMPLATES_AUTO_RELOAD"] = True

@app.route("/roadmap", methods=[ "POST", "OPTIONS"])

def generate_roadmap():
    if request.method == "OPTIONS":

        response = make_response()
        response.headers.add("Access-Control-Allow-Origin", "http://localhost:3000")
        response.headers.add("Access-Control-Allow-Headers", "Content-Type,Authorization")
        response.headers.add("Access-Control-Allow-Methods", "POST, OPTIONS")
        return response
    elif request.method == "POST":

        data = request.get_json()
        print(data)

        if not data:
             return jsonify({"error": "No data received"}), 400

        Career = data.get('Career', 'N/A')
        Major = data.get('Major', 'N/A')
        SchoolYear = data.get('SchoolYear', 'N/A')
        Classes = data.get('Classes', 'N/A')
        Internship = data.get('Internships', 'N/A')
        Extracurriculars = data.get('Extracurriculars', 'N/A')
        Club = data.get('Clubs', 'N/A')
        Certifications = data.get('Certifications', 'N/A')
        Gpa = data.get('Gpa', 'N/A')
        formatprompt = '''{
            "track": "Software Engineer",
                "years": [
                {
                    "year": "Year 1",
                    "categories": [
                    {
                        "categoryName": "Courses",
                        "categoryDescription": "Give a list of 4 courses that the student should take with a description of each course eg Course : Description"
                    },
                    {
                        "categoryName": "Projects",
                        "categoryDescription": "Give a list of 3 projects that the student can involve themselves with and also give a good explanation of each project and let it be based on their major or career goal"
                    },
                    {
                        "categoryName": "Clubs/Orgs",
                        "categoryDescription": "Give a list of 5 clubs that the student can join which can help him in his studies, goal, career and also to help create a community for them"
                    }
                    ]
                },
                {
                    "year": "Year 2",
                    "categories": [
                    {
                        "categoryName": "Courses",
                        "categoryDescription": "Give a list of 4 courses that the student should take with a description of each course eg Course : Description "
                    },
                    {
                        "categoryName": "Extracurricular",
                        "categoryDescription": "Give the user a  2 list of good extracurriculars that the user can do and also explain how it would not only help them in developing skills for their career goal but also their major and in life"
                    },
                    {
                        "categoryName": "Certification",
                        "categoryDescription": "Give the user a 4 list of certifications and explain how each one of them will help in reaching their goal and how it will help them in their career"
                    }
                    ]
                },
                {
                    "year": "Year 3",
                    "categories": [
                    {
                        "categoryName": "Courses",
                        "categoryDescription": "Give a list of 4 courses that the student should take with a description of each course eg Course : Description"
                    },
                    {
                        "categoryName": "Internships",
                        "categoryDescription": "If the user does 5 not have any internship experience then give the user ways on how to prepare for their resume, ways to prepare for interviews, and also some internship opportunities in their major and places to search for them, give the user an overview of what to expect and if the user does have internship talk about the internship that they did and also give the user some advice on how to get better and places that they can apply their skills in"
                    },
                    {
                        "categoryName": "Advice",
                        "categoryDescription": "Give advice on what the student should focus on in their current stage in school and also the current stage in their career and how they should work to get there"
                    }
                    ]
                },
                {
                    "year": "Year 4",
                    "categories": [
                    {
                        "categoryName": "Courses",
                        "categoryDescription": "Give a list of 4 courses that the student should take with a description of each course eg Course : Description"
                    },
                    {
                        "categoryName": "Grad School (optional)",
                        "categoryDescription": "Give the student 4 grad school options and also give courses that they can study either in graduate or PhD give example of programs and the University that offers it"
                    },
                    {
                        "categoryName": "Startup (optional)",
                        "categoryDescription": "Give the user an 3 option to make a startup or to be part of one give some examples of startups that are in the user's major and also give ideas on problems that the user can solve"
                    }
                    ]
                }
                ]
            }
            '''

        prompt = (
          f"""I am a {SchoolYear} student who is interested in studying {Major}, I have taken {Classes} classes throughout my year in school. "
          f"I have also participated in some {Internship} and have done a lot of extracurriculars. Here are some of them: {Extracurriculars}. "
          f"I have also participated in a lot of activities outside school like {Club}. I have done some studying outside class and have gained some {Certifications} and I currently have a GPA of {Gpa}. "
          f"I would like you to give me a detailed step-by-step roadmap to reach my goal. I want to know the articles I should read, the classes I should take, the applications or tools I should use, the certifications that I should get, and the programs that I should focus on, like fellowships, internships, and summer programs with examples. "
          f"I also want these to be year by year. You can start from the year that I am currently in and move to the last year. "
          f"I want to be a {Career} in the future. your repsonse must be a RFC8259 JSON response following this format {formatprompt}. There shoud be no beginning message or ending message only in these format """
        )

        response = askAI(prompt)

        return jsonify(response)
    
    else:
        return jsonify({"error": "Method not allowed"})

    
@app.route("/FindYourCareer", methods=["GET", "POST"])
def FindyourCareer():
    if request.method == "OPTIONS":
        response = make_response()
        response.headers.add("Access-Control-Allow-Origin", "http://localhost:3000")
        response.headers.add("Access-Control-Allow-Headers", "Content-Type,Authorization")
        response.headers.add("Access-Control-Allow-Methods", "POST, OPTIONS")
        return response

    elif request.method == "POST":
        data = request.get_json()

        if not data:
            return jsonify({"error": "No data received"}), 400

        Activities = data.get('Activities','N/A')
        Subjects = data.get('Subjects','N/A')
        Classes = data.get('Classes','N/A')
        Extracurriculars = data.get(' Extracurriculars','N/A')
        Clubs = data.get('Clubs','N/A')
        Certifications = data.get('Certifcation','N/A')
        Gpa = data.get('Gpa','N/A')
        
        prompt = (f" I am a student in this {Classes}, I like a lot of subjects but these are my most favourite subjects {Subjects}"
                f"I participate in a lot of clubs but the ones i spend most of my time is are in these clubs {Clubs}"
                f"When I am not in clubs or in school doing my classes I take my time doing some hobbies of mine like {Extracurriculars} and some {Activities}"
                f"I do have a some stuff {Certifications} and a gpa of {Gpa}"
                f"I do not know the career that I would go into and I would like you to help me out by giving me a list of careers that I can join or that fites my interests "
                f"I also want you to give a description of how my interest would work with the career")
    
        response = askAI(prompt)

        return jsonify(response)
    
    else:
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

        response = completion.choices[0].message.content
        return response
    except Exception as e:
        print("Error occurred: ", str(e))
        return "Error processing your request."
    
if __name__ == '__main__':
    app.run(debug=True, port=5000)




