from backend.gpt4_bot import GPT4MentalHealthBot

bot = GPT4MentalHealthBot()

user_input = "I can’t stop checking my phone. I feel anxious without it"
response = bot.get_response(user_input)

print("Bot:", response)
