import { Rocket, Lightbulb } from "lucide-react";

export function FutureScope() {
  const enhancements = [
    {
      title: "Multi-Language Support",
      description: "Add support for multiple languages so users can interact in their preferred language, making the chatbot globally accessible."
    },
    {
      title: "Advanced AI Models",
      description: "Integrate more sophisticated AI models like GPT, BERT, or custom-trained models to improve response quality and handle complex queries."
    },
    {
      title: "Emotion Detection",
      description: "Implement sentiment analysis to detect user emotions and adjust responses accordingly, making interactions more empathetic and personalized."
    },
    {
      title: "Voice Customization",
      description: "Allow users to choose different voice types, accents, and speech speeds for text-to-speech output according to their preferences."
    },
    {
      title: "Integration with External APIs",
      description: "Connect to weather APIs, news services, booking systems, and other third-party services to provide real-time information and perform actions."
    },
    {
      title: "Mobile Application",
      description: "Develop mobile apps for iOS and Android to make the chatbot accessible on smartphones and tablets."
    },
    {
      title: "Conversation History",
      description: "Implement user accounts and save conversation history so users can review past interactions and resume conversations."
    },
    {
      title: "Visual Responses",
      description: "Add the ability to show images, videos, charts, and other visual content in responses to enhance understanding."
    },
    {
      title: "Voice Biometrics",
      description: "Implement voice authentication for secure access and personalized experiences based on individual user voices."
    },
    {
      title: "Continuous Learning",
      description: "Implement machine learning feedback loops so the chatbot learns from user interactions and improves its responses over time."
    },
    {
      title: "Multi-Device Sync",
      description: "Enable users to start conversations on one device and continue on another seamlessly with cloud synchronization."
    },
    {
      title: "Domain-Specific Versions",
      description: "Create specialized versions for healthcare, education, customer service, e-commerce, and other specific industries."
    }
  ];

  return (
    <section id="future-scope" className="py-16 px-6 bg-white">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center gap-3 mb-6">
          <Rocket className="w-8 h-8 text-blue-600" />
          <h2 className="text-4xl">Future Scope</h2>
        </div>
        <p className="text-lg mb-8">
          The chatbot has significant potential for future enhancements and expansions:
        </p>
        <div className="grid md:grid-cols-2 gap-6">
          {enhancements.map((item, index) => (
            <div key={index} className="bg-gradient-to-br from-purple-50 to-blue-50 border border-purple-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-start gap-3">
                <Lightbulb className="w-6 h-6 text-purple-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl mb-2 text-purple-600">{item.title}</h3>
                  <p className="text-gray-700 leading-relaxed">{item.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-10 bg-gradient-to-r from-blue-600 to-purple-600 text-white p-8 rounded-lg text-center">
          <p className="text-xl">
            With these enhancements, the chatbot can evolve into a comprehensive AI assistant capable of serving diverse user needs across multiple platforms and industries.
          </p>
        </div>
      </div>
    </section>
  );
}
