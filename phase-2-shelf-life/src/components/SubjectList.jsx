function SubjectList({ subjects }) {
  return (
    <section className="details-section">
      <h2>Subjects</h2>

      <div className="subject-list">
        {subjects.map((subject) => (
          <span key={subject} className="subject-tag">
            {subject}
          </span>
        ))}
      </div>
    </section>
  );
}

export default SubjectList;