"use client";

import { useEffect, useState } from "react";
import { DataTable } from "@/components/admin/DataTable";
import { formatDate } from "@/lib/utils";
import { Trash2, Mail, MailOpen } from "lucide-react";

interface Message {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  read: boolean;
  createdAt: string;
}

export default function AdminMessagesPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<Message | null>(null);

  const load = async () => {
    const res = await fetch("/api/contact");
    const data = await res.json();
    setMessages(Array.isArray(data) ? data : []);
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  const toggleRead = async (msg: Message) => {
    await fetch(`/api/contact/${msg.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ read: !msg.read }),
    });
    await load();
    if (selected?.id === msg.id) {
      setSelected({ ...msg, read: !msg.read });
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this message?")) return;
    await fetch(`/api/contact/${id}`, { method: "DELETE" });
    if (selected?.id === id) setSelected(null);
    await load();
  };

  const openMessage = async (msg: Message) => {
    setSelected(msg);
    if (!msg.read) {
      await fetch(`/api/contact/${msg.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ read: true }),
      });
      await load();
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold font-heading text-text-primary mb-1">
        Messages
      </h1>
      <p className="text-text-secondary text-sm mb-8">
        Contact form submissions
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <div className="lg:col-span-3">
          {loading ? (
            <p className="text-text-secondary text-sm">Loading...</p>
          ) : (
            <DataTable
              data={messages}
              keyExtractor={(m) => m.id}
              emptyMessage="No messages yet"
              columns={[
                {
                  key: "from",
                  header: "From",
                  render: (m) => (
                    <button
                      onClick={() => openMessage(m)}
                      className="text-left"
                    >
                      <div className="flex items-center gap-2">
                        {!m.read && (
                          <span className="w-2 h-2 rounded-full bg-accent-primary" />
                        )}
                        <span className={m.read ? "font-normal" : "font-semibold"}>
                          {m.name}
                        </span>
                      </div>
                      <p className="text-xs text-text-secondary truncate max-w-[180px]">
                        {m.subject}
                      </p>
                    </button>
                  ),
                },
                {
                  key: "date",
                  header: "Date",
                  render: (m) => (
                    <span className="text-text-secondary text-xs">
                      {formatDate(m.createdAt)}
                    </span>
                  ),
                },
                {
                  key: "actions",
                  header: "",
                  render: (m) => (
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => toggleRead(m)}
                        className="p-1.5 rounded-lg hover:bg-surface-elevated text-text-secondary"
                        title={m.read ? "Mark unread" : "Mark read"}
                      >
                        {m.read ? (
                          <Mail className="w-4 h-4" />
                        ) : (
                          <MailOpen className="w-4 h-4" />
                        )}
                      </button>
                      <button
                        onClick={() => handleDelete(m.id)}
                        className="p-1.5 rounded-lg hover:bg-red-500/10 text-text-secondary hover:text-red-500"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ),
                },
              ]}
            />
          )}
        </div>

        <div className="lg:col-span-2">
          {selected ? (
            <div className="bg-surface border border-border-custom rounded-xl p-6 sticky top-6">
              <h3 className="font-semibold text-text-primary mb-1">
                {selected.subject}
              </h3>
              <p className="text-sm text-text-secondary mb-4">
                From {selected.name} &lt;{selected.email}&gt;
                <br />
                {formatDate(selected.createdAt)}
              </p>
              <p className="text-sm text-text-primary whitespace-pre-wrap leading-relaxed">
                {selected.message}
              </p>
              <a
                href={`mailto:${selected.email}?subject=Re: ${selected.subject}`}
                className="inline-block mt-6 text-sm text-accent-primary hover:underline"
              >
                Reply via email
              </a>
            </div>
          ) : (
            <div className="bg-surface border border-border-custom rounded-xl p-6 text-center text-text-secondary text-sm">
              Select a message to read
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
