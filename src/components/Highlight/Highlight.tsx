import React from "react";
import classNames from "classnames";

import "./Highlight.scss";

interface Props {
  highlight: string;
  children?: string | undefined;
}

export const Highlight: React.FC<Props> = ({ highlight, children }) => {
  const getHighlightedText = (text: string | undefined, highlight: string) => {
    if (!text) {
      return <span>{text}</span>;
    }
    // Split on highlight term and include term into parts, ignore case
    const parts = text.split(new RegExp(`(${highlight})`, "gi"));
    return (
      <span>
        {" "}
        {parts.map((part, i) => (
          <span
            key={i}
            className={classNames({
              highlight: part.toLowerCase() === highlight.toLowerCase(),
            })}
          >
            {part}
          </span>
        ))}{" "}
      </span>
    );
  };

  return getHighlightedText(children, highlight);
};

export default Highlight;
