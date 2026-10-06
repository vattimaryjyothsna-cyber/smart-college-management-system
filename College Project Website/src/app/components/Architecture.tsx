import { Layers } from "lucide-react";

export function Architecture() {
  return (
    <section id="architecture" className="py-16 px-6 bg-gray-50">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center gap-3 mb-6">
          <Layers className="w-8 h-8 text-blue-600" />
          <h2 className="text-4xl">System Architecture</h2>
        </div>
        <p className="text-lg mb-8">
          The chatbot follows a layered architecture with four main components working together:
        </p>
        <div className="bg-white p-8 rounded-lg shadow-lg">
          <div className="space-y-6">
            {/* Input Layer */}
            <div className="border-2 border-blue-600 rounded-lg p-6 bg-blue-50">
              <h3 className="text-2xl mb-3 text-blue-600">1. Input Layer</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded">
                  <p className="mb-2">Text Input Interface</p>
                  <p className="text-sm text-gray-600">User types messages</p>
                </div>
                <div className="bg-white p-4 rounded">
                  <p className="mb-2">Speech Recognition</p>
                  <p className="text-sm text-gray-600">Converts voice to text</p>
                </div>
              </div>
            </div>

            {/* Processing Layer */}
            <div className="border-2 border-purple-600 rounded-lg p-6 bg-purple-50">
              <h3 className="text-2xl mb-3 text-purple-600">2. Processing Layer (NLP Engine)</h3>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-white p-4 rounded">
                  <p className="mb-2">Text Preprocessing</p>
                  <p className="text-sm text-gray-600">Cleaning & normalization</p>
                </div>
                <div className="bg-white p-4 rounded">
                  <p className="mb-2">Intent Recognition</p>
                  <p className="text-sm text-gray-600">Understanding user goal</p>
                </div>
                <div className="bg-white p-4 rounded">
                  <p className="mb-2">Entity Extraction</p>
                  <p className="text-sm text-gray-600">Identifying key information</p>
                </div>
              </div>
            </div>

            {/* Response Layer */}
            <div className="border-2 border-green-600 rounded-lg p-6 bg-green-50">
              <h3 className="text-2xl mb-3 text-green-600">3. Response Generation Layer</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded">
                  <p className="mb-2">Response Selection</p>
                  <p className="text-sm text-gray-600">Choosing best response</p>
                </div>
                <div className="bg-white p-4 rounded">
                  <p className="mb-2">Context Management</p>
                  <p className="text-sm text-gray-600">Maintaining conversation flow</p>
                </div>
              </div>
            </div>

            {/* Output Layer */}
            <div className="border-2 border-orange-600 rounded-lg p-6 bg-orange-50">
              <h3 className="text-2xl mb-3 text-orange-600">4. Output Layer</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded">
                  <p className="mb-2">Text Display</p>
                  <p className="text-sm text-gray-600">Shows response on screen</p>
                </div>
                <div className="bg-white p-4 rounded">
                  <p className="mb-2">Text-to-Speech</p>
                  <p className="text-sm text-gray-600">Converts text to voice</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
