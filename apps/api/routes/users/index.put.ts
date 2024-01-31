import { eq } from "drizzle-orm";
import { updateUserSchema } from "@linqx/shared";

import { db } from "../../db/connection";
import { users } from "../../db/schemas";

export default defineEventHandler(async (event) => {
  if (!event.context.user) {
    return setResponseStatus(event, 401);
  }

  const bodyValidated = updateUserSchema.safeParse(await readBody(event));
  if (!bodyValidated.success) {
    return setResponseStatus(event, 400);
  }

  try {
    await db
      .update(users)
      .set(bodyValidated.data)
      .where(eq(users.id, event.context.user.id));
  } catch (err) {
    console.log("[UPDATE_USER]: Failed to update user:", err);

    return setResponseStatus(event, 500);
  }
});