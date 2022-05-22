import React, {useState} from "react";
// import axios from "axios";
import PromptForm from "./components/PromptForm";
import ResponseList from "./components/ResponseList";

function App() {
  const [responses, setResponses] = useState([])

  return (
    <div
      className="min-h-screen min-w-screen bg-orange-50 bg-gradient-to-r from-purple-500 
    to-indigo-500 py-5"
    >
      <div className="container mx-auto px-8 xl:max-w-4xl">
        <h1 className="text-3xl font-bold text-white text-shadow pb-3">
          Fun with AI
        </h1>
        <PromptForm responses={responses} onResponsesChange={setResponses}/>
        <ResponseList responses={responses} />
      </div>
    </div>
  );
}

export default App;
