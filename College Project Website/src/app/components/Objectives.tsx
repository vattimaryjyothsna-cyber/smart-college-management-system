import { Target, CheckCircle } from "lucide-react";

export function Objectives() {
  const objectives = [
    "To develop a chatbot that accepts both text and voice input from users",
    "To implement Natural Language Processing techniques for understanding user intent",
    "To process and analyze user queries accurately using NLP algorithms",
    "To generate intelligent and contextually relevant responses",
    "To provide responses in both text format and speech output using text-to-speech",
    "To create a user-friendly interface for seamless interaction",
    "To improve accessibility by supporting voice-based communication",
    "To demonstrate the practical application of NLP and AI technologies",
    "To build a scalable system that can be extended with more features in the future"
  ];

  return (
    <section id="objectives" className="py-16 px-6 bg-white">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-3 mb-6">
          <Target className="w-8 h-8 text-blue-600" />
          <h2 className="text-4xl">Objectives</h2>
        </div>
        <div className="grid gap-4">
          {objectives.map((objective, index) => (
            <div key={index} className="flex items-start gap-3 bg-blue-50 p-4 rounded-lg">
              <CheckCircle className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
              <p className="text-lg">{objective}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
