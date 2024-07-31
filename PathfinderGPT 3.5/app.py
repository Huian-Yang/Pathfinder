from flask import Flask, render_template, redirect, request
from openai import OpenAI
from dotenv import load_dotenv, dotenv_values

# Load environment variables
load_dotenv()

connection = OpenAI()

app = Flask(__name__)

# Enable auto-reload
app.config["TEMPLATES_AUTO_RELOAD"] = True

# Create our main route in our code, loading our index.html page
@app.route("/", methods=["GET", "POST"])
def index():
    if request.method == "POST":
        # Handle the POST request
        prompt = request.form.get("prompt")
        if not prompt:
            print("You forgot the prompt!")
            return redirect("/")
        
        # API call to OpenAI
        output = askAI(prompt)
        # print(output)
        
        # Return the result to the template
        return render_template("index.html", output=output)
    else:
        # GET method
        return render_template("index.html")

def askAI(prompt):
        completion = connection.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[
                {
                    "role": "user",
                    "content": prompt
                },
                {
                    "role": "system",
                    "content": "Answer with bro at the end of each sentence"
                }
            ]
        )
        # Correct way to access the content of the response
        response = completion.choices[0].message.content
        return response