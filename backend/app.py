from flask import Flask, request, jsonify
from flask_cors import CORS
from gpt4_bot import GPT4MentalHealthBot

app = Flask(__name__)
CORS(app)  # allow requests from React

bot = GPT4MentalHealthBot()

@app.route("/chat", methods=["POST"])
def chat():
    user_input = request.json.get("message", "")
    response = bot.get_response(user_input)
    return jsonify({"response": response})

if __name__ == "__main__":
    app.run(debug=True)
