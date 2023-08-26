import React from "react";

const searchResult = ({ results }) => {
    return (
        <div>
            <h2> Search results:</h2>
            <ul>
                {results.map((result,index) => (
                    <li key={index}>{result.name}</li>
                ))}
            </ul>
        </div>
    );
};

export default searchResult;