import { eq } from "drizzle-orm";

import { db } from "../../db/connection";
import { users } from "../../db/schemas";

export default defineEventHandler(async (event) => {
  if (!event.context.user) {
    return setResponseStatus(event, 401);
  }

  try {
    const user = await db
      .select({
        id: users.id,
        username: users.username,
        email: users.email
      })
      .from(users)
      .where(eq(users.id, event.context.user.id))
      .get();
    
    if (!user) {
      return setResponseStatus(event, 404);
    }

    return user;
  } catch (err) {
    console.log("[GET_USER]: Failed to get user data:", err);

    return setResponseStatus(event, 500);
  }
});