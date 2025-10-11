import { useState, useEffect } from "react";
import CourseList from "./CourseList";
import { coursesConflict } from "../utilities/timeConflict";
import Modal from "./Modal";

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
  const [selectedCourses, setSelectedCourses] = useState<string[]>([]);
  const [isPlanOpen, setIsPlanOpen] = useState(false);
  const [editCourseId, setEditCourseId] = useState<string | null>(null);
  const [editFormValues, setEditFormValues] = useState({ title: '', meets: '' });

  const allTerms = ["Fall", "Winter", "Spring", "Summer"]
    .filter((term) => Object.values(courses).some((c) => c.term === term));

  useEffect(() => {
    if (allTerms.length > 0 && !allTerms.includes(selectedTerm)) {
      setSelectedTerm(allTerms[0]);
    }
  }, [allTerms, selectedTerm]);

  const selectCourse = (id: string) => {
    setSelectedCourses(prev =>
      prev.includes(id) ? prev.filter(c => c !== id) : [...prev, id]
    );
  };

  const openEditFor = (id: string) => {
    const course = courses[id];
    if (!course) return;
    setEditCourseId(id);
    setEditFormValues({ title: course.title, meets: course.meets });
  };

  const closeEdit = () => {
    setEditCourseId(null);
  };

  const filteredCourses = Object.fromEntries(
    Object.entries(courses).filter(([, course]) => course.term === selectedTerm)
  );

  const selectedCourseObjects = selectedCourses.map((id) => courses[id]);

  const disabledCourseIds = new Set<string>();
  for (const [id, course] of Object.entries(filteredCourses)) {
    for (const selectedId of selectedCourses) {
      const selected = courses[selectedId];
      if (!selected) continue;
      if (coursesConflict(course, selected)) {
        if (!selectedCourses.includes(id)) disabledCourseIds.add(id);
      }
    }
  }

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
              className="accent-purple-600"
            />
            <span>{option}</span>
          </label>
        ))}
      </div>
      
      <button className="ml-218 px-5 py-5 bg-purple-600 text-white rounded"
          onClick={() => setIsPlanOpen(true)}
          >
          Course Plan
        </button>

  <CourseList courses={filteredCourses}
  selectedCourses={selectedCourses} 
  selectCourse={selectCourse}
  disabledCourses={disabledCourseIds}
  openEditFor={openEditFor}
  />

      <Modal isOpen={isPlanOpen} onClose={() => setIsPlanOpen(false)}>
        <h2 className="text-lg">Your Course Plan</h2>

        {selectedCourseObjects.length === 0 ? (
          <p>You haven't selected any courses yet. Click on courses to add them to your plan！</p>
        ) : (
          <ul className="space-y-3">
            {selectedCourseObjects.map((course) => (
              <li key={course.number}>
                <span className="font-medium">{course.number}</span> - {course.title} ({course.meets})
              </li>
            ))}
          </ul>
        )}
      </Modal>

      <Modal isOpen={!!editCourseId} onClose={closeEdit}>
        <h2 className="text-lg">Edit Course</h2>
        <form
          onSubmit={(e) => { e.preventDefault();}}
          className="mt-4 space-y-3"
        >
          <div>
            <label className="block text-sm font-medium text-gray-700">Title</label>
            <input
              type="text"
              value={editFormValues.title}
              onChange={(e) => setEditFormValues(v => ({ ...v, title: e.target.value }))}
              className="mt-1 block w-full border border-gray-300 rounded p-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Meets</label>
            <input
              type="text"
              value={editFormValues.meets}
              onChange={(e) => setEditFormValues(v => ({ ...v, meets: e.target.value }))}
              className="mt-1 block w-full border border-gray-300 rounded p-2"
            />
          </div>

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={closeEdit}
              className="px-3 py-2 bg-gray-200 rounded"
            >
              Cancel
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default RadioControl;
