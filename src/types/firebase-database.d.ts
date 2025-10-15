declare module 'firebase/database' {
  export function onValue(ref: any, cb: (snap: any) => void, err?: (e: any) => void): () => void;
  export function ref(db: any, path: string): any;
  export function getDatabase(app?: any): any;
}
