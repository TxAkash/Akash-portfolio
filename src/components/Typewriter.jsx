import { useEffect, useState } from "react";

// Types and deletes each word in turn.
export default function Typewriter({ words = [], speed = 85, pause = 1600 }) {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (!words.length) return;
    const word = words[index % words.length];
    let timer;
    if (!deleting && text === word) {
      timer = setTimeout(() => setDeleting(true), pause);
    } else if (deleting && text === "") {
      setDeleting(false);
      setIndex((i) => i + 1);
    } else {
      timer = setTimeout(
        () => setText(word.slice(0, text.length + (deleting ? -1 : 1))),
        deleting ? speed / 2 : speed
      );
    }
    return () => clearTimeout(timer);
  }, [text, deleting, index, words, speed, pause]);

  return (
    <span className="typewriter">
      {text}
      <span className="caret">|</span>
    </span>
  );
}
