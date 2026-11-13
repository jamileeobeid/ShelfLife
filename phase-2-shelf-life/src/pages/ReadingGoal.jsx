import { useState } from "react";
import "./ReadingGoal.css";

const INITIAL_VALUES = { name: "", goal: "", timeframe: "", motivation: "" };

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

function ReadingGoal() {
  const [values, setValues] = useState(INITIAL_VALUES);
  const [touched, setTouched] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [savedGoal, setSavedGoal] = useState(null);
  const errors = validate(values);

  function update(field, value) {
    setValues((previous) => ({ ...previous, [field]: value }));
    setSavedGoal(null);
  }

  function handleSubmit(event) {
    event.preventDefault();
    setSubmitted(true);
    setTouched({ name: true, goal: true, timeframe: true, motivation: true });
    if (Object.keys(validate(values)).length !== 0) return;
    setSavedGoal({
      name: values.name.trim(),
      goal: Number(values.goal),
      timeframe: values.timeframe,
      motivation: values.motivation.trim(),
    });
    setSubmitted(false);
  }

  function fieldError(field) {
    return (submitted || touched[field]) && errors[field] ? errors[field] : null;
  }

  return (
    <div className="reading-goal-page">
      <header className="reading-goal-header">
        <p className="reading-goal-eyebrow">SHELFLIFE · READING JOURNEY</p>
        <h1>Set a Reading Goal</h1>
        <p>Make a plan for your next chapter.</p>
      </header>
      <div className="reading-goal-content">
        <form className="reading-goal-form" onSubmit={handleSubmit} noValidate>
          <p className="reading-goal-intro">Fields marked * are required.</p>
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
          <div className="reading-goal-field">
            <label htmlFor="goal-motivation">Motivation (optional)</label>
            <textarea id="goal-motivation" name="motivation" rows="3" value={values.motivation}
              onChange={(e) => update("motivation", e.target.value)}
              onBlur={() => setTouched((prev) => ({ ...prev, motivation: true }))}
              aria-invalid={Boolean(fieldError("motivation"))}
              aria-describedby={fieldError("motivation") ? "goal-motivation-error" : undefined}
              placeholder="Why do you want to read more?" />
            <span className="reading-goal-hint">{values.motivation.trim().length}/250 characters</span>
            {fieldError("motivation") && <p id="goal-motivation-error" className="reading-goal-error" role="alert">{fieldError("motivation")}</p>}
          </div>
          <button type="submit" className="reading-goal-submit">Set My Goal</button>
        </form>
        {savedGoal && (
          <section className="reading-goal-success" role="status" aria-live="polite">
            <h2>Reading goal set!</h2>
            <p>{savedGoal.name}, your goal is to read <strong>{savedGoal.goal} {savedGoal.goal === 1 ? "book" : "books"}</strong> {savedGoal.timeframe === "month" ? "this month" : "this year"}.</p>
            {savedGoal.motivation && <p>Your motivation: {savedGoal.motivation}</p>}
            <p className="reading-goal-note">This confirmation is for the current session. Saving goals between visits can be added when the team's persistence feature is integrated.</p>
          </section>
        )}
      </div>
    </div>
  );
}

export default ReadingGoal;
