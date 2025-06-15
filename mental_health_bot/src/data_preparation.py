from datasets import load_dataset
import pandas as pd
import json
import os

def prepare_empathetic_dialogues():
    dataset = load_dataset("empathetic_dialogues", trust_remote_code=True)

    training_data = []
    for split in ['train', 'validation']:
        for example in dataset[split]:
            training_data.append({
                'input': example['context'],
                'response': example['utterance'],
                'emotion': 'unknown',  # since the dataset doesn't include this
                'situation': example['prompt']  # 'prompt' represents the situation
            })

    return training_data


def prepare_daily_dialog():
    dataset = load_dataset("daily_dialog", trust_remote_code=True)
    training_data = []
    for split in ['train', 'validation']:
        for example in dataset[split]:
            dialog = example['dialog']
            for i in range(len(dialog) - 1):
                training_data.append({
                    'input': dialog[i],
                    'response': dialog[i + 1],
                    'emotion': 'neutral',
                    'situation': 'daily_conversation'
                })
    return training_data

def create_mental_health_prompts():
    mental_health_data = [
        {
            'input': "I feel overwhelmed with my studies",
            'response': "I understand that feeling overwhelmed with studies can be really stressful. Let's try a simple breathing exercise...",
            'emotion': 'stress',
            'situation': 'academic_pressure'
        },
        {
            'input': "I'm not sleeping well these days",
            'response': "Sleep difficulties can really affect how we feel. Here are some gentle suggestions...",
            'emotion': 'anxiety',
            'situation': 'sleep_issues'
        },
        {
            'input': "I don't feel motivated to go to work",
            'response': "Lack of motivation can be tough to deal with. Let's start small...",
            'emotion': 'depression',
            'situation': 'work_burnout'
        }
    ]
    return mental_health_data

def create_combined_dataset(save_path='../data/combined_training_data.json'):
    empathetic_data = prepare_empathetic_dialogues()
    daily_data = prepare_daily_dialog()
    mental_health_data = create_mental_health_prompts()
    
    all_data = empathetic_data + daily_data + mental_health_data
    os.makedirs(os.path.dirname(save_path), exist_ok=True)
    
    with open(save_path, 'w') as f:
        json.dump(all_data, f, indent=2)
    
    print(f"✅ Combined dataset saved to {save_path}")
    return all_data

# If running directly
if __name__ == "__main__":
    create_combined_dataset()
