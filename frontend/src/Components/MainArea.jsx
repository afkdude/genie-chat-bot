/* eslint-disable react/prop-types */
import { useState } from "react";
import avatar from "../assets/avtar.svg";
import response from "../assets/output3.svg";
import { IoSend } from "react-icons/io5";

import './components.css'
import Header from "./Header";
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
  const [isLoading, setIsLoading] = useState(false); // Track loading state

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { type: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true); // Set loading to true when sending request

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
      setIsLoading(false); // Set loading to false after the response is received
    }
  };

  return (
    <div
      className={`${
        isSidebarMinimized ? "flex-[0.95]" : "flex-[0.8]"
      } transition-all duration-500 flex flex-col justify-between items-center`}
    >
      <Header/>
      <div className="chats w-[90%] h-[80%] border p-4 flex flex-col justify-between rounded-[20px]">
        {/* Chat Messages */}
        <div className="response h-full flex flex-col gap-2 mt-4 justify-start items-start">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`individualResponses flex gap-2 rounded-md p-3 rounded-2xl ${
                msg.type === "bot"
                  ? " max-w-[70%] answer"
                  : "bg-[#EFF3EA] border-b-2 border-blue-300 items-center "
              }`}
            >
              <img
                src={msg.type === "bot" ? response : avatar}
                alt="avatar"
                className="w-8 h-8 rounded-lg"
              />
              <span>{msg.text}</span>
            </div>
          ))}
          {/* Loader message */}
          {isLoading && (
            <div className="flex items-center gap-2 p-4 text-green-500">
              <div className="loader"></div>
              <span>Getting Response...</span>
            </div>
          )}
        </div>

        {/* Input Section */}
        <div className="inputs flex items-center mt-4 bg-white border text-[20px] rounded-md px-4 py-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter your question here"
            className="flex-1 outline-none"
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
