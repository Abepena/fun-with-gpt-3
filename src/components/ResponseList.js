import React from "react";
import Response from "./Response";

function ResponseList({ responses }) {
  return (
    <div className="bg-white rounded shadow p-4">
      <h1 className="text-2xl text-gray-600 font-semibold mb-4">Responses</h1>
      {responses ? (
        responses.map((response) => (
          <Response
            key={response.id}
            engine={response.engine}
            prompt={response.prompt}
            responseText={response.responseText}
          />
        ))
      ) : (
        <h2 className="text-center text-xl font-semibold">No responses yet</h2>
      )}
    </div>
  );
}

export default ResponseList;
