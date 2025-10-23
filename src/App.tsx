import { useEffect, useState } from 'react';
import Banner from './components/Banner';
import RadioControl from './components/RadioControl';
import EditCourse from './pages/EditCourse';
import { getDatabase, ref, set } from 'firebase/database';
import { app } from './firebase';
import useDataQuery from './utilities/useDataQuery';

const App = () => {
  const [courses, loadingCourses, errorCourses] = useDataQuery<Record<string, any>>('/courses');
  const [title, loadingTitle, errorTitle] = useDataQuery<string>('/title');
  const loading = loadingCourses || loadingTitle;
  const error = errorCourses ?? errorTitle;
  const schedule = (courses || null) ? { title: title ?? 'Schedule', courses: courses ?? {} } : null;
  const [route, setRoute] = useState(window.location.pathname);

  useEffect(() => {
    const onPop = () => setRoute(window.location.pathname);
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);

  if (loading) return <div>Schedule Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  const seedSample = async () => {
    const db = getDatabase(app);
    const sampleTitle = 'Sample Schedule';
    const sampleCourses = {
      F101: { term: 'Fall', number: '101', meets: 'MWF 11:00-11:50', title: 'Intro to CS' },
      F110: { term: 'Fall', number: '110', meets: 'MWF 10:00-10:50', title: 'Programming I' }
    };
    await set(ref(db, '/title'), sampleTitle);
    await set(ref(db, '/courses'), sampleCourses);
    window.dispatchEvent(new PopStateEvent('popstate'));
  };

  if (!schedule) {
    return (
      <div className="p-4">
        <Banner title="No schedule" />
        <div className="p-4">
          <p>No schedule available in the Realtime Database root.</p>
          <button className="mt-3 px-3 py-2 bg-purple-600 text-white rounded" onClick={seedSample}>
            Seed sample schedule
          </button>
        </div>
      </div>
    );
  }

  const editMatch = route.match(/^\/edit\/(.+)$/);
  if (editMatch) {
    const id = editMatch[1];
    return (
      <div className="p-4">
        <Banner title={schedule.title} />
        <EditCourse courseId={id} course={schedule.courses[id]} onCancel={() => {
          window.history.pushState({}, '', '/');
          window.dispatchEvent(new PopStateEvent('popstate'));
        }} />
      </div>
    );
  }

  return (
    <div className="p-4">
      <Banner title={schedule.title} />
      <RadioControl courses={schedule.courses} /> 
    </div>
  );
}
export default App;