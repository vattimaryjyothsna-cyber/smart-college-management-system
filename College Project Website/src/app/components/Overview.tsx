import { BookOpen } from "lucide-react";

export function Overview() {
  return (
    <section id="overview" className="py-16 px-6 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-3 mb-6">
          <BookOpen className="w-8 h-8 text-blue-600" />
          <h2 className="text-4xl">Overview</h2>
        </div>
        <div className="space-y-6">
          <p className="text-lg leading-relaxed">
            The Voice and Text-Based NLP Chatbot is an intelligent conversational agent designed to bridge the gap between humans and computers through natural language interaction. In today's digital world, users expect quick and easy communication with technology, and this chatbot fulfills that need.
          </p>
          <p className="text-lg leading-relaxed">
            The system works in a simple yet powerful way: when a user sends a message (either by typing or speaking), the chatbot receives this input, understands what the user wants using NLP algorithms, searches for or generates the most appropriate response, and then delivers it back to the user in both text and voice format.
          </p>
          <p className="text-lg leading-relaxed">
            This dual-mode communication makes the chatbot accessible to a wider audience, including those who prefer voice interaction over typing, people with visual impairments, or users who are multitasking. The chatbot can be used for various purposes such as customer support, information retrieval, task automation, educational assistance, and general conversation.
          </p>
        </div>
      </div>
    </section>
  );
}
