import { z } from "zod";
import { generateId } from "lucia";

import { db } from "../../db/connection";
import { collections } from "../../db/schemas";

const collectionSchema = z.object({
  name: z.string().min(1).max(30),
})

export default defineEventHandler(async (event) => {
  if (!event.context.user) {
    return setResponseStatus(event, 401);
  }

  const bodyValidated = collectionSchema.safeParse(await readBody(event));
  if (!bodyValidated.success) {
    return setResponseStatus(event, 400);
  }

  try {
    const collection = await db
      .insert(collections)
      .values({
        id: generateId(15),
        userId: event.context.user.id,
        name: bodyValidated.data.name
      })
      .returning()
      .get();
    
    return event.respondWith(
      new Response(JSON.stringify(collection), { status: 201 })
    );
  } catch (err) {
    console.log("[NEW_COLLECTION]: Failed to create a new collection:", err);

    return setResponseStatus(event, 500);
  }
});