import { BarChart3, CheckCircle2 } from "lucide-react";

export function Results() {
  const results = [
    {
      title: "Successful Multi-Modal Input",
      description: "The chatbot successfully accepts both text and voice input, providing flexibility to users based on their preference and situation."
    },
    {
      title: "Accurate Intent Recognition",
      description: "The NLP engine accurately identifies user intent with high precision, understanding various ways users phrase their questions and requests."
    },
    {
      title: "Natural Conversation Flow",
      description: "The system maintains context throughout the conversation, making interactions feel natural and coherent rather than disjointed."
    },
    {
      title: "Clear Text and Voice Responses",
      description: "Responses are delivered in both readable text format and natural-sounding speech, enhancing user experience and accessibility."
    },
    {
      title: "Fast Response Time",
      description: "The system processes queries and generates responses quickly, typically within 1-3 seconds, ensuring smooth conversation."
    },
    {
      title: "User-Friendly Interface",
      description: "The interface is intuitive and easy to use, with clear buttons for text and voice input, and a clean chat display."
    },
    {
      title: "Versatile Application",
      description: "The chatbot can handle various types of queries including informational questions, task-based requests, and general conversation."
    },
    {
      title: "Improved Accessibility",
      description: "Voice features make the system accessible to users with visual impairments or those who prefer hands-free interaction."
    }
  ];

  return (
    <section id="results" className="py-16 px-6 bg-white">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center gap-3 mb-6">
          <BarChart3 className="w-8 h-8 text-blue-600" />
          <h2 className="text-4xl">Results and Achievements</h2>
        </div>
        <p className="text-lg mb-8">
          The project has successfully achieved the following results:
        </p>
        <div className="grid md:grid-cols-2 gap-6">
          {results.map((result, index) => (
            <div key={index} className="bg-gradient-to-br from-green-50 to-blue-50 border border-green-200 rounded-lg p-6">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl mb-2">{result.title}</h3>
                  <p className="text-gray-700 leading-relaxed">{result.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-10 bg-blue-600 text-white p-8 rounded-lg">
          <h3 className="text-2xl mb-4">Performance Metrics</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <p className="text-4xl mb-2">~85%</p>
              <p className="opacity-90">Intent Recognition Accuracy</p>
            </div>
            <div className="text-center">
              <p className="text-4xl mb-2">~2s</p>
              <p className="opacity-90">Average Response Time</p>
            </div>
            <div className="text-center">
              <p className="text-4xl mb-2">~90%</p>
              <p className="opacity-90">Speech Recognition Accuracy</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
