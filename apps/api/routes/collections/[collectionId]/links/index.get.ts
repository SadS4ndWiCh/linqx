import { eq } from "drizzle-orm";

import { db } from "../../../../db/connection";
import { links } from "../../../../db/schemas";

export default defineEventHandler(async (event) => {
  if (!event.context.user) {
    return setResponseStatus(event, 401);
  }

  const collectionId = getRouterParam(event, "collectionId");

  try {
    return await db
      .select()
      .from(links)
      .where(eq(links.collectionId, collectionId));
  } catch (err) {
    console.log("[GET_ALL_LINKS]: Failed to get all links:", err);

    return setResponseStatus(event, 500);
  }
});