import swaggerJsdoc, { SwaggerDefinition } from "swagger-jsdoc";
import { ENV } from "./env.config";


const swaggerDefinition: SwaggerDefinition = {
    openapi: "3.1.0",
    info: {
        title: "Oniko Backend",
        version: "1.0.0",
    },
    servers: [
        {
            url: `${ENV.APP_DOMAIN}/`,
            description: "Local Server"
        }
    ],
    components: {
        securitySchemes: {
            bearerAuth: {
                type: "http",
                scheme: "bearer",
                bearerFormat: "JWT",
            },
        },
    },
    security:  [{bearerAuth: []}]


    
}

const options = {
    swaggerDefinition,
    apis: ["src/api/**/*.controller.ts"]

}


const specs = swaggerJsdoc(options)

export default specs;