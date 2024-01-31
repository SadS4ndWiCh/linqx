import { generateId } from "lucia";
import { newLinkSchema } from "@linqx/shared";

import { db } from "../../../../db/connection";
import { links } from "../../../../db/schemas";

export default defineEventHandler(async (event) => {
  if (!event.context.user) {
    return setResponseStatus(event, 401);
  }

  const bodyValidated = newLinkSchema.safeParse(await readBody(event));
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