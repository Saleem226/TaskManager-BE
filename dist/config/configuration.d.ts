declare const _default: () => {
    port: number;
    jwt: {
        secret: string | undefined;
        expiresIn: string | undefined;
    };
    database: {
        postgres: {
            host: string | undefined;
            port: number;
            username: string | undefined;
            password: string | undefined;
            db: string | undefined;
        };
        mongo: string | undefined;
    };
};
export default _default;
