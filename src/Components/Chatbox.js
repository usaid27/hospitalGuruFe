import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import "../Styles/Chatbox.css";

function Chatbox({ onClose }) {
    const [position, setPosition] = useState({ top: 'auto', left: 'auto', right: '20px', bottom: '20px' });
    const [dragging, setDragging] = useState(false);
    const [rel, setRel] = useState(null); // Holds the relative mouse position to the box
    const [message, setMessage] = useState("");
    const [chatHistory, setChatHistory] = useState([]);

    const handleHeaderMouseDown = (e) => {
        if (e.button !== 0) return;
        const pos = e.target.getBoundingClientRect();
        setRel({
            x: e.pageX - pos.left,
            y: e.pageY - pos.top
        });
        setDragging(true);
        e.stopPropagation();
        e.preventDefault();
    };

    const handleMouseUp = () => {
        setDragging(false);
    };

    const handleMouseMove = (e) => {
        if (!dragging) return;
        setPosition({
            left: `${e.pageX - rel.x}px`,
            top: `${e.pageY - rel.y}px`,
            right: 'auto',
            bottom: 'auto'
        });
        e.stopPropagation();
        e.preventDefault();
    };

    useEffect(() => {
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        };
    });

    const handleSendMessage = () => {
        if (message.trim()) {
            setChatHistory([...chatHistory, message]);
            setMessage("");
        }
    };

    const handleInputChange = (e) => {
        setMessage(e.target.value);
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            handleSendMessage();
        }
    };

    return (
        <div
            className="chatbox-container"
            style={position}
        >
            <div
                className="chatbox-header"
                onMouseDown={handleHeaderMouseDown} // Only start dragging on header
            >
                <h4>Live Chat</h4>
                <FontAwesomeIcon icon={faXmark} onClick={onClose} className="chatbox-close-icon" />
            </div>
            <div className="chatbox-content">
                {chatHistory.map((msg, index) => (
                    <div key={index} className="chat-message">
                       <p style={{ marginBottom: 0 }}>{msg}</p>
                    </div>
                ))}
            </div>
            <div className="chatbox-input-section">
                <input
                    type="text"
                    className="chatbox-input"
                    value={message}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                    placeholder="Type a message..."
                />
                <button className="chatbox-send-btn" onClick={handleSendMessage}>
                    <FontAwesomeIcon icon={faPaperPlane} />
                </button>
            </div>
        </div>
    );
}

export default Chatbox;
