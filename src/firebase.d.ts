declare module './firebase' {
  import { Database } from 'firebase/database';
  export const app: any;
  export const db: any;
  export const realtimeDb: Database;
}
