import { and, eq } from "drizzle-orm";

import { db } from "../../../db/connection";
import { collections } from "../../../db/schemas";

export default defineEventHandler(async (event) => {
  if (!event.context.user) {
    return setResponseStatus(event, 401);
  }

  const collectionId = getRouterParam(event, "collectionId");

  try {
    const collection = await db
      .select()
      .from(collections)
      .where(
        and(
          eq(collections.userId, event.context.user.id),
          eq(collections.id, collectionId)
        )
      )
      .get();
    
    if (!collection) {
      return setResponseStatus(event, 404);
    }

    return collection;
  } catch (err) {
    console.log("[GET_COLLECTION_BY_ID]: Failed to get collection by id:", err);

    return setResponseStatus(event, 500);
  }
});