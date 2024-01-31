import { and, eq } from "drizzle-orm";

import { db } from "../../../../../db/connection";
import { links } from "../../../../../db/schemas";

export default defineEventHandler(async (event) => {
  if (!event.context.user) {
    return setResponseStatus(event, 401);
  }

  const collectionId = getRouterParam(event, "collectionId");
  const linkId = getRouterParam(event, "linkId");

  try {
    const link = await db
      .select()
      .from(links)
      .where(
        and(
          eq(links.collectionId, collectionId),
          eq(links.id, linkId)
        )
      )
      .get();
    
    if (!link) {
      return setResponseStatus(event, 404);
    }

    return link;
  } catch (err) {
    console.log("[GET_LINK]: Failed to get link:", err);

    return setResponseStatus(event, 500);
  }
});