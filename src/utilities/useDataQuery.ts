import { useEffect, useState } from 'react';
import { onValue, ref, getDatabase } from 'firebase/database';

type UseDataQueryResult<T> = [T | undefined, boolean, Error | undefined];

export function useDataQuery<T = unknown>(path: string): UseDataQueryResult<T> {
  const [data, setData] = useState<T | undefined>(undefined);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | undefined>(undefined);

  useEffect(() => {
    let canceled = false;
    setData(undefined);
    setLoading(true);
    setError(undefined);

  const db = getDatabase();
    const r = ref(db, path);

    const unsubscribe = onValue(
      r,
      (snapshot: any) => {
        if (canceled) return;
        setData(snapshot.val() as T);
        setLoading(false);
      },
      (err: any) => {
        if (canceled) return;
        setError(err as Error);
        setLoading(false);
      }
    );

    return () => {
      canceled = true;
      unsubscribe();
    };
  }, [path]);

  return [data, loading, error];
}

export default useDataQuery;
