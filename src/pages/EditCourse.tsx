import { useState } from 'react';

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Edit Course {courseId}</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Term</label>
          <input value={term} onChange={(e) => setTerm(e.target.value)} className="mt-1 block w-full border rounded px-2 py-1" />
        </div>

        <div>
          <label className="block text-sm font-medium">Number</label>
          <input value={number} onChange={(e) => setNumber(e.target.value)} className="mt-1 block w-full border rounded px-2 py-1" />
        </div>

        <div>
          <label className="block text-sm font-medium">Meets</label>
          <input value={meets} onChange={(e) => setMeets(e.target.value)} className="mt-1 block w-full border rounded px-2 py-1" />
        </div>

        <div>
          <label className="block text-sm font-medium">Title</label>
          <input value={title} onChange={(e) => setTitle(e.target.value)} className="mt-1 block w-full border rounded px-2 py-1" />
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
