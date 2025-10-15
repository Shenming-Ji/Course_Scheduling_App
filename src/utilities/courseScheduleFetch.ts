import { useEffect, useState } from "react";
import useDataQuery from './useDataQuery';

type Course = {
  term: string;
  number: string;
  meets: string;
  title: string;
};

type Schedule = {
  title: string;
  courses: Record<string, Course>;
};

export function useSchedule(url: string) {
  // If url looks like an http(s) URL, keep existing fetch behavior for backwards compatibility.
  const isHttp = /^https?:\/\//i.test(url);

  if (isHttp) {
    const [schedule, setSchedule] = useState<Schedule | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
      let isMounted = true;

      const fetchData = async () => {
        setLoading(true);
        setError(null);

        try {
          const response = await fetch(url);
          if (!response.ok) {
            throw new Error(`HTTP error ${response.status}`);
          }
          const json = await response.json();
          if (isMounted) {
            setSchedule(json);
          }
        } catch (err) {
          if (isMounted) {
            setError(err as Error);
          }
        } finally {
          if (isMounted) {
            setLoading(false);
          }
        }
      };

      fetchData();

      return () => {
        isMounted = false;
      };
    }, [url]);

    return { schedule, loading, error };
  }

  // Otherwise treat `url` as a Realtime Database path and use the useDataQuery hook.
  const [data, dbLoading, dbError] = useDataQuery<Schedule>(url);
  return { schedule: (data ?? null), loading: dbLoading, error: dbError ?? null };
}
