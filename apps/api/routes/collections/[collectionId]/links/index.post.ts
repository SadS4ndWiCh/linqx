import { generateId } from "lucia";
import { z } from "zod";

import { db } from "../../../../db/connection";
import { links } from "../../../../db/schemas";

const linkSchema = z.object({
  url: z.string().url()
});

export default defineEventHandler(async (event) => {
  if (!event.context.user) {
    return setResponseStatus(event, 401);
  }

  const bodyValidated = linkSchema.safeParse(await readBody(event));
  if (!bodyValidated.success) {
    return setResponseStatus(event, 400);
  }

  const linkId = generateId(15);
  const collectionId = getRouterParam(event, "collectionId");

  try {
    const link = await db
      .insert(links)
      .values({
        id: linkId,
        collectionId,
        url: bodyValidated.data.url
      })
      .returning()
      .get();
    
    return event.respondWith(new Response(JSON.stringify(link), { status: 201 }));
  } catch (err) {
    console.log("[NEW_LINK]: Failed to create link:", err);

    return setResponseStatus(event, 500);
  }
});