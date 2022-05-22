import React, { useState } from "react";
import axios from "axios";
import uuid from "react-uuid";
import Select from 'react-select'

const options = [
  { value: 'text-davinci-002', label: 'text-davinci-002' },
  { value: 'text-curie-001', label: 'text-curie-001' },
  { value: 'text-babbage-001', label: 'text-babbage-001' },
  { value: 'text-ada-001', label: 'text-ada-001' }
]

function PromptForm({ responses, onResponsesChange }) {
  const [prompt, setPrompt] = useState("");
  const [error, setError] = useState("");

  //form async request handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    //show an error for empty submissions

    if (prompt === "") {
      setError(
        'A prompt is required, Try some thing like "Write a poem about the beach"'
      );
      return;
    }

    //compose post data
    const data = {
      prompt: prompt,
      temperature: 0.5,
      max_tokens: 64,
      top_p: 1.0,
      frequency_penalty: 0.0,
      presence_penalty: 0.0,
    };

    //catch and log any request errors
    try {
      //wait for response from API
      const res = await axios.post(
        "https://api.openai.com/v1/engines/text-curie-001/completions",
        data,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.REACT_APP_OPENAI_SECRET}`,
          },
        }
      );

      //Add prompt and response to our responses list
      const response = {
        id: uuid(),
        prompt: prompt,
        responseText: res.data.choices[0].text,
      };
      onResponsesChange([response, ...responses]);
      console.log(responses)
    } catch (err) {
      console.log(err);
    }

    //clear textarea and any errors
    setPrompt("");
    setError("");
  };

  return (
    <form
      className="p-4 bg-white rounded border border-solid border-gray-300 mb-4 shadow"
      onSubmit={(e) => {
        handleSubmit(e);
      }}
    >
        <Select options={options} />
      <textarea
        onChange={(e) => setPrompt(e.target.value)}
        className="form-control
        block
        w-full
        px-3
        py-1.5
        text-base
        font-normal
        text-gray-700
        bg-white bg-clip-padding
        border border-solid border-gray-300
        rounded
        transition
        ease-in-out
        mt-4
        focus:text-gray-700 focus:bg-white focus: border-2 focus:border-blue-600 focus:outline-none
      "
        id="prompt-text"
        rows="5"
        placeholder="Your message"
        value={prompt}
      ></textarea>
      {error && <div className="text-red-500">{error}</div>}
      <button
        className="ml-auto inline-block bg-gradient-to-r from-purple-500 
            to-indigo-500 px-6 py-2.5 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out my-3"
      >
        Submit
      </button>
    </form>
  );
}

export default PromptForm;
