type Course = {
    term: string;
    number: string;
    meets: string;
    title: string;
}

type CourseListProps = { 
    courses: Record<string, Course>
};

const CourseList = ({ courses }: CourseListProps) => {
    const entries = Object.entries(courses) as [string, Course][];
    return (
        <section>
            {entries.map(([key, course]) => (
                <div key={key}>
                    {`${course.term} CS${course.number}: ${course.title}`}
                </div>
            ))}
        </section>
    );
};

export default CourseList;