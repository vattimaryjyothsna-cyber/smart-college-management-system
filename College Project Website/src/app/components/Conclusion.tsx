import { Award } from "lucide-react";

export function Conclusion() {
  return (
    <section id="conclusion" className="py-16 px-6 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-3 mb-6">
          <Award className="w-8 h-8 text-blue-600" />
          <h2 className="text-4xl">Conclusion</h2>
        </div>
        <div className="bg-white p-8 rounded-lg shadow-lg border-l-4 border-blue-600">
          <p className="text-lg leading-relaxed mb-6">
            The Voice and Text-Based NLP Chatbot project successfully demonstrates the integration of multiple AI technologies to create a practical and user-friendly conversational system. By combining speech recognition, natural language processing, intelligent response generation, and text-to-speech capabilities, we have developed a chatbot that can communicate with users in a natural and accessible way.
          </p>
          <p className="text-lg leading-relaxed mb-6">
            The project has achieved its core objectives of accepting dual-mode input (text and voice), accurately understanding user intent through NLP techniques, generating contextually relevant responses, and delivering output in both text and speech formats. This makes the chatbot versatile and suitable for various real-world applications.
          </p>
          <p className="text-lg leading-relaxed mb-6">
            Through this project, we have gained valuable hands-on experience with NLP concepts, speech technologies, and AI implementation. The chatbot serves as a strong foundation that can be enhanced with additional features and capabilities in the future.
          </p>
          <p className="text-lg leading-relaxed">
            Overall, this project successfully bridges the gap between human communication and computer systems, demonstrating the potential of AI in making technology more accessible and intuitive for everyone.
          </p>
        </div>
      </div>
    </section>
  );
}
