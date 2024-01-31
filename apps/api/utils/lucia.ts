import { Lucia, TimeSpan } from "lucia";
import { DrizzleSQLiteAdapter } from "@lucia-auth/adapter-drizzle";

import { db } from "../db/connection";
import { users } from "../db/schemas/users";
import { sessions } from "../db/schemas/sessions";

import { env } from "./env";

const adapter = new DrizzleSQLiteAdapter(db, sessions, users);

export const lucia = new Lucia(adapter, {
	sessionCookie: {
		attributes: {
			secure: env.NODE_ENV === "production"
		}
	},
  sessionExpiresIn: new TimeSpan(1, "w"),
  getUserAttributes: (attributes) => ({
    username: attributes.username,
    email: attributes.email
  })
});

declare module "lucia" {
	interface Register {
		Lucia: typeof lucia;
    DatabaseUserAttributes: {
      username: string;
      email: string;
    };
	}
}