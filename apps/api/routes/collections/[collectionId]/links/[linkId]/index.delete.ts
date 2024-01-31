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
    await db
      .delete(links)
      .where(
        and(
          eq(links.collectionId, collectionId),
          eq(links.id, linkId)
        )
      );
  } catch (err) {
    console.log("[DELETE_LINK]: Failed to delete link:", err);

    return setResponseStatus(event, 500);
  }
});