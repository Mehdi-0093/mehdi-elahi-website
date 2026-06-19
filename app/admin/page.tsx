"use client";

import * as React from "react";

// ── Types ─────────────────────────────────────────────────────────────────────

interface Stats {
  documents: number;
  chunks: number;
  sessions: number;
  messages: number;
  leads: number;
}

interface Doc {
  id: string;
  title: string;
  authors: string[];
  year: number | null;
  venue: string | null;
  status: string;
  chunk_count: number;
  page_count: number | null;
  created_at: string;
  error_msg: string | null;
}

interface Lead {
  id: string;
  created_at: string;
  name: string | null;
  email: string | null;
  organization: string | null;
  message: string | null;
  research_interests: string[];
  status: string;
}

interface Session {
  id: string;
  created_at: string;
  updated_at: string;
  page_url: string | null;
  chat_messages: { id: string; role: string; content: string; created_at: string }[];
}

// ── Auth gate ─────────────────────────────────────────────────────────────────

function AuthGate({ onAuth }: { onAuth: (key: string) => void }) {
  const [input, setInput] = React.useState("");
  const [error, setError] = React.useState("");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    const res = await fetch("/api/admin/stats", {
      headers: { "x-admin-key": input },
    });
    if (res.ok) {
      localStorage.setItem("admin_key", input);
      onAuth(input);
    } else {
      setError("Incorrect admin password.");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#faf9f5]">
      <form
        onSubmit={submit}
        className="w-full max-w-sm rounded-[12px] border border-[#e3dacc] bg-white p-8 shadow-sm"
      >
        <div className="mb-6 flex h-10 w-10 items-center justify-center rounded-[6px] bg-[#d97757] text-sm font-bold text-white">
          ME
        </div>
        <h1 className="text-lg font-semibold text-[#141413]">Admin Dashboard</h1>
        <p className="mt-1 text-sm text-[#787670]">Enter your admin password to continue.</p>
        <input
          type="password"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Admin password"
          className="mt-4 w-full rounded-[6px] border border-[#d1cfc5] bg-[#faf9f5] px-3 py-2 text-sm text-[#141413] placeholder:text-[#b0aea5] focus:border-[#d97757] focus:outline-none focus:ring-1 focus:ring-[#d97757]"
        />
        {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
        <button
          type="submit"
          className="mt-3 w-full cursor-pointer rounded-[6px] bg-[#141413] py-2 text-sm font-medium text-white hover:bg-[#d97757] transition-colors"
        >
          Sign in
        </button>
      </form>
    </div>
  );
}

// ── Main dashboard ────────────────────────────────────────────────────────────

export default function AdminPage() {
  const [adminKey, setAdminKey] = React.useState<string | null>(null);
  const [tab, setTab] = React.useState<"documents" | "leads" | "conversations">("documents");
  const [stats, setStats] = React.useState<Stats | null>(null);
  const [docs, setDocs] = React.useState<Doc[]>([]);
  const [leads, setLeads] = React.useState<Lead[]>([]);
  const [sessions, setSessions] = React.useState<Session[]>([]);
  const [uploading, setUploading] = React.useState(false);
  const [uploadMsg, setUploadMsg] = React.useState("");
  const fileRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    const stored = localStorage.getItem("admin_key") ?? "";
    if (stored) setAdminKey(stored);
  }, []);

  const headers = React.useMemo(
    () => ({ "x-admin-key": adminKey ?? "" }),
    [adminKey]
  );

  const fetchAll = React.useCallback(async () => {
    if (!adminKey) return;
    const [s, d, l, c] = await Promise.all([
      fetch("/api/admin/stats", { headers }).then((r) => r.json()),
      fetch("/api/documents", { headers }).then((r) => r.json()),
      fetch("/api/admin/leads", { headers }).then((r) => r.json()),
      fetch("/api/admin/conversations", { headers }).then((r) => r.json()),
    ]);
    setStats(s);
    setDocs(d.documents ?? []);
    setLeads(l.leads ?? []);
    setSessions(c.sessions ?? []);
  }, [adminKey, headers]);

  React.useEffect(() => { fetchAll(); }, [fetchAll]);

  const handleUpload = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    if (!fd.get("file")) { setUploadMsg("Select a PDF file."); return; }
    setUploading(true);
    setUploadMsg("");
    try {
      const res = await fetch("/api/documents/upload", {
        method: "POST",
        headers,
        body: fd,
      });
      const json = await res.json() as { ok?: boolean; chunks?: number; pages?: number; error?: string };
      if (json.ok) {
        setUploadMsg(`✓ Uploaded — ${json.chunks} chunks, ${json.pages} pages`);
        form.reset();
        fetchAll();
      } else {
        setUploadMsg(`Error: ${json.error}`);
      }
    } catch (err) {
      setUploadMsg(`Upload failed: ${String(err)}`);
    } finally {
      setUploading(false);
    }
  };

  const deleteDoc = async (id: string) => {
    if (!confirm("Delete this document and all its embeddings?")) return;
    await fetch(`/api/documents?id=${id}`, { method: "DELETE", headers });
    fetchAll();
  };

  const updateLeadStatus = async (id: string, status: string) => {
    await fetch(`/api/admin/leads?id=${id}&status=${status}`, { method: "PATCH", headers });
    setLeads((prev) => prev.map((l) => (l.id === id ? { ...l, status } : l)));
  };

  if (!adminKey) return <AuthGate onAuth={setAdminKey} />;

  const TABS = [
    { key: "documents", label: `Documents (${docs.length})` },
    { key: "leads", label: `Leads (${leads.length})` },
    { key: "conversations", label: `Conversations (${sessions.length})` },
  ] as const;

  return (
    <div className="min-h-screen bg-[#faf9f5]">
      {/* Top bar */}
      <div className="border-b border-[#e8e6dc] bg-[#141413] px-6 py-4">
        <div className="mx-auto flex max-w-6xl items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="flex h-8 w-8 items-center justify-center rounded-[4px] bg-[#d97757] text-xs font-bold text-white">
              ME
            </span>
            <span className="font-semibold text-white">Admin Dashboard</span>
          </div>
          <button
            type="button"
            onClick={() => { localStorage.removeItem("admin_key"); setAdminKey(null); }}
            className="cursor-pointer text-xs text-[#787670] hover:text-white transition-colors"
          >
            Sign out
          </button>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-6 py-8">
        {/* Stats row */}
        {stats && (
          <div className="mb-8 grid grid-cols-2 gap-3 sm:grid-cols-5">
            {[
              { label: "Documents", value: stats.documents },
              { label: "Chunks", value: stats.chunks },
              { label: "Sessions", value: stats.sessions },
              { label: "Messages", value: stats.messages },
              { label: "Leads", value: stats.leads },
            ].map((s) => (
              <div
                key={s.label}
                className="rounded-[8px] border border-[#e3dacc] bg-white p-4"
              >
                <p className="text-2xl font-bold text-[#141413]">{s.value}</p>
                <p className="text-xs text-[#787670]">{s.label}</p>
              </div>
            ))}
          </div>
        )}

        {/* Upload form */}
        <details className="mb-6 rounded-[8px] border border-[#e3dacc] bg-white">
          <summary className="cursor-pointer px-5 py-4 font-medium text-[#141413] hover:text-[#d97757] transition-colors">
            + Upload New Paper (PDF)
          </summary>
          <form onSubmit={handleUpload} className="border-t border-[#e8e6dc] px-5 py-4">
            <div className="grid gap-3 sm:grid-cols-2">
              <div>
                <label className="block text-xs font-medium text-[#5e5d59] mb-1">PDF File *</label>
                <input ref={fileRef} name="file" type="file" accept=".pdf" required
                  className="w-full text-sm text-[#141413] file:mr-3 file:rounded-[4px] file:border-0 file:bg-[#d97757] file:px-3 file:py-1.5 file:text-xs file:text-white file:cursor-pointer" />
              </div>
              <div>
                <label className="block text-xs font-medium text-[#5e5d59] mb-1">Title *</label>
                <input name="title" type="text" required placeholder="SentinelEdge: Real-Time Anomaly Detection…"
                  className="w-full rounded-[6px] border border-[#d1cfc5] bg-[#faf9f5] px-3 py-2 text-sm focus:border-[#d97757] focus:outline-none focus:ring-1 focus:ring-[#d97757]" />
              </div>
              <div>
                <label className="block text-xs font-medium text-[#5e5d59] mb-1">Authors (comma-separated)</label>
                <input name="authors" type="text" placeholder="Mehdi Elahi, Co-Author"
                  className="w-full rounded-[6px] border border-[#d1cfc5] bg-[#faf9f5] px-3 py-2 text-sm focus:border-[#d97757] focus:outline-none" />
              </div>
              <div>
                <label className="block text-xs font-medium text-[#5e5d59] mb-1">Year</label>
                <input name="year" type="number" placeholder="2026" min="2000" max="2035"
                  className="w-full rounded-[6px] border border-[#d1cfc5] bg-[#faf9f5] px-3 py-2 text-sm focus:border-[#d97757] focus:outline-none" />
              </div>
              <div>
                <label className="block text-xs font-medium text-[#5e5d59] mb-1">Venue</label>
                <input name="venue" type="text" placeholder="ACM TECS 2026"
                  className="w-full rounded-[6px] border border-[#d1cfc5] bg-[#faf9f5] px-3 py-2 text-sm focus:border-[#d97757] focus:outline-none" />
              </div>
              <div>
                <label className="block text-xs font-medium text-[#5e5d59] mb-1">DOI</label>
                <input name="doi" type="text" placeholder="10.1145/…"
                  className="w-full rounded-[6px] border border-[#d1cfc5] bg-[#faf9f5] px-3 py-2 text-sm focus:border-[#d97757] focus:outline-none" />
              </div>
            </div>
            <div className="mt-3">
              <label className="block text-xs font-medium text-[#5e5d59] mb-1">Abstract</label>
              <textarea name="abstract" rows={3} placeholder="Brief abstract or description…"
                className="w-full rounded-[6px] border border-[#d1cfc5] bg-[#faf9f5] px-3 py-2 text-sm focus:border-[#d97757] focus:outline-none resize-none" />
            </div>
            <div className="mt-3 flex items-center gap-3">
              <button
                type="submit"
                disabled={uploading}
                className="cursor-pointer rounded-[6px] bg-[#141413] px-5 py-2 text-sm font-medium text-white hover:bg-[#d97757] transition-colors disabled:opacity-50"
              >
                {uploading ? "Uploading & embedding…" : "Upload & Index"}
              </button>
              {uploadMsg && (
                <span className={`text-sm ${uploadMsg.startsWith("✓") ? "text-[#788c5d]" : "text-red-600"}`}>
                  {uploadMsg}
                </span>
              )}
            </div>
          </form>
        </details>

        {/* Tab switcher */}
        <div className="mb-4 flex gap-1 rounded-[8px] border border-[#e3dacc] bg-white p-1 w-fit">
          {TABS.map(({ key, label }) => (
            <button
              key={key}
              type="button"
              onClick={() => setTab(key)}
              className={`cursor-pointer rounded-[6px] px-4 py-1.5 text-sm transition-colors ${
                tab === key
                  ? "bg-[#141413] text-white"
                  : "text-[#5e5d59] hover:text-[#141413]"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* ── Documents tab ── */}
        {tab === "documents" && (
          <div className="rounded-[8px] border border-[#e3dacc] bg-white">
            {docs.length === 0 ? (
              <p className="p-6 text-sm text-[#787670]">No documents uploaded yet. Use the form above to add your first paper.</p>
            ) : (
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[#e8e6dc] text-left text-xs text-[#787670]">
                    <th className="px-4 py-3 font-medium">Title</th>
                    <th className="px-4 py-3 font-medium hidden sm:table-cell">Year</th>
                    <th className="px-4 py-3 font-medium hidden md:table-cell">Chunks</th>
                    <th className="px-4 py-3 font-medium">Status</th>
                    <th className="px-4 py-3 font-medium"></th>
                  </tr>
                </thead>
                <tbody>
                  {docs.map((doc, i) => (
                    <tr key={doc.id} className={`border-b border-[#f0eee6] last:border-0 ${i % 2 === 0 ? "" : "bg-[#faf9f5]/50"}`}>
                      <td className="px-4 py-3 font-medium text-[#141413]">
                        {doc.title}
                        {doc.venue && <span className="ml-2 text-xs text-[#787670]">{doc.venue}</span>}
                        {doc.error_msg && <p className="text-[11px] text-red-600 mt-0.5">{doc.error_msg}</p>}
                      </td>
                      <td className="px-4 py-3 text-[#5e5d59] hidden sm:table-cell">{doc.year ?? "—"}</td>
                      <td className="px-4 py-3 text-[#5e5d59] hidden md:table-cell">{doc.chunk_count}</td>
                      <td className="px-4 py-3">
                        <span className={`inline-block rounded-full px-2 py-0.5 text-[11px] font-medium ${
                          doc.status === "ready" ? "bg-[#e8f0e6] text-[#788c5d]"
                          : doc.status === "error" ? "bg-red-50 text-red-700"
                          : "bg-[#fef3cd] text-[#856404]"
                        }`}>
                          {doc.status}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <button
                          type="button"
                          onClick={() => deleteDoc(doc.id)}
                          className="cursor-pointer text-[11px] text-[#b0aea5] hover:text-red-600 transition-colors"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}

        {/* ── Leads tab ── */}
        {tab === "leads" && (
          <div className="rounded-[8px] border border-[#e3dacc] bg-white">
            {leads.length === 0 ? (
              <p className="p-6 text-sm text-[#787670]">No leads yet. The chatbot will capture them when visitors share their contact info.</p>
            ) : (
              <div className="divide-y divide-[#f0eee6]">
                {leads.map((lead) => (
                  <div key={lead.id} className="p-4">
                    <div className="flex flex-wrap items-start justify-between gap-2">
                      <div>
                        <p className="font-medium text-[#141413]">{lead.name ?? "(no name)"}</p>
                        {lead.email && <p className="text-sm text-[#d97757]">{lead.email}</p>}
                        {lead.organization && <p className="text-sm text-[#787670]">{lead.organization}</p>}
                        {lead.message && <p className="mt-1 text-sm text-[#5e5d59]">{lead.message}</p>}
                        {lead.research_interests?.length > 0 && (
                          <div className="mt-1.5 flex flex-wrap gap-1">
                            {lead.research_interests.map((t) => (
                              <span key={t} className="rounded-full bg-[#e8e6dc] px-2 py-0.5 text-[10px] text-[#5e5d59]">{t}</span>
                            ))}
                          </div>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-[11px] text-[#b0aea5]">
                          {new Date(lead.created_at).toLocaleDateString()}
                        </span>
                        <select
                          value={lead.status}
                          onChange={(e) => updateLeadStatus(lead.id, e.target.value)}
                          className="cursor-pointer rounded-[4px] border border-[#d1cfc5] bg-[#faf9f5] px-2 py-1 text-[11px] text-[#141413] focus:border-[#d97757] focus:outline-none"
                        >
                          <option value="new">New</option>
                          <option value="contacted">Contacted</option>
                          <option value="archived">Archived</option>
                        </select>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ── Conversations tab ── */}
        {tab === "conversations" && (
          <div className="space-y-3">
            {sessions.length === 0 ? (
              <div className="rounded-[8px] border border-[#e3dacc] bg-white p-6">
                <p className="text-sm text-[#787670]">No conversations yet.</p>
              </div>
            ) : (
              sessions.map((s) => (
                <details key={s.id} className="rounded-[8px] border border-[#e3dacc] bg-white">
                  <summary className="flex cursor-pointer items-center justify-between px-4 py-3 text-sm">
                    <span className="font-medium text-[#141413]">
                      {s.chat_messages?.length ?? 0} messages
                    </span>
                    <span className="text-[11px] text-[#b0aea5]">
                      {new Date(s.updated_at).toLocaleString()}
                      {s.page_url && ` · ${s.page_url.slice(0, 40)}…`}
                    </span>
                  </summary>
                  <div className="divide-y divide-[#f0eee6] border-t border-[#e8e6dc] max-h-80 overflow-y-auto">
                    {(s.chat_messages ?? []).map((m) => (
                      <div key={m.id} className={`px-4 py-2 ${m.role === "user" ? "bg-[#faf9f5]" : ""}`}>
                        <span className={`mr-2 text-[10px] font-medium uppercase ${m.role === "user" ? "text-[#d97757]" : "text-[#788c5d]"}`}>
                          {m.role}
                        </span>
                        <span className="text-sm text-[#5e5d59]">{m.content}</span>
                      </div>
                    ))}
                  </div>
                </details>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}
