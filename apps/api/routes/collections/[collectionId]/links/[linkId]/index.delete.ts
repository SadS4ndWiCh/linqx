import { and, eq } from "drizzle-orm";

import { db } from "../../../../../db/connection";
import { collections, links } from "../../../../../db/schemas";

export default defineEventHandler(async (event) => {
  if (!event.context.user) {
    return setResponseStatus(event, 401);
  }

  const collectionId = getRouterParam(event, "collectionId");
  const linkId = getRouterParam(event, "linkId");

  try {
    const collection = await db
      .select()
      .from(collections)
      .where(eq(collections.id, collectionId))
      .get();
    
    if (collection && collection.userId !== event.context.user.id) {
      return setResponseStatus(event, 200);
    }

    await db
      .delete(links)
      .where(
        and(
          eq(links.collectionId, collectionId),
          eq(links.id, linkId)
        )
      );
    
    return setResponseStatus(event, 200);
  } catch (err) {
    console.log("[DELETE_LINK]: Failed to delete link:", err);

    return setResponseStatus(event, 500);
  }
});