import React from 'react'

function Response({prompt, responseText}) {
  return (
    <div className="rounded mb-4 border p-3 border-solid border-b-slate-100 text-gray-700">
      <div className="flex flex-col mb-4 md:flex-row">
        <div className="font-bold  text-indigo-600 md:w-3/12">Prompt:</div>
        <div className="md:w-9/12">{prompt}</div>
      </div>
      <div className="flex flex-col md:flex-row">
        <div className="font-bold  text-indigo-600 md:w-3/12">Response:</div>
        <div className="md:w-9/12">{responseText}</div>
      </div>
    </div>
  )
}

export default Response