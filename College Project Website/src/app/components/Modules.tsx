import { Package, Mic, Brain, MessageCircle, Volume2 } from "lucide-react";

export function Modules() {
  const modules = [
    {
      icon: Mic,
      title: "Speech Recognition Module",
      description: "Converts user's spoken words into text format using speech-to-text technology. It listens to the microphone input, processes the audio signal, and generates text that can be understood by the NLP engine.",
      color: "blue"
    },
    {
      icon: Brain,
      title: "Natural Language Processing Module",
      description: "The core of the chatbot that processes the text input. It performs tokenization, removes unnecessary words, identifies the intent of the user's message, extracts important entities, and understands the context of the conversation.",
      color: "purple"
    },
    {
      icon: MessageCircle,
      title: "Response Generation Module",
      description: "Generates appropriate responses based on the understood intent and extracted information. It uses predefined templates, retrieval-based methods, or AI models to create relevant and accurate answers to user queries.",
      color: "green"
    },
    {
      icon: Volume2,
      title: "Text-to-Speech Module",
      description: "Converts the generated text response into natural-sounding speech. It uses speech synthesis technology to read out the response, making the interaction more engaging and accessible for users.",
      color: "orange"
    }
  ];

  const colorClasses = {
    blue: "bg-blue-50 border-blue-600",
    purple: "bg-purple-50 border-purple-600",
    green: "bg-green-50 border-green-600",
    orange: "bg-orange-50 border-orange-600"
  };

  const iconColorClasses = {
    blue: "text-blue-600",
    purple: "text-purple-600",
    green: "text-green-600",
    orange: "text-orange-600"
  };

  return (
    <section id="modules" className="py-16 px-6 bg-white">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center gap-3 mb-6">
          <Package className="w-8 h-8 text-blue-600" />
          <h2 className="text-4xl">System Modules</h2>
        </div>
        <p className="text-lg mb-8">
          The chatbot system is divided into four main modules, each responsible for specific functionality:
        </p>
        <div className="grid md:grid-cols-2 gap-6">
          {modules.map((module, index) => {
            const Icon = module.icon;
            return (
              <div
                key={index}
                className={`border-2 rounded-lg p-6 ${colorClasses[module.color as keyof typeof colorClasses]}`}
              >
                <Icon className={`w-10 h-10 mb-4 ${iconColorClasses[module.color as keyof typeof iconColorClasses]}`} />
                <h3 className="text-2xl mb-3">{module.title}</h3>
                <p className="leading-relaxed">{module.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
