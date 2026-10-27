import React, { useState } from "react";
import { Arrow, Asterisk } from "./Icons.jsx";
import "./workbench.css";

const tools = ["Text studio", "JSON formatter", "Project brief"];

export default function Workbench() {
  const [tool, setTool] = useState(tools[0]);
  const [text, setText] = useState("");
  const [json, setJson] = useState("");
  const [error, setError] = useState("");
  const [status, setStatus] = useState("");
  const [service, setService] = useState("Web experience");
  const [timeline, setTimeline] = useState("Flexible");
  const [idea, setIdea] = useState("");
  const brief = `Hi Susan,\n\nI'd like to discuss a ${service.toLowerCase()} project.\nTimeline: ${timeline}\n\n${idea.trim() || "My idea: "}\n\nLet's talk about next steps.`;
  const value = tool === tools[0] ? text : tool === tools[1] ? json : brief;
  async function copy() {
    try {
      await navigator.clipboard.writeText(value);
      setStatus("Copied to clipboard.");
    } catch {
      setStatus("Copy unavailable. Select the text and copy it manually.");
    }
  }
  function format(compact) {
    try {
      setJson(JSON.stringify(JSON.parse(json), null, compact ? 0 : 2));
      setError("");
      setStatus(compact ? "JSON minified." : "JSON formatted.");
    } catch {
      setError(
        "That JSON isn’t valid yet. Check quotes, commas, and brackets.",
      );
      setStatus("");
    }
  }
  return (
    <section
      className="workbench section-shell"
      id="tools"
      aria-labelledby="tools-title"
    >
      <div className="section-kicker mono">
        <span>04 / THE INTERACTIVE CORNER</span>
        <Asterisk />
      </div>
      <div className="bench-heading">
        <h2 id="tools-title">
          SMALL TOOLS.
          <br />
          <span className="serif-word">Useful things.</span>
        </h2>
        <p>
          A little less friction in your day.
          <br />
          Try something, make something, start something.
        </p>
      </div>
      <div className="bench-shell">
        <div className="bench-tabs" role="group" aria-label="Choose a tool">
          {tools.map((name, index) => (
            <button
              key={name}
              aria-pressed={tool === name}
              onClick={() => {
                setTool(name);
                setStatus("");
              }}
            >
              <span className="mono">0{index + 1}</span>
              {name}
              <span aria-hidden="true">↗</span>
            </button>
          ))}
        </div>
        <div className="bench-panel">
          <span className="mono bench-label">
            {tool === tools[2]
              ? "FROM AN IDEA TO A CONVERSATION"
              : "RUNS RIGHT HERE IN YOUR BROWSER"}
          </span>
          {tool === tools[0] && (
            <>
              <label htmlFor="studio-text">
                Your words, a little more organized.
              </label>
              <textarea
                id="studio-text"
                value={text}
                onChange={(event) => {
                  setText(event.target.value);
                  setStatus("");
                }}
                placeholder="Paste a draft, a note, or your next big idea…"
              />
              <div className="bench-stats" aria-live="polite">
                <span>
                  {text.trim() ? text.trim().split(/\s+/u).length : 0} words
                </span>
                <span>{Array.from(text).length} characters</span>
                <span>
                  {text.trim()
                    ? Math.max(
                        1,
                        Math.ceil(text.trim().split(/\s+/u).length / 200),
                      )
                    : 0}{" "}
                  min read
                </span>
              </div>
              <div className="bench-actions">
                <button onClick={() => setText(text.toUpperCase())}>
                  UPPERCASE
                </button>
                <button onClick={() => setText(text.toLowerCase())}>
                  lowercase
                </button>
                <button
                  onClick={() =>
                    setText(
                      text
                        .trim()
                        .replace(/[\t ]+/g, " ")
                        .replace(/\n{3,}/g, "\n\n"),
                    )
                  }
                >
                  Clean spacing
                </button>
              </div>
            </>
          )}
          {tool === tools[1] && (
            <>
              <label htmlFor="json-text">
                Give your data some breathing room.
              </label>
              <textarea
                id="json-text"
                className="code-input"
                spellCheck={false}
                value={json}
                aria-invalid={Boolean(error)}
                aria-describedby={error ? "json-error" : undefined}
                onChange={(event) => {
                  setJson(event.target.value);
                  setError("");
                  setStatus("");
                }}
                placeholder={'{"hello":"world","ready":true}'}
              />
              {error && (
                <p id="json-error" className="bench-error" role="alert">
                  {error}
                </p>
              )}
              <div className="bench-actions">
                <button onClick={() => format(false)}>Format JSON</button>
                <button onClick={() => format(true)}>Minify JSON</button>
              </div>
            </>
          )}
          {tool === tools[2] && (
            <>
              <div className="brief-fields">
                <label>
                  What are we building?
                  <select
                    value={service}
                    onChange={(event) => setService(event.target.value)}
                  >
                    {[
                      "Web experience",
                      "Full-stack application",
                      "API integration",
                      "Digital tool",
                      "Performance review",
                    ].map((name) => (
                      <option key={name}>{name}</option>
                    ))}
                  </select>
                </label>
                <label>
                  Ideal timeline
                  <select
                    value={timeline}
                    onChange={(event) => setTimeline(event.target.value)}
                  >
                    {[
                      "Flexible",
                      "Within a month",
                      "1–3 months",
                      "Just exploring",
                    ].map((name) => (
                      <option key={name}>{name}</option>
                    ))}
                  </select>
                </label>
              </div>
              <label htmlFor="brief-idea">
                Tell me a little about the idea
              </label>
              <textarea
                id="brief-idea"
                value={idea}
                onChange={(event) => setIdea(event.target.value)}
                placeholder="Who is it for? What should it help them do?"
                maxLength={3000}
              />
              <details className="brief-preview">
                <summary>Preview your brief</summary>
                <pre>{brief}</pre>
              </details>
              <a
                className="bench-send"
                href={`mailto:susan.pandit98@gmail.com?subject=${encodeURIComponent(`Project inquiry: ${service}`)}&body=${encodeURIComponent(brief)}`}
              >
                Open email with brief <Arrow />
              </a>
              <p className="bench-note">
                Opens your email app. You review and send it there.
              </p>
            </>
          )}
          <div className="bench-bottom">
            <button onClick={copy} disabled={!value}>
              Copy {tool === tools[2] ? "brief" : "result"} ↗
            </button>
            {tool !== tools[2] && (
              <button
                onClick={() => {
                  tool === tools[0] ? setText("") : setJson("");
                  setError("");
                  setStatus("");
                }}
              >
                Clear
              </button>
            )}
            <span role="status">{status}</span>
          </div>
        </div>
      </div>
      <p className="bench-note mono">
        NO SIGN-UP. NO UPLOADS. JUST A FEW HANDY UTILITIES.
      </p>
    </section>
  );
}
