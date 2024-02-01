import { generateId } from "lucia";
import { Argon2id } from "oslo/password";
import { LibsqlError } from "@libsql/client";
import { registerSchema } from "@linqx/shared";

import { db } from "../../db/connection";
import { users } from "../../db/schemas";

export default defineEventHandler(async (event) => {
  const bodyValidated = registerSchema.safeParse(await readBody(event));
  if (!bodyValidated.success) {
    return setResponseStatus(event, 400);
  }

  const userId = generateId(15);
  const hashedPassword = await new Argon2id().hash(bodyValidated.data.password);

  try {
    await db
      .insert(users)  
      .values({
        id: userId,
        username: bodyValidated.data.username,
        email: bodyValidated.data.email,
        hashedPassword
      });
    
    return event.respondWith(new Response(null, { status: 201 }));
  } catch (err) {
    if (err instanceof LibsqlError) {
      switch (err.code) {
        case "SQLITE_CONSTRAINT": return event.respondWith(
            new Response(JSON.stringify({ error: "USER_ALREADY_EXISTS" }), { status: 409 })
          )
      }
    }

    console.log("[REGISTER]: Failed to register a new account:", err);

    return setResponseStatus(event, 500);
  }
});