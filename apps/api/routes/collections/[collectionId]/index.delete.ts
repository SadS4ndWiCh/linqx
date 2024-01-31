import { eq } from "drizzle-orm";

import { db } from "../../../db/connection";
import { collections } from "../../../db/schemas";

export default defineEventHandler(async (event) => {
  if (!event.context.user) {
    return setResponseStatus(event, 401);
  }

  const collectionId = getRouterParam(event, "collectionId");

  try {
    await db
      .delete(collections)
      .where(eq(collections.id, collectionId));
  } catch (err) {
    console.log("[DELETE_COLLECTION]: Failed to delete collection:", err);

    return setResponseStatus(event, 500);
  }
});