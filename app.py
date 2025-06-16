from flask import Flask, request, jsonify
from flask_cors import CORS
from gpt4_bot import GPT4MentalHealthBot
import os

app = Flask(__name__)
CORS(app)

bot = GPT4MentalHealthBot()

@app.route("/chat", methods=["POST"])
def chat():
    user_input = request.json.get("message", "")
    response = bot.get_response(user_input)
    return jsonify({"response": response})
