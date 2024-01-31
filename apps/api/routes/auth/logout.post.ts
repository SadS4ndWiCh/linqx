export default defineEventHandler(async (event) => {
  if (!event.context.user) {
    return event.respondWith(new Response(null, { status: 401 }));
  }

  await lucia.invalidateUserSessions(event.context.user.id);
});