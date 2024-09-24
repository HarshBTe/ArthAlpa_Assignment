import React, { useState, useEffect } from 'react';
import './index.css'

const TextStat = () => {
  // State hooks to track text input and replacement fields
  const [text, setText] = useState('');
  const [findText, setFindText] = useState('');
  const [replaceText, setReplaceText] = useState('');
  const [uniqueWordCount, setUniqueWordCount] = useState(0);
  const [characterCount, setCharacterCount] = useState(0);
  const [highlightedText, setHighlightedText] = useState('');

  // Effect to update statistics whenever text changes
  useEffect(() => {
    updateStatistics(text);
  }, [text]);

  // Function to handle text area changes
  const handleTextChange = (event) => {
    setText(event.target.value);
  };

  // Function to update statistics
  const updateStatistics = (inputText) => {
    // Convert input text to lowercase and split into words
    const wordsArray = inputText.toLowerCase().match(/\b\w+\b/g) || [];
    const uniqueWords = new Set(wordsArray);
    const charCount = inputText.replace(/[^a-zA-Z0-9]/g, '').length; // Count only alphanumeric characters

    setUniqueWordCount(uniqueWords.size);
    setCharacterCount(charCount);
  };

  // Function to handle replacement
  const handleReplaceAll = () => {
    if (findText) {
      const regex = new RegExp(findText, 'g');
      const replacedText = text.replace(regex, replaceText);
      setText(replacedText);
      highlightReplacedText(replacedText, regex);
    }
  };

  // Function to highlight replaced words
  const highlightReplacedText = (text, regex) => {
    const parts = text.split(regex);
    const highlights = parts.map((part, index) => (
      <span key={index}>
        {part}
        {index < parts.length - 1 && (
          <span className="highlight">{replaceText}</span>
        )}
      </span>
    ));
    setHighlightedText(<div>{highlights}</div>);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Real-Time Text Statistics and Replacement</h1>
        <textarea
          value={text}
          onChange={handleTextChange}
          placeholder="Type here..."
          rows="8"
          cols="50"
        />
        <div className="stats">
          <p>Unique Words: {uniqueWordCount}</p>
          <p>Characters (excluding spaces and punctuation): {characterCount}</p>
        </div>
        <div className="replacement">
          <input
            type="text"
            value={findText}
            onChange={(e) => setFindText(e.target.value)}
            placeholder="Find text"
          />
          <input
            type="text"
            value={replaceText}
            onChange={(e) => setReplaceText(e.target.value)}
            placeholder="Replace with"
          />
          <button onClick={handleReplaceAll}>Replace All</button>
        </div>
        <h3>Processed Text:</h3>
        <div className="processed-text">
          {highlightedText || text}
        </div>
      </header>
    </div>
  );
}

export default TextStat