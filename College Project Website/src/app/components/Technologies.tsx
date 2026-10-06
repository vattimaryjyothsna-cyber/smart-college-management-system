import { Code2 } from "lucide-react";

export function Technologies() {
  const techCategories = [
    {
      category: "Programming Languages",
      items: ["Python", "JavaScript"]
    },
    {
      category: "NLP Libraries & Frameworks",
      items: ["NLTK (Natural Language Toolkit)", "spaCy", "Transformers (Hugging Face)"]
    },
    {
      category: "Speech Recognition",
      items: ["Google Speech Recognition API", "Web Speech API", "SpeechRecognition Library"]
    },
    {
      category: "Text-to-Speech",
      items: ["gTTS (Google Text-to-Speech)", "pyttsx3", "Web Speech Synthesis API"]
    },
    {
      category: "Machine Learning",
      items: ["scikit-learn", "TensorFlow", "PyTorch"]
    },
    {
      category: "Web Development",
      items: ["Flask/Django (Backend)", "HTML, CSS, JavaScript (Frontend)", "React.js (Optional)"]
    },
    {
      category: "Database",
      items: ["SQLite", "MongoDB", "MySQL"]
    },
    {
      category: "Additional Tools",
      items: ["Jupyter Notebook", "VS Code/PyCharm", "Git for version control"]
    }
  ];

  return (
    <section id="technologies" className="py-16 px-6 bg-white">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center gap-3 mb-6">
          <Code2 className="w-8 h-8 text-blue-600" />
          <h2 className="text-4xl">Technologies Used</h2>
        </div>
        <p className="text-lg mb-8">
          The chatbot system uses a combination of modern technologies and libraries:
        </p>
        <div className="grid md:grid-cols-2 gap-6">
          {techCategories.map((tech, index) => (
            <div key={index} className="bg-gradient-to-br from-blue-50 to-purple-50 border border-blue-200 rounded-lg p-6">
              <h3 className="text-xl mb-4 text-blue-600">{tech.category}</h3>
              <ul className="space-y-2">
                {tech.items.map((item, itemIndex) => (
                  <li key={itemIndex} className="flex items-start gap-2">
                    <span className="text-blue-600 mt-1">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
