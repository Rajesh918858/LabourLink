import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';

const Chat = () => {
  const { user, userType } = useSelector(state => state.auth);
  const [conversations, setConversations] = useState([
    { id: 1, name: 'Raj Kumar', type: 'worker', avatar: '👨‍💼', lastMessage: 'I can start tomorrow', timestamp: '2 min ago', unread: 2 },
    { id: 2, name: 'Vikram Sharma', type: 'worker', avatar: '👷', lastMessage: 'How much is the budget?', timestamp: '15 min ago', unread: 0 },
    { id: 3, name: 'Suresh Kumar', type: 'worker', avatar: '👨‍🔧', lastMessage: 'I have 10 years of experience', timestamp: '1 hour ago', unread: 1 },
  ]);

  const [selectedChat, setSelectedChat] = useState(conversations[0]);
  const [messages, setMessages] = useState([
    { id: 1, sender: 'Raj Kumar', type: 'worker', message: 'Hi, I am interested in the carpentry job', timestamp: '2:30 PM', isOwn: false },
    { id: 2, sender: 'You', message: 'Great! Can you start this week?', timestamp: '2:32 PM', isOwn: true },
    { id: 3, sender: 'Raj Kumar', type: 'worker', message: 'I can start tomorrow', timestamp: '2:35 PM', isOwn: false },
    { id: 4, sender: 'Raj Kumar', type: 'worker', message: '🎤 Voice message', isVoice: true, timestamp: '2:38 PM', isOwn: false, voiceDuration: '0:15' },
  ]);

  const [messageInput, setMessageInput] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const recordingIntervalRef = useRef(null);
  const messagesEndRef = useRef(null);

  // Auto-scroll to latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Cleanup recording interval
  useEffect(() => {
    return () => {
      if (recordingIntervalRef.current) {
        clearInterval(recordingIntervalRef.current);
      }
    };
  }, []);

  const handleSendMessage = () => {
    if (messageInput.trim()) {
      const newMessage = {
        id: messages.length + 1,
        sender: 'You',
        message: messageInput,
        timestamp: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
        isOwn: true
      };
      setMessages([...messages, newMessage]);
      setMessageInput('');
    }
  };

  // Voice Recording Handler
  const startVoiceRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      audioChunksRef.current = [];

      mediaRecorderRef.current.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };

      mediaRecorderRef.current.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
        const voiceMessage = {
          id: messages.length + 1,
          sender: 'You',
          message: '🎤 Voice message',
          isVoice: true,
          voiceDuration: `0:${recordingTime < 10 ? '0' + recordingTime : recordingTime}`,
          timestamp: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
          isOwn: true
        };
        setMessages([...messages, voiceMessage]);
      };

      mediaRecorderRef.current.start();
      setIsRecording(true);
      setRecordingTime(0);

      recordingIntervalRef.current = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);
    } catch (error) {
      alert('Microphone access denied. Please enable microphone permissions.');
    }
  };

  const stopVoiceRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
      setIsRecording(false);
      if (recordingIntervalRef.current) {
        clearInterval(recordingIntervalRef.current);
      }
    }
  };

  const handleChatSelect = (chat) => {
    setSelectedChat(chat);
    // Mark as read
    setConversations(conversations.map(c =>
      c.id === chat.id ? { ...c, unread: 0 } : c
    ));
  };

  return (
    <div className="container" style={{ display: 'grid', gridTemplateColumns: '300px 1fr', gap: '1rem', minHeight: '90vh', padding: '2rem 1rem' }}>
      {/* Chat List Sidebar */}
      <div style={{ backgroundColor: 'white', borderRadius: '0.75rem', boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
        <div style={{ padding: '1.5rem', borderBottom: '1px solid #e5e7eb' }}>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#111827' }}>💬 Messages</h3>
          <input
            type="text"
            placeholder="Search chats..."
            style={{
              width: '100%',
              padding: '0.5rem',
              marginTop: '0.75rem',
              border: '1px solid #ccc',
              borderRadius: '0.375rem',
              fontSize: '0.9rem'
            }}
          />
        </div>

        <div style={{ flex: 1, overflowY: 'auto' }}>
          {conversations.map((chat) => (
            <div
              key={chat.id}
              onClick={() => handleChatSelect(chat)}
              style={{
                padding: '1rem',
                borderBottom: '1px solid #e5e7eb',
                cursor: 'pointer',
                backgroundColor: selectedChat.id === chat.id ? '#f0f9ff' : 'white',
                borderLeft: selectedChat.id === chat.id ? '4px solid #2563eb' : 'none',
                paddingLeft: selectedChat.id === chat.id ? 'calc(1rem - 4px)' : '1rem'
              }}
            >
              <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'start' }}>
                <div style={{ fontSize: '2rem' }}>{chat.avatar}</div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.25rem' }}>
                    <p style={{ fontWeight: 'bold', color: '#111827', fontSize: '0.95rem' }}>{chat.name}</p>
                    {chat.unread > 0 && (
                      <span style={{
                        backgroundColor: '#ef4444',
                        color: 'white',
                        borderRadius: '9999px',
                        width: '24px',
                        height: '24px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '0.75rem',
                        fontWeight: 'bold'
                      }}>
                        {chat.unread}
                      </span>
                    )}
                  </div>
                  <p style={{ color: '#6b7280', fontSize: '0.85rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', marginBottom: '0.25rem' }}>
                    {chat.lastMessage}
                  </p>
                  <p style={{ color: '#9ca3af', fontSize: '0.75rem' }}>{chat.timestamp}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chat Messages Area */}
      <div style={{ backgroundColor: 'white', borderRadius: '0.75rem', boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)', display: 'flex', flexDirection: 'column' }}>
        {/* Chat Header */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '1.5rem',
          borderBottom: '1px solid #e5e7eb',
          backgroundColor: '#f9fafb'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ fontSize: '2.5rem' }}>{selectedChat.avatar}</div>
            <div>
              <p style={{ fontWeight: 'bold', fontSize: '1.1rem', color: '#111827' }}>{selectedChat.name}</p>
              <p style={{ color: '#6b7280', fontSize: '0.9rem' }}>💚 Active now</p>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <button style={{
              backgroundColor: '#2563eb',
              color: 'white',
              border: 'none',
              padding: '0.5rem 1rem',
              borderRadius: '0.375rem',
              cursor: 'pointer',
              fontWeight: '600'
            }}>
              👁️ Profile
            </button>
            <button style={{
              backgroundColor: '#ef4444',
              color: 'white',
              border: 'none',
              padding: '0.5rem 1rem',
              borderRadius: '0.375rem',
              cursor: 'pointer',
              fontWeight: '600'
            }}>
              ❌ Block
            </button>
          </div>
        </div>

        {/* Messages Display */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {messages.map((msg) => (
            <div
              key={msg.id}
              style={{
                display: 'flex',
                justifyContent: msg.isOwn ? 'flex-end' : 'flex-start'
              }}
            >
              <div style={{
                maxWidth: '60%',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.25rem'
              }}>
                <div style={{
                  padding: '0.75rem 1rem',
                  borderRadius: msg.isOwn ? '1rem 1rem 0.25rem 1rem' : '1rem 1rem 1rem 0.25rem',
                  backgroundColor: msg.isOwn ? '#2563eb' : '#e5e7eb',
                  color: msg.isOwn ? 'white' : '#111827',
                  wordWrap: 'break-word'
                }}>
                  {msg.isVoice ? (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <button style={{
                        backgroundColor: 'rgba(255,255,255,0.2)',
                        border: 'none',
                        color: 'white',
                        padding: '0.5rem 0.75rem',
                        borderRadius: '0.375rem',
                        cursor: 'pointer',
                        fontWeight: '600',
                        fontSize: '1rem'
                      }}>
                        ▶️
                      </button>
                      <span>{msg.voiceDuration}</span>
                    </div>
                  ) : (
                    msg.message
                  )}
                </div>
                <p style={{ fontSize: '0.75rem', color: '#9ca3af', paddingX: '0.5rem', textAlign: msg.isOwn ? 'right' : 'left' }}>
                  {msg.timestamp}
                </p>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Message Input Area */}
        <div style={{ padding: '1.5rem', borderTop: '1px solid #e5e7eb', backgroundColor: '#f9fafb' }}>
          {isRecording && (
            <div style={{
              backgroundColor: '#fee2e2',
              padding: '1rem',
              borderRadius: '0.375rem',
              marginBottom: '1rem',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <span style={{ fontSize: '1.5rem', animation: 'pulse 1s infinite' }}>🎤</span>
                <div>
                  <p style={{ fontWeight: '600', color: '#111827' }}>Recording...</p>
                  <p style={{ color: '#6b7280', fontSize: '0.9rem' }}>0:{recordingTime < 10 ? '0' + recordingTime : recordingTime}</p>
                </div>
              </div>
              <button
                onClick={stopVoiceRecording}
                style={{
                  backgroundColor: '#ef4444',
                  color: 'white',
                  border: 'none',
                  padding: '0.5rem 1rem',
                  borderRadius: '0.375rem',
                  cursor: 'pointer',
                  fontWeight: '600'
                }}
              >
                ⏹️ Stop
              </button>
            </div>
          )}

          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <input
              type="text"
              value={messageInput}
              onChange={(e) => setMessageInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Type a message..."
              disabled={isRecording}
              style={{
                flex: 1,
                padding: '0.75rem',
                border: '1px solid #ccc',
                borderRadius: '0.375rem',
                fontSize: '0.95rem',
                opacity: isRecording ? 0.5 : 1
              }}
            />

            <button
              onClick={isRecording ? stopVoiceRecording : startVoiceRecording}
              style={{
                backgroundColor: isRecording ? '#ef4444' : '#9333ea',
                color: 'white',
                border: 'none',
                padding: '0.75rem 1rem',
                borderRadius: '0.375rem',
                cursor: 'pointer',
                fontWeight: '600',
                fontSize: '1rem'
              }}
              title={isRecording ? 'Stop recording' : 'Start voice message'}
            >
              {isRecording ? '⏹️' : '🎤'}
            </button>

            <button
              onClick={handleSendMessage}
              disabled={!messageInput.trim() && !isRecording}
              style={{
                backgroundColor: messageInput.trim() ? '#10b981' : '#d1d5db',
                color: 'white',
                border: 'none',
                padding: '0.75rem 1rem',
                borderRadius: '0.375rem',
                cursor: messageInput.trim() ? 'pointer' : 'not-allowed',
                fontWeight: '600',
                fontSize: '1rem'
              }}
            >
              📤 Send
            </button>
          </div>

          {/* Job Discussion Info */}
          <div style={{
            backgroundColor: '#f0f9ff',
            padding: '1rem',
            borderRadius: '0.375rem',
            marginTop: '1rem',
            borderLeft: '4px solid #2563eb',
            cursor: 'pointer'
          }}>
            <p style={{ fontWeight: 'bold', color: '#111827', marginBottom: '0.5rem' }}>💼 Job: House Construction - Foundation Work</p>
            <p style={{ color: '#6b7280', fontSize: '0.9rem' }}>Salary: ₹50,000 | Location: Delhi | Topic: Job details & scheduling</p>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
      `}</style>
    </div>
  );
};

export default Chat;
