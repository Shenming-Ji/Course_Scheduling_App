import { useEffect, useState } from 'react';
import Banner from './components/Banner';
import { useSchedule } from './utilities/courseScheduleFetch';
import RadioControl from './components/RadioControl';
import EditCourse from './pages/EditCourse';

const App = () => {
  const { schedule, loading, error } = useSchedule("https://courses.cs.northwestern.edu/394/guides/data/cs-courses.php");
  const [route, setRoute] = useState(window.location.pathname);

  useEffect(() => {
    const onPop = () => setRoute(window.location.pathname);
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);

  if (loading) return <div>Schedule Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!schedule) return <div>No schedule available</div>;

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