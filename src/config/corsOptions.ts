import cors from "cors";

export const corsOptions: cors.CorsOptions = {
    origin: "*",
    methods: ["GET", "POST", "PATCH", "DELETE", "PUT"],
    credentials: true,
    optionsSuccessStatus: 200
}