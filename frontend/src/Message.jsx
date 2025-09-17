import { useEffect, useState } from "react";
import Footer from './Footer';
import './Message.css';
import Navbar from './Navbar';

const MessageList = () => {
  const [messages, setMessages] = useState([]);
  const [error, setError]       = useState("");
  const [loading, setLoading]   = useState(true);

  // Grab the logged‑in user from localStorage
  const userObj  = JSON.parse(localStorage.getItem("user") || "null");
  const username = userObj?.username;          // e.g. "admin"

  useEffect(() => {
    if (!username) {
      setError("Please log in to view your messages.");
      setLoading(false);
      return;
    }

    fetch(
      `http://localhost:8000/api/my-messages/?username=${encodeURIComponent(
        username
      )}`,
      { headers: { "Content-Type": "application/json" } }
    )
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then(setMessages)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [username]);

  // -------------- UI --------------
  if (loading) return <p className="text-center">Loading…</p>;
  if (error)   return <p className="text-center text-red-600">{error}</p>;
  if (!messages.length)
    return (
        <>
        <Navbar/>
        <p className="text-center">
          <br/>
        No messages yet for <strong>{username}</strong>.
      </p>
      <Footer/>
        </>
      
    );

  return (
    <div className="max-w-xl mx-auto mt-10 px-4">
      <Navbar/>
      <h2 className="text-2xl font-semibold mb-4 text-center">
          <span className="text-indigo-600">{username}</span>
      </h2>
      <div className="space-y-4">
  {messages.map((m) => {
    const isMe = m.sender === username; // assuming your API sends sender field
    return (
      <div key={m.id} className={`message-card ${isMe ? "message-me" : "message-other"}`}>
        {!isMe && <div className="message-username">{m.sender}</div>}
        {m.message}
      </div>
    );
  })}
</div>

      <Footer/>
    </div>
  );
};

export default MessageList;
