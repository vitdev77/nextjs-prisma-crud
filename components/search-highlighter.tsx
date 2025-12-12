import * as React from "react";
import Highlighter from "react-highlight-words";

interface HighlightProps {
  text: string;
  searchWords: string[];
}

const SearchHighlighter: React.FC<HighlightProps> = ({ text, searchWords }) => {
  return (
    <Highlighter
      searchWords={searchWords}
      autoEscape={true}
      textToHighlight={text}
      highlightStyle={{ backgroundColor: "#ffcc00", padding: "0px" }} // Custom highlight style
    />
  );
};

export default SearchHighlighter;
