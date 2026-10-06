import { FileText } from "lucide-react";

export function Abstract() {
  return (
    <section id="abstract" className="py-16 px-6 bg-white">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-3 mb-6">
          <FileText className="w-8 h-8 text-blue-600" />
          <h2 className="text-4xl">Abstract</h2>
        </div>
        <div className="bg-blue-50 p-8 rounded-lg border-l-4 border-blue-600">
          <p className="text-lg leading-relaxed">
            This project presents a Voice and Text-Based NLP Chatbot that allows users to communicate using both text messages and voice commands. The system accepts user input in text or speech format, processes it using Natural Language Processing techniques to understand the user's intent, generates intelligent and accurate responses based on the context, and delivers the response through both text display and text-to-speech conversion. The chatbot is designed to provide a seamless conversational experience, making human-computer interaction more natural and accessible. It combines speech recognition, natural language understanding, response generation, and speech synthesis to create an interactive AI assistant.
          </p>
        </div>
      </div>
    </section>
  );
}
