import { useState, useEffect } from "react";
import CourseList from "./CourseList";

type Course = {
  term: string;
  number: string;
  meets: string;
  title: string;
};

type RadioControlProps = {
  courses: Record<string, Course>;
};

const RadioControl = ({ courses }: RadioControlProps) => {
  const [selectedTerm, setSelectedTerm] = useState<string>("Fall");

  const allTerms = ["Fall", "Winter", "Spring", "Summer"]
    .filter((term) => Object.values(courses).some((c) => c.term === term));

  useEffect(() => {
    if (allTerms.length > 0 && !allTerms.includes(selectedTerm)) {
      setSelectedTerm(allTerms[0]);
    }
  }, [allTerms, selectedTerm]);

  const filteredCourses = Object.fromEntries(
    Object.entries(courses).filter(([, course]) => course.term === selectedTerm)
  );

  return (
    <div>
      <div className="flex gap-4 my-4" style={{ marginLeft: '1.3rem' }}>
        {allTerms.map((option) => (
          <label key={option} className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="term"
              value={option}
              checked={option === selectedTerm}
              onChange={() => setSelectedTerm(option)}
              className="accent-blue-600"
            />
            <span>{option}</span>
          </label>
        ))}
      </div>

      <CourseList courses={filteredCourses} />
    </div>
  );
};

export default RadioControl;
