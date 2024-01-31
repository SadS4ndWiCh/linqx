import { z } from "zod";
import { and, eq } from "drizzle-orm";

import { db } from "../../../../../db/connection";
import { links } from "../../../../../db/schemas";

const updateLinkSchema = z.object({
  url: z.string().url()
});

export default defineEventHandler(async (event) => {
  if (!event.context.user) {
    return setResponseStatus(event, 401);
  }

  const bodyValidated = updateLinkSchema.safeParse(await readBody(event));
  if (!bodyValidated.success) {
    return setResponseStatus(event, 400);
  }

  const collectionId = getRouterParam(event, "collectionId");
  const linkId = getRouterParam(event, "linkId");

  try {
    await db
      .update(links)
      .set(bodyValidated.data)
      .where(
        and(
          eq(links.collectionId, collectionId),
          eq(links.id, linkId)
        )
      );
  } catch (err) {
    console.log("[UPDATE_LINK]: Failed to update link:", err);

    return setResponseStatus(event, 500);
  }
});