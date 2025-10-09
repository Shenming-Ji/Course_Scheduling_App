type Course = {
    term: string;
    number: string;
    meets: string;
    title: string;
}

type CourseListProps = { 
    courses: Record<string, Course>
    selectedCourses: string[];
    selectCourse: (id: string) => void;
    disabledCourses?: Set<string>;
};

const CourseList = ({ courses, selectedCourses, selectCourse, disabledCourses = new Set<string>() }: CourseListProps) => {
    const entries = Object.entries(courses) as [string, Course][];
    return (
        <section aria-label="Courses" className="p-4">
            <div className="grid grid-cols-[repeat(auto-fill,_minmax(220px,_1fr))] gap-4">
                {entries.map(([key, course]) => {
                    const isSelected = selectedCourses.includes(key);
                    const isDisabled = disabledCourses.has(key);
                    return (
                        <div
                            key={key}
                            onClick={() => {
                                if (isDisabled) return; 
                                selectCourse(key);
                            }}
                            className={`h-full grid grid-rows-[auto_1fr_auto] border rounded-lg p-4 transition ${isSelected ? "bg-purple-100" : "bg-white shadow"} ${isDisabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}>
                        <div className="relative">
                            <div className="font-semibold text-gray-700">
                                {`${course.term} CS${course.number}`}
                            </div>
                            {isDisabled && (
                                <div className="absolute top-0 right-0 text-red-500 font-bold">×</div>
                            )}
                        </div>
                        <div className="font-bold text-gray-800">
                            {course.title}
                        </div>
                        <div className="text-gray-600">
                            {course.meets}
                        </div>
                    </div>
                    );
                })}
            </div>
        </section>
    );
};

export default CourseList;