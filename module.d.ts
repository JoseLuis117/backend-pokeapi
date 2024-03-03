declare namespace NodeJS {
    export interface ProcessEnv {
        jwtSecretTokenKey: string;
        jwtRefreshToken: string;
        DATABASE_URL:string;
    }
}