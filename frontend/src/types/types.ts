declare global {
  interface IKeyValue {
    [key: string]: string | undefined;
  }

  interface IUser {
    user_id: string;
    username: string;
    email: string;
  }
}

export {};
