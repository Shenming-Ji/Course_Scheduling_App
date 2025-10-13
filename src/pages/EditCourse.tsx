import { useState } from 'react';
import { parseMeeting } from '../utilities/timeConflict';

type Course = {
  term: string;
  number: string;
  meets: string;
  title: string;
};

type EditCourseProps = {
  courseId: string;
  course?: Course;
  onCancel: () => void;
};

const EditCourse = ({ courseId, course, onCancel }: EditCourseProps) => {
  const [term, setTerm] = useState(course?.term ?? '');
  const [number, setNumber] = useState(course?.number ?? '');
  const [meets, setMeets] = useState(course?.meets ?? '');
  const [title, setTitle] = useState(course?.title ?? '');
  const [errors, setErrors] = useState<{ [k: string]: string }>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const data = { term, number, meets, title };
    const next = validateCourse(data);
    setErrors(next);
    if (Object.keys(next).length > 0) {
      // don't submit when invalid
      return;
    }
    // per spec: no-op submit when valid
  };

  function validateCourse({ term, number, meets, title }: { term: string; number: string; meets: string; title: string }) {
    const out: { [k: string]: string } = {};
    // title at least 2 chars
    if (!title || title.trim().length < 2) {
      out.title = 'Title must be at least 2 characters';
    }
    // term must be one of these
    const terms = ['Fall', 'Winter', 'Spring', 'Summer'];
    if (!terms.includes(term)) {
      out.term = 'Term must be Fall, Winter, Spring, or Summer';
    }
    // number: digits with optional -section, e.g., "213-2"
    if (!/^\d+(?:-\d+)?$/.test(number)) {
      out.number = 'Number must be numeric with optional section, e.g., "213" or "213-2"';
    }
    // meets: empty or legal meeting string
    if (meets && meets.trim() !== '') {
      const parsed = parseMeeting(meets);
      if (!parsed) {
        out.meets = 'Must contain days and start-end, e.g., MWF 12:00-13:20';
      }
    }
    return out;
  }

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Edit Course {courseId}</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Term</label>
          <select
            value={term}
            onChange={(e) => { setTerm(e.target.value); setErrors(v => ({ ...v, term: '' })); }}
            className={`mt-1 block w-full border rounded px-2 py-1 ${errors.term ? 'border-red-500' : ''}`}
          >
            <option value="">Select term</option>
            <option value="Fall">Fall</option>
            <option value="Winter">Winter</option>
            <option value="Spring">Spring</option>
            <option value="Summer">Summer</option>
          </select>
          {errors.term && <p className="text-red-600 text-sm mt-1">{errors.term}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium">Number</label>
          <input value={number} onChange={(e) => { setNumber(e.target.value); setErrors(v => ({ ...v, number: '' })); }} className={`mt-1 block w-full border rounded px-2 py-1 ${errors.number ? 'border-red-500' : ''}`} />
          {errors.number && <p className="text-red-600 text-sm mt-1">{errors.number}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium">Meets</label>
          <input value={meets} onChange={(e) => { setMeets(e.target.value); setErrors(v => ({ ...v, meets: '' })); }} className={`mt-1 block w-full border rounded px-2 py-1 ${errors.meets ? 'border-red-500' : ''}`} />
          {errors.meets && <p className="text-red-600 text-sm mt-1">{errors.meets}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium">Title</label>
          <input value={title} onChange={(e) => { setTitle(e.target.value); setErrors(v => ({ ...v, title: '' })); }} className={`mt-1 block w-full border rounded px-2 py-1 ${errors.title ? 'border-red-500' : ''}`} />
          {errors.title && <p className="text-red-600 text-sm mt-1">{errors.title}</p>}
        </div>

        <div className="flex gap-3">
          <button type="button" onClick={onCancel} className="px-4 py-2 border rounded">Cancel</button>
          <button type="submit" className="px-4 py-2 bg-purple-600 text-white rounded">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default EditCourse;
