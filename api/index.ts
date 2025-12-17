import app from "../src/app.js";
import initDB from "../src/config/db.js";

let isAppInitialized = false;

const handler = async (req: any, res: any) => {
    try {
        if (!isAppInitialized) {
        await initDB();
        isAppInitialized = true;
        console.log("Database initialized successfully.");
        }

        app(req as any, res as any);
    } catch (error) {
        console.error("Error during database initialization:", error);
    }
    return app(req as any, res as any);
};

export default handler;