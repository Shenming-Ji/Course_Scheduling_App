import Banner from './components/Banner';
import { useSchedule } from './utilities/courseScheduleFetch';
import RadioControl from './components/RadioControl';

const App = () => {
  const { schedule, loading, error } = useSchedule("https://courses.cs.northwestern.edu/394/guides/data/cs-courses.php");

  if (loading) return <div>Schedule Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!schedule) return <div>No schedule available</div>;

  return (
    <div className="p-4">
      <Banner title={schedule.title} />
      <RadioControl courses={schedule.courses} /> 
    </div>
  );
}
export default App;