import { eq } from "drizzle-orm";
import { db } from "../../db/connection";
import { collections } from "../../db/schemas";

export default defineEventHandler(async (event) => {
  if (!event.context.user) {
    return setResponseStatus(event, 401);
  }

  try {
    return await db
      .select()
      .from(collections)
      .where(eq(collections.userId, event.context.user.id));
  } catch (err) {
    console.log("GET_ALL_COLLECTIONS: Failed to get all collections:", err);

    return setResponseStatus(event, 500);
  }
});