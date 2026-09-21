import React, { useEffect, useState } from "react";
import "./Chatbot.css";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:3001";

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const [messages, setMessages] = useState([
    {
      id: 1,
      type: "bot",
      text: "Hi! 👋 I'm your StatSkill AI assistant. How can I help you?",
    },
  ]);

  /*
  =========================================================
  ANIMATE FLOATING CHATBOT
  =========================================================
  */

  useEffect(() => {
    // Animation sirf floating button ke liye
    if (open) return;

    const button = document.querySelector(
      ".chatbot-floating-button"
    );

    const spark1 = document.querySelector(".spark-1");
    const spark2 = document.querySelector(".spark-2");

    const heart1 = document.querySelector(".heart-1");
    const heart2 = document.querySelector(".heart-2");

    const onlineDot = document.querySelector(".online-dot");

    if (!button) return;

    let animationFrame;

    const startTime = performance.now();

    const animate = (time) => {
      const elapsed = time - startTime;

      /*
      -------------------------------------------------------
      HAMSTER FLOAT
      -------------------------------------------------------
      */

      const hamsterY =
        Math.sin(elapsed / 650) * 5;

      button.style.setProperty(
        "transform",
        `translateY(${hamsterY}px)`,
        "important"
      );

      /*
      -------------------------------------------------------
      SPARKLE 1
      -------------------------------------------------------
      */

      if (spark1) {
        const scale1 =
          1 +
          Math.sin(elapsed / 280) * 0.35;

        const rotate1 =
          Math.sin(elapsed / 400) * 18;

        const opacity1 =
          0.65 +
          Math.sin(elapsed / 280) * 0.35;

        spark1.style.setProperty(
          "transform",
          `scale(${scale1}) rotate(${rotate1}deg)`,
          "important"
        );

        spark1.style.setProperty(
          "opacity",
          opacity1,
          "important"
        );
      }

      /*
      -------------------------------------------------------
      SPARKLE 2
      -------------------------------------------------------
      */

      if (spark2) {
        const scale2 =
          1 +
          Math.sin(elapsed / 350 + 2) * 0.35;

        const rotate2 =
          Math.sin(elapsed / 500 + 2) * 18;

        const opacity2 =
          0.65 +
          Math.sin(elapsed / 350 + 2) * 0.35;

        spark2.style.setProperty(
          "transform",
          `scale(${scale2}) rotate(${rotate2}deg)`,
          "important"
        );

        spark2.style.setProperty(
          "opacity",
          opacity2,
          "important"
        );
      }

      /*
      -------------------------------------------------------
      HEART 1
      -------------------------------------------------------
      */

      if (heart1) {
        const y1 =
          Math.sin(elapsed / 500) * 6;

        const scale1 =
          1 +
          Math.sin(elapsed / 500) * 0.10;

        const rotate1 =
          Math.sin(elapsed / 650) * 6;

        heart1.style.setProperty(
          "transform",
          `translateY(${y1}px) scale(${scale1}) rotate(${rotate1}deg)`,
          "important"
        );
      }

      /*
      -------------------------------------------------------
      HEART 2
      -------------------------------------------------------
      */

      if (heart2) {
        const y2 =
          Math.sin(elapsed / 600 + 2) * 6;

        const scale2 =
          1 +
          Math.sin(elapsed / 600 + 2) * 0.10;

        const rotate2 =
          Math.sin(elapsed / 700 + 2) * 6;

        heart2.style.setProperty(
          "transform",
          `translateY(${y2}px) scale(${scale2}) rotate(${rotate2}deg)`,
          "important"
        );
      }

      /*
      -------------------------------------------------------
      ONLINE DOT
      -------------------------------------------------------
      */

      if (onlineDot) {
        const dotScale =
          1 +
          Math.sin(elapsed / 450) * 0.08;

        const glow =
          4 +
          (Math.sin(elapsed / 450) + 1) * 3;

        onlineDot.style.setProperty(
          "transform",
          `scale(${dotScale})`,
          "important"
        );

        onlineDot.style.setProperty(
          "box-shadow",
          `0 0 ${glow}px rgba(34, 197, 94, 0.45)`,
          "important"
        );
      }

      animationFrame =
        requestAnimationFrame(animate);
    };

    animationFrame =
      requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrame);
    };
  }, [open]);

  /*
  =========================================================
  SEND MESSAGE
  =========================================================
  */

  const sendMessage = async (customMessage = null) => {
    const text =
      (customMessage ?? message).trim();

    if (!text || loading) return;

    const userId = Date.now();

    // Add user message
    setMessages((prev) => [
      ...prev,
      {
        id: userId,
        type: "user",
        text,
      },
    ]);

    setMessage("");
    setLoading(true);

    try {
      const response = await fetch("/api/chat", {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
              "Bypass-Tunnel-Reminder": "true",
          },

          body: JSON.stringify({
            message: text,
          }),
        }
      );

      const data =
        await response.json();

      if (!response.ok) {
        throw new Error(
          data?.message ||
            "Unable to get AI response."
        );
      }

      // Add AI response
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          type: "bot",
          text:
            data?.reply ||
            "Sorry, I could not generate a response.",
        },
      ]);
    } catch (error) {
      console.error(
        "Chatbot error:",
        error
      );

      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          type: "bot",
          text:
            "Sorry 😔 I couldn't connect to the AI assistant right now. Please make sure the StatSkill AI server is running.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  /*
  =========================================================
  DELETE ONE MESSAGE
  =========================================================
  */

  const deleteMessage = (id) => {
    setMessages((prev) =>
      prev.filter(
        (msg) => msg.id !== id
      )
    );
  };

  /*
  =========================================================
  ENTER KEY
  =========================================================
  */

  const handleKeyDown = (e) => {
    if (
      e.key === "Enter" &&
      !e.shiftKey
    ) {
      e.preventDefault();
      sendMessage();
    }
  };

  /*
  =========================================================
  QUICK ACTION
  =========================================================
  */

  const quickAction = (text) => {
    sendMessage(text);
  };

  /*
  =========================================================
  UI
  =========================================================
  */

  return (
    <>
      {/* =================================================
          FLOATING CHATBOT
      ================================================= */}

      {!open && (
        <div className="chatbot-floating-wrapper">

          {/* HELP BUBBLE */}

          <div
  className="chatbot-help-bubble"
  style={{
    position: 'absolute',
    right: '125px',
    bottom: '105px',
  }}
>
  Hi! 👋
  <br />
  Need help?
</div>

          {/* CHATBOT BUTTON */}

          <div
            className="chatbot-floating-button"
            onClick={() =>
              setOpen(true)
            }
            title="Open StatSkill AI Assistant"
          >

            {/* SPARKLES */}

            <span className="spark spark-1">
              ✦
            </span>

            <span className="spark spark-2">
              ✦
            </span>

            {/* HEARTS */}

            <span className="heart heart-1">
              ♥
            </span>

            <span className="heart heart-2">
              ♥
            </span>

            {/* HAMSTER */}

            <div className="hamster-ring">

              <img
                src="/hamster.png"
                alt="StatSkill AI Assistant"
              />

            </div>

            {/* ONLINE */}

            <span className="online-dot"></span>

          </div>
        </div>
      )}

      {/* =================================================
          CHAT WINDOW
      ================================================= */}

      {open && (
        <div className="chatbot-window">

          {/* =================================================
              HEADER
          ================================================= */}

          <div className="chatbot-header">

            <div className="chatbot-brand">

              {/* HEADER AVATAR */}

              <div className="chatbot-header-avatar">

                <img
                  src="/hamster.png"
                  alt="StatSkill AI"
                />

              </div>

              {/* HEADER TEXT */}

              <div className="chatbot-header-text">

                <div className="chatbot-title-row">

                  <h3>
                    StatSkill AI
                  </h3>

                  <span className="online-status">

                    <span></span>

                    Online

                  </span>

                </div>

                <p>
                  AI Learning Assistant
                </p>

              </div>

            </div>

            {/* CLOSE */}

            <button
              className="chatbot-close"
              onClick={() =>
                setOpen(false)
              }
              aria-label="Close chatbot"
            >
              ×
            </button>

          </div>

          {/* =================================================
              CHAT BODY
          ================================================= */}

          <div className="chatbot-body">

            {messages.map((msg) => (

              <div
                key={msg.id}
                className={`chat-message-row ${
                  msg.type === "user"
                    ? "user-row"
                    : "bot-row"
                }`}
              >

                {/* BOT AVATAR */}

                {msg.type === "bot" && (

                  <div className="message-avatar">

                    <img
                      src="/hamster.png"
                      alt="AI"
                    />

                  </div>

                )}

                {/* MESSAGE */}

                <div
                  className={`chat-message-wrapper ${
                    msg.type === "user"
                      ? "user-wrapper"
                      : "bot-wrapper"
                  }`}
                >

                  <div
                    className={`chat-message ${
                      msg.type === "user"
                        ? "user-message"
                        : "bot-message"
                    }`}
                  >
                    {msg.text}
                  </div>

                  {/* DELETE */}

                  <button
                    className="delete-message"
                    onClick={() =>
                      deleteMessage(
                        msg.id
                      )
                    }
                    title="Delete message"
                    aria-label="Delete message"
                  >
                    🗑️
                  </button>

                </div>

              </div>

            ))}

            {/* =================================================
                THINKING
            ================================================= */}

            {loading && (

              <div className="chat-message-row bot-row">

                <div className="message-avatar">

                  <img
                    src="/hamster.png"
                    alt="AI"
                  />

                </div>

                <div className="chat-message-wrapper bot-wrapper">

                  <div className="chat-message bot-message">

                    Thinking

                    <span className="typing-dots">

                      <span>.</span>
                      <span>.</span>
                      <span>.</span>

                    </span>

                  </div>

                </div>

              </div>

            )}

          </div>

          {/* =================================================
              QUICK ACTIONS
          ================================================= */}

          <div className="quick-actions">

            <button
              onClick={() =>
                quickAction(
                  "What learning courses should I take?"
                )
              }
              disabled={loading}
            >
              📚 Learning
            </button>

            <button
              onClick={() =>
                quickAction(
                  "How can I improve my skills?"
                )
              }
              disabled={loading}
            >
              📊 My Skills
            </button>

            <button
              onClick={() =>
                quickAction(
                  "Help me prepare for a quiz."
                )
              }
              disabled={loading}
            >
              📝 Quizzes
            </button>

            <button
              onClick={() =>
                quickAction(
                  "How does StatSkill AI work?"
                )
              }
              disabled={loading}
            >
              💡 Get Help
            </button>

          </div>

          {/* =================================================
              INPUT
          ================================================= */}

          <div className="chatbot-input-area">

            <input
              type="text"
              placeholder={
                loading
                  ? "AI is thinking..."
                  : "Ask something..."
              }
              value={message}
              onChange={(e) =>
                setMessage(
                  e.target.value
                )
              }
              onKeyDown={handleKeyDown}
              disabled={loading}
            />

            <button
              className="send-button"
              onClick={() =>
                sendMessage()
              }
              disabled={
                loading ||
                !message.trim()
              }
              aria-label="Send message"
            >
              {loading
                ? "..."
                : "➤"}
            </button>

          </div>

        </div>
      )}
    </>
  );
}