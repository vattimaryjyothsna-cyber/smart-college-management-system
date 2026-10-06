import { GitBranch, ArrowDown } from "lucide-react";

export function Flowchart() {
  return (
    <section id="flowchart" className="py-16 px-6 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-3 mb-6">
          <GitBranch className="w-8 h-8 text-blue-600" />
          <h2 className="text-4xl">System Flowchart</h2>
        </div>
        <p className="text-lg mb-8">
          The following flowchart shows how information flows through the chatbot system:
        </p>
        <div className="bg-white p-8 rounded-lg shadow-lg">
          <div className="flex flex-col items-center gap-4">
            {/* Start */}
            <div className="bg-green-500 text-white px-8 py-4 rounded-full">
              <p>Start</p>
            </div>
            <ArrowDown className="text-gray-400" />

            {/* User Input */}
            <div className="bg-blue-100 border-2 border-blue-600 px-8 py-4 rounded-lg w-full max-w-md text-center">
              <p>User Input (Text or Voice)</p>
            </div>
            <ArrowDown className="text-gray-400" />

            {/* Check Voice */}
            <div className="bg-yellow-100 border-2 border-yellow-600 px-8 py-4 rounded-lg w-full max-w-md text-center">
              <p>Is it Voice Input?</p>
            </div>
            <div className="grid grid-cols-2 gap-8 w-full max-w-md">
              <div className="flex flex-col items-center gap-2">
                <p className="text-sm">Yes</p>
                <ArrowDown className="text-gray-400" />
                <div className="bg-purple-100 border-2 border-purple-600 px-4 py-3 rounded-lg text-center w-full">
                  <p className="text-sm">Speech to Text Conversion</p>
                </div>
              </div>
              <div className="flex flex-col items-center gap-2">
                <p className="text-sm">No</p>
                <ArrowDown className="text-gray-400" />
                <div className="bg-gray-100 border-2 border-gray-400 px-4 py-3 rounded-lg text-center w-full">
                  <p className="text-sm">Use Text Directly</p>
                </div>
              </div>
            </div>
            <ArrowDown className="text-gray-400" />

            {/* Text Preprocessing */}
            <div className="bg-blue-100 border-2 border-blue-600 px-8 py-4 rounded-lg w-full max-w-md text-center">
              <p>Text Preprocessing</p>
            </div>
            <ArrowDown className="text-gray-400" />

            {/* NLP Processing */}
            <div className="bg-purple-100 border-2 border-purple-600 px-8 py-4 rounded-lg w-full max-w-md text-center">
              <p>NLP Processing (Intent & Entity Recognition)</p>
            </div>
            <ArrowDown className="text-gray-400" />

            {/* Response Generation */}
            <div className="bg-green-100 border-2 border-green-600 px-8 py-4 rounded-lg w-full max-w-md text-center">
              <p>Generate Response</p>
            </div>
            <ArrowDown className="text-gray-400" />

            {/* Display Text */}
            <div className="bg-orange-100 border-2 border-orange-600 px-8 py-4 rounded-lg w-full max-w-md text-center">
              <p>Display Response as Text</p>
            </div>
            <ArrowDown className="text-gray-400" />

            {/* Text to Speech */}
            <div className="bg-orange-100 border-2 border-orange-600 px-8 py-4 rounded-lg w-full max-w-md text-center">
              <p>Convert to Speech (Text-to-Speech)</p>
            </div>
            <ArrowDown className="text-gray-400" />

            {/* Output */}
            <div className="bg-blue-100 border-2 border-blue-600 px-8 py-4 rounded-lg w-full max-w-md text-center">
              <p>Deliver Response (Text + Voice)</p>
            </div>
            <ArrowDown className="text-gray-400" />

            {/* End */}
            <div className="bg-red-500 text-white px-8 py-4 rounded-full">
              <p>End</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
