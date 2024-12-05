declare namespace NodeJS {
    interface ProcessEnv {
      PORT: string;
      DB_HOST: string;
      DB_USER: string;
      DB_PASS: string;
      DB_NAME: string;
      NODE_ENV: 'development' | 'production' | 'test';
    }
  }
  