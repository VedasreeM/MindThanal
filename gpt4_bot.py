import os
from openai import OpenAI
from dotenv import load_dotenv

load_dotenv()

class GPT4MentalHealthBot:
    def __init__(self):
        self.client = OpenAI(
            api_key=os.getenv("GROQ_API_KEY"),
            base_url="https://api.groq.com/openai/v1"
        )

        self.system_prompt = """
        You are a compassionate mental health support chatbot. Your role is to:
        1. Provide empathetic, non-judgmental responses
        2. Suggest simple, practical exercises (breathing, journaling, mindfulness)
        3. Identify signs of stress, burnout, or anxiety
        4. Encourage professional help when needed
        5. Always be supportive and understanding

        Guidelines:
        - Keep responses warm and conversational
        - Offer specific, actionable suggestions
        - Ask follow-up questions to understand better
        - Never diagnose or provide medical advice
        - Encourage professional help for serious concerns
        """

    def get_response(self, user_input):
        try:
            response = self.client.chat.completions.create(
                model="llama3-70b-8192",  # Groq's fast free model
                messages=[
                    {"role": "system", "content": self.system_prompt},
                    {"role": "user", "content": user_input}
                ],
                max_tokens=300,
                temperature=0.7
            )
            return response.choices[0].message.content
        except Exception as e:
            return f"❌ Error: {str(e)}"
