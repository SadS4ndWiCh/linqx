import { z } from "zod";
import { eq } from "drizzle-orm";

import { db } from "../../../db/connection";
import { collections } from "../../../db/schemas";

const updateCollectionSchema = z.object({
  name: z.string()
});

export default defineEventHandler(async (event) => {
  if (!event.context.user) {
    return setResponseStatus(event, 401);
  }

  const bodyValidated = updateCollectionSchema.safeParse(await readBody(event));
  if (!bodyValidated.success) {
    return setResponseStatus(event, 400);
  }

  const collectionId = getRouterParam(event, "collectionId");

  try {
    await db
      .update(collections)
      .set(bodyValidated.data)
      .where(eq(collections.id, collectionId));
  } catch (err) {
    console.log("[UPDATE_COLLECTION]: Failed to update collection:", err);

    return setResponseStatus(event, 500);
  }
});