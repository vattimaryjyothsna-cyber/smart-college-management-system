import { Workflow } from "lucide-react";

export function NLPSteps() {
  const steps = [
    {
      step: "1. Text Preprocessing",
      description: "The input text is cleaned and prepared for processing. This includes converting text to lowercase, removing special characters and punctuation, removing extra spaces, and handling contractions (e.g., 'don't' becomes 'do not')."
    },
    {
      step: "2. Tokenization",
      description: "The text is broken down into smaller units called tokens (usually words or phrases). For example, 'What is the weather?' becomes ['What', 'is', 'the', 'weather']."
    },
    {
      step: "3. Stop Words Removal",
      description: "Common words that don't add much meaning (like 'is', 'the', 'a', 'an') are removed to focus on important words. This helps in better understanding the core message."
    },
    {
      step: "4. Lemmatization/Stemming",
      description: "Words are reduced to their base or root form. For example, 'running', 'runs', and 'ran' all become 'run'. This helps the system recognize different forms of the same word."
    },
    {
      step: "5. Intent Recognition",
      description: "The system identifies what the user wants to do or know. For example, is the user asking a question, making a request, or having a casual conversation? This is often done using machine learning classifiers."
    },
    {
      step: "6. Entity Extraction",
      description: "Important pieces of information (entities) are identified from the text, such as names, dates, locations, numbers, etc. For example, in 'Book a flight to Paris on Monday', entities are 'Paris' (location) and 'Monday' (date)."
    },
    {
      step: "7. Context Understanding",
      description: "The system considers the conversation history and context to provide relevant responses. It remembers what was discussed earlier in the conversation to maintain continuity."
    },
    {
      step: "8. Response Selection/Generation",
      description: "Based on the identified intent, entities, and context, the system either selects a pre-written response from a database or generates a new response using AI models to answer the user's query accurately."
    }
  ];

  return (
    <section id="nlp-steps" className="py-16 px-6 bg-gray-50">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center gap-3 mb-6">
          <Workflow className="w-8 h-8 text-blue-600" />
          <h2 className="text-4xl">NLP Processing Steps</h2>
        </div>
        <p className="text-lg mb-8">
          The Natural Language Processing engine follows these steps to understand and process user input:
        </p>
        <div className="space-y-4">
          {steps.map((item, index) => (
            <div key={index} className="bg-white border-l-4 border-blue-600 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
              <h3 className="text-xl mb-3 text-blue-600">{item.step}</h3>
              <p className="leading-relaxed text-gray-700">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
