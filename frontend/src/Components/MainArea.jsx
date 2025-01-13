import { useState } from "react";
import avatar from "../assets/avtar.svg";
import response from "../assets/output3.svg";
import { IoSend } from "react-icons/io5";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism"; // Import a theme
import "./components.css";
import Header from "./Header";
import { useAuthStore } from "../Store/useAuthStore.js";

const fetchResponse = async (input) => {
  const apiUrl = "http://localhost:5000/api/gemini/response";

  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ input }),
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }

    const data = await response.json();
    return data.completion.trim();
  } catch (error) {
    console.error("Error fetching response from backend:", error);
    throw error;
  }
};

const MainArea = ({ isSidebarMinimized }) => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { type: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const botResponse = await fetchResponse(input);
      const botMessage = { type: "bot", text: botResponse };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      const errorMessage = {
        type: "bot",
        text: "Oops! Something went wrong. Please try again later.",
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      if (e.shiftKey) {
        setInput((prev) => prev + "\n");
      } else {
        e.preventDefault();
        handleSend();
      }
    }
  };

  const { authUser } = useAuthStore();

  return (
    <div
      className={`${
        isSidebarMinimized ? "flex-[0.95]" : "flex-[0.8]"
      } transition-all duration-500 flex flex-col justify-between items-center pb-7`}
    >
      <Header userName={authUser?.fullName} />
      <div className="chats w-[90%] h-[80%] border p-4 flex flex-col justify-between rounded-[20px]">
        <div className="response h-full flex flex-col gap-4 mt-4 justify-start items-start">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`individualResponses flex gap-2 p-3 rounded-2xl max-w-[70%] ${
                msg.type === "bot"
                  ? "bg-[#EFF3EA] border-b-2 border-blue-300 self-start"
                  : "bg-[#D1F7C4] border-l-2 border-green-400 self-end"
              }`}
            >
              {msg.type === "bot" && (
                <img
                  src={response}
                  alt="bot avatar"
                  className="w-8 h-8 rounded-lg"
                />
              )}
              {msg.type === "bot" ? (
                <SyntaxHighlighter
                  language="javascript" // Change this to the language you expect
                  style={oneDark} // Apply the selected theme
                  className="rounded-lg p-2  "
                  customStyle={{
                    maxWidth: "800px", // Constrain the width to prevent overflow
                    wordWrap:"break-word", // Wrap long lines
                    whiteSpace: "pre-wrap", // Preserve line breaks and whitespace
                    overflowX: "auto", // Allow horizontal scrolling if necessary
                    padding: "10px",
                    borderRadius: "10px",
                    fontSize: '10px',
                    
                  }}
                >
                  {msg.text}
                </SyntaxHighlighter>
              ) : (
                <span>{msg.text}</span>
              )}
              {msg.type === "user" && (
                <img
                  src={avatar}
                  alt="user avatar"
                  className="w-8 h-8 rounded-lg"
                />
              )}
            </div>
          ))}

          {isLoading && (
            <div className="flex items-center gap-2 p-4 text-green-500 self-start">
              <div className="loader"></div>
              <span>Getting Response...</span>
            </div>
          )}
        </div>

        <div className="inputs flex items-center mt-4 border-b text-[20px] rounded-lg px-4 py-2 text-white">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Enter your question here"
            className="flex-1 outline-none bg-transparent resize-none"
            rows={1}
          />
          <button onClick={handleSend}>
            <IoSend className="text-[#16C47F]" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default MainArea;
