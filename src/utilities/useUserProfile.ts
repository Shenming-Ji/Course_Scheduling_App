import { } from 'react';
import { useAuthState } from './firebase';
import useDataQuery from './useDataQuery';

export function useIsAdmin() {
  const { user, isInitialLoading } = useAuthState();
  const uid = user?.uid;

  if (!uid) {
    return { isAdmin: false, loading: isInitialLoading, user };
  }

  const [data, loading, error] = useDataQuery<boolean>(`/admins/${uid}`);
  const isAdmin = !!data;
  return { isAdmin, loading: isInitialLoading || loading, error, user };
}

export default useIsAdmin;
