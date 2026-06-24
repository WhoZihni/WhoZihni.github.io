import { useEffect, useState, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabaseClient'
import './BackOffice.css'

function formatDate(iso) {
  if (!iso) return '—'
  return new Intl.DateTimeFormat('en-US', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(new Date(iso))
}

function IconTrash() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polyline points="3 6 5 6 21 6" />
      <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
      <path d="M10 11v6M14 11v6" />
      <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
    </svg>
  )
}

function IconEye() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  )
}

function IconClose() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  )
}

function IconLogout() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
      <polyline points="16 17 21 12 16 7" />
      <line x1="21" y1="12" x2="9" y2="12" />
    </svg>
  )
}

function MessageModal({ message, onClose }) {
  useEffect(() => {
    function onKey(e) {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [onClose])

  return (
    <div
      className="modal-backdrop"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Message detail"
    >
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-sender">
            <p className="modal-name">{message.name}</p>
            <a href={`mailto:${message.email}`} className="modal-email">
              {message.email}
            </a>
          </div>
          <button
            className="modal-close"
            onClick={onClose}
            aria-label="Close modal"
          >
            <IconClose />
          </button>
        </div>

        <p className="modal-date">{formatDate(message.created_at)}</p>
        <div className="modal-divider" />
        <p className="modal-message">{message.message}</p>
      </div>
    </div>
  )
}

export default function BackOffice() {
  const navigate = useNavigate()
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(true)
  const [fetchError, setFetchError] = useState('')
  const [deletingId, setDeletingId] = useState(null)
  const [activeMessage, setActiveMessage] = useState(null)

  const fetchMessages = useCallback(async () => {
    setLoading(true)
    setFetchError('')
    const { data, error } = await supabase
      .from('messages')
      .select('*')
      .order('created_at', { ascending: false })
    setLoading(false)
    if (error) { setFetchError(error.message); return }
    setMessages(data || [])
  }, [])

  useEffect(() => {
    fetchMessages()
  }, [fetchMessages])

  async function handleDelete(id) {
    setDeletingId(id)
    const { error } = await supabase.from('messages').delete().eq('id', id)
    setDeletingId(null)
    if (error) { setFetchError(error.message); return }
    setMessages((prev) => prev.filter((m) => m.id !== id))
  }

  async function handleLogout() {
    await supabase.auth.signOut()
    navigate('/', { replace: true })
  }

  return (
    <div className="bo-page">

      <header className="bo-topbar">
        <div className="bo-topbar-left">
          <span className="bo-brand">Back Office</span>
          <span className="bo-brand-sub">Ahmed Zihni</span>
        </div>
        <button className="bo-logout" onClick={handleLogout}>
          <IconLogout />
          Logout
        </button>
      </header>

      <main className="bo-main">
        <div className="bo-section-header">
          <h1 className="bo-title">Messages</h1>
          <p className="bo-subtitle">Submissions from the contact form</p>
        </div>

        {loading && <p className="bo-status">Loading messages…</p>}

        {fetchError && (
          <p className="bo-status bo-error" role="alert">{fetchError}</p>
        )}

        {!loading && !fetchError && messages.length === 0 && (
          <p className="bo-status">No messages yet.</p>
        )}

        {!loading && messages.length > 0 && (
          <div className="bo-table-wrap">
            <table className="bo-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {messages.map((msg) => (
                  <tr
                    key={msg.id}
                    className="bo-row"
                    onClick={() => setActiveMessage(msg)}
                  >
                    <td className="bo-cell bo-cell-name">{msg.name}</td>
                    <td className="bo-cell bo-cell-email">{msg.email}</td>
                    <td className="bo-cell bo-cell-date">{formatDate(msg.created_at)}</td>
                    <td
                      className="bo-cell bo-cell-actions"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <button
                        className="bo-btn-icon bo-btn-view"
                        onClick={() => setActiveMessage(msg)}
                        aria-label={`View message from ${msg.name}`}
                      >
                        <IconEye />
                      </button>
                      <button
                        className="bo-btn-icon bo-btn-delete"
                        onClick={() => handleDelete(msg.id)}
                        disabled={deletingId === msg.id}
                        aria-label={`Delete message from ${msg.name}`}
                      >
                        <IconTrash />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>

      {activeMessage && (
        <MessageModal
          message={activeMessage}
          onClose={() => setActiveMessage(null)}
        />
      )}

    </div>
  )
}
