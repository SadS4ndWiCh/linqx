import { z } from "zod";
import { eq } from "drizzle-orm";
import { Argon2id } from "oslo/password";

import { db } from "../../db/connection";
import { users } from "../../db/schemas";

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6)
});

export default defineEventHandler(async (event) => {
  const bodyValidated = loginSchema.safeParse(await readBody(event));
  if (!bodyValidated.success) {
    return setResponseStatus(event, 400);
  }

  try {
    const user = await db
      .select()
      .from(users)
      .where(eq(users.email, bodyValidated.data.email))
      .get();
    
    if (!user) {
      return event.respondWith(
        new Response(JSON.stringify({ error: "INVALID_CREDENTIALS" }), { status: 400 })
      );
    }

    if (!await new Argon2id().verify(user.hashedPassword, bodyValidated.data.password)) {
      return event.respondWith(
        new Response(JSON.stringify({ error: "INVALID_CREDENTIALS" }), { status: 400 })
      );
    }

    const session = await lucia.createSession(user.id, {});

    return { token: session.id }
  } catch (err) {
    console.log("[LOGIN]: Failed to login:", err);

    return setResponseStatus(event, 500);
  }
});