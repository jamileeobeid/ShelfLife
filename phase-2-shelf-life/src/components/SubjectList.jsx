function SubjectList({ subjects }) {
  return (
    <section className="subjects-section">
      <h2>Subjects</h2>

      <div className="subject-tags">
        {subjects.map((subject) => (
          <span className="subject-tag" key={subject}>
            {subject}
          </span>
        ))}
      </div>
    </section>
  );
}

export default SubjectList;