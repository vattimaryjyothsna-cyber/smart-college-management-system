import { MessageSquare, Mic } from "lucide-react";

export function Hero() {
  return (
    <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20 px-6">
      <div className="max-w-5xl mx-auto text-center">
        <div className="flex items-center justify-center gap-4 mb-6">
          <MessageSquare className="w-12 h-12" />
          <Mic className="w-12 h-12" />
        </div>
        <h1 className="text-5xl mb-4">Voice and Text-Based NLP Chatbot</h1>
        <p className="text-xl opacity-90 mb-6">
          A Smart Conversational AI System
        </p>
        <p className="text-lg opacity-80">
          College Project | Natural Language Processing
        </p>
      </div>
    </section>
  );
}
