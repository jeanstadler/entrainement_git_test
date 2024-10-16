import { defineConfig, loadEnv } from 'vite'
import dotenv from "dotenv"

export default defineConfig(({ command, mode }) => {
    dotenv.config({ path: ".env.test" });
    // console.log(process.env);
    // avec github actions, modifier l'hote mysql
    if(process.env.GITHUB_ACTION){
        process.env.MYSQL_HOST = "127.0.0.1";
    }
    return {
        define: {
            // __APP_ENV_
        },
        test: {
            coverage: {
                reportsDirectory: "__tests__/__coverage__",
                exclude: ["__tests__", "dist", "mongodb", "vite.config.js", "src/index.ts"],
            },
        },
    };
})