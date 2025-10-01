import Banner from './components/Banner';
import CourseList from './components/CourseList';
import { useSchedule } from './utilities/courseScheduleFetch';


const App = () => {
  const { schedule, loading, error } = useSchedule("https://courses.cs.northwestern.edu/394/guides/data/cs-courses.php");

  if (loading) return <div>Schedule Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!schedule) return <div>No schedule available</div>;

  return (
  <div>
    <Banner title={schedule.title} />
    <CourseList courses={schedule.courses} />
  </div>
  );
}
export default App;