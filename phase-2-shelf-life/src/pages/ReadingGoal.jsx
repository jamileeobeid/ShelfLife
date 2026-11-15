import { useState } from "react";
import "./ReadingGoal.css";

const INITIAL_VALUES = { name: "", goal: "", timeframe: "", motivation: "" };
const STORAGE_KEY = "shelflife-reading-goal";

function validate(values) {
  const errors = {};
  const name = values.name.trim();
  const motivation = values.motivation.trim();
  const goal = Number(values.goal);

  if (!name) errors.name = "Reader name is required.";
  else if (name.length < 2) errors.name = "Reader name must contain at least 2 characters.";
  else if (name.length > 50) errors.name = "Reader name must be 50 characters or fewer.";

  if (values.goal.trim() === "") errors.goal = "Reading goal is required. Enter a number of books.";
  else if (!Number.isInteger(goal) || goal < 1 || goal > 365)
    errors.goal = "Reading goal must be a whole number between 1 and 365 books.";

  if (!values.timeframe) errors.timeframe = "Timeframe is required. Choose a period for your goal.";
  else if (!["month", "year"].includes(values.timeframe)) errors.timeframe = "Choose a valid timeframe.";

  if (motivation.length > 250) errors.motivation = "Motivation must be 250 characters or fewer.";
  return errors;
}

function loadSavedGoal() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return null;
    return JSON.parse(saved);
  } catch {
    return null;
  }
}

function ReadingGoal() {
  const [values, setValues] = useState(INITIAL_VALUES);
  const [touched, setTouched] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [savedGoal, setSavedGoal] = useState(loadSavedGoal);
  const errors = validate(values);

  function update(field, value) {
    setValues((previous) => ({ ...previous, [field]: value }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    setSubmitted(true);
    setTouched({ name: true, goal: true, timeframe: true, motivation: true });
    if (Object.keys(validate(values)).length !== 0) return;

    const goal = {
      name: values.name.trim(),
      goal: Number(values.goal),
      timeframe: values.timeframe,
      motivation: values.motivation.trim(),
    };

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(goal));
    } catch {
    }

    setSavedGoal(goal);
    setValues(INITIAL_VALUES);
    setTouched({});
    setSubmitted(false);
  }

  function handleClear() {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
    }
    setSavedGoal(null);
  }

  function fieldError(field) {
    return (submitted || touched[field]) && errors[field] ? errors[field] : null;
  }

  return (
    <div className="reading-goal-page">
      <header className="reading-goal-header">
        <div className="reading-goal-header-inner">
          <div>
            <p className="reading-goal-eyebrow">SHELFLIFE · READING JOURNEY</p>
            <h1>Set a Reading Goal</h1>
            <p>Make a plan for your next chapter.</p>
          </div>
          <div className="reading-goal-header-stats">
            <div className="rg-stat">
              <span className="rg-stat-num">365</span>
              <span className="rg-stat-label">days in a year</span>
            </div>
            <div className="rg-stat-divider" />
            <div className="rg-stat">
              <span className="rg-stat-num">1</span>
              <span className="rg-stat-label">book at a time</span>
            </div>
            <div className="rg-stat-divider" />
            <div className="rg-stat">
              <span className="rg-stat-num">∞</span>
              <span className="rg-stat-label">worlds to explore</span>
            </div>
          </div>
        </div>
      </header>

      <div className="reading-goal-body">

        <div className="reading-goal-form-col">
          {savedGoal && (
            <section className="reading-goal-success" role="status" aria-live="polite">
              <div className="reading-goal-success-top">
                <h2>Your Current Goal</h2>
                <button type="button" className="reading-goal-clear" onClick={handleClear}>
                  Clear Goal
                </button>
              </div>
              <p>
                <strong>{savedGoal.name}</strong>, your goal is to read{" "}
                <strong>{savedGoal.goal} {savedGoal.goal === 1 ? "book" : "books"}</strong>{" "}
                {savedGoal.timeframe === "month" ? "this month" : "this year"}.
              </p>
              {savedGoal.motivation && (
                <p className="reading-goal-motivation">"{savedGoal.motivation}"</p>
              )}
            </section>
          )}

          <form className="reading-goal-form" onSubmit={handleSubmit} noValidate>
            <p className="reading-goal-intro">
              {savedGoal ? "Update your goal below." : "Fields marked * are required."}
            </p>

            <div className="reading-goal-field">
              <label htmlFor="reader-name">Reader name *</label>
              <input id="reader-name" name="name" value={values.name}
                onChange={(e) => update("name", e.target.value)}
                onBlur={() => setTouched((prev) => ({ ...prev, name: true }))}
                aria-invalid={Boolean(fieldError("name"))}
                aria-describedby={fieldError("name") ? "reader-name-error" : undefined}
                placeholder="Your name" maxLength={60} />
              {fieldError("name") && <p id="reader-name-error" className="reading-goal-error" role="alert">{fieldError("name")}</p>}
            </div>

            <div className="reading-goal-row">
              <div className="reading-goal-field">
                <label htmlFor="books-goal">Number of books *</label>
                <input id="books-goal" name="goal" type="number" min="1" max="365" step="1"
                  value={values.goal} onChange={(e) => update("goal", e.target.value)}
                  onBlur={() => setTouched((prev) => ({ ...prev, goal: true }))}
                  aria-invalid={Boolean(fieldError("goal"))}
                  aria-describedby={fieldError("goal") ? "books-goal-error" : undefined}
                  placeholder="e.g. 12" />
                {fieldError("goal") && <p id="books-goal-error" className="reading-goal-error" role="alert">{fieldError("goal")}</p>}
              </div>

              <div className="reading-goal-field">
                <label htmlFor="goal-timeframe">Timeframe *</label>
                <select id="goal-timeframe" name="timeframe" value={values.timeframe}
                  onChange={(e) => update("timeframe", e.target.value)}
                  onBlur={() => setTouched((prev) => ({ ...prev, timeframe: true }))}
                  aria-invalid={Boolean(fieldError("timeframe"))}
                  aria-describedby={fieldError("timeframe") ? "goal-timeframe-error" : undefined}>
                  <option value="">Choose a timeframe</option>
                  <option value="month">This month</option>
                  <option value="year">This year</option>
                </select>
                {fieldError("timeframe") && <p id="goal-timeframe-error" className="reading-goal-error" role="alert">{fieldError("timeframe")}</p>}
              </div>
            </div>

            <div className="reading-goal-divider" />

            <div className="reading-goal-field">
              <label htmlFor="goal-motivation">Motivation <span className="reading-goal-optional">(optional)</span></label>
              <textarea id="goal-motivation" name="motivation" rows="3" value={values.motivation}
                onChange={(e) => update("motivation", e.target.value)}
                onBlur={() => setTouched((prev) => ({ ...prev, motivation: true }))}
                aria-invalid={Boolean(fieldError("motivation"))}
                aria-describedby={fieldError("motivation") ? "goal-motivation-error" : undefined}
                placeholder="Why do you want to read more?" />
              <span className="reading-goal-hint">{values.motivation.trim().length}/250 characters</span>
              {fieldError("motivation") && <p id="goal-motivation-error" className="reading-goal-error" role="alert">{fieldError("motivation")}</p>}
            </div>

            <div className="reading-goal-actions">
              <button type="submit" className="reading-goal-submit">
                {savedGoal ? "Update Goal" : "Set My Goal"}
              </button>
            </div>
          </form>
        </div>

        <aside className="reading-goal-panel">
          <div className="rg-panel-card">
            <p className="rg-panel-eyebrow">Why set a goal?</p>
            <ul className="rg-panel-list">
              <li>Keeps you accountable to your reading habit</li>
              <li>Helps you discover more books across genres</li>
              <li>Gives you a milestone to look forward to</li>
            </ul>
          </div>

          <div className="rg-panel-card rg-panel-quote">
            <p className="rg-quote-text">"A reader lives a thousand lives before he dies. The man who never reads lives only one."</p>
            <p className="rg-quote-author">— George R.R. Martin</p>
          </div>

          <div className="rg-panel-card">
            <p className="rg-panel-eyebrow">Reading benchmarks</p>
            <div className="rg-benchmarks">
              <div className="rg-benchmark">
                <span className="rg-benchmark-num">12</span>
                <span className="rg-benchmark-label">books/year — 1 a month</span>
              </div>
              <div className="rg-benchmark">
                <span className="rg-benchmark-num">24</span>
                <span className="rg-benchmark-label">books/year — avid reader</span>
              </div>
              <div className="rg-benchmark">
                <span className="rg-benchmark-num">52</span>
                <span className="rg-benchmark-label">books/year — 1 a week</span>
              </div>
            </div>
          </div>
        </aside>

      </div>
    </div>
  );
}

export default ReadingGoal;
