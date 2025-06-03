import { getConnection } from "@contexts/connection/db";
import { RegisterUserRequest } from "@contexts/models/auth-model";
import { UserService } from "@services/auth-service";
import { Hono } from "hono";
import { ApplicationVariables } from "index";

export const authController = new Hono<{ Bindings: ApplicationVariables }>();

authController.post('/auth/register', async (c) => {
    const request = await c.req.json() as RegisterUserRequest;

    const connection = getConnection(c.env.DATABASE_URL);

    const response = await UserService.register(request, connection);

    return c.json({
        data: response
    })
})