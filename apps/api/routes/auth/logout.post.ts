export default defineEventHandler(async (event) => {
  if (!event.context.user) {
    return setResponseStatus(event, 401);
  }

  await lucia.invalidateUserSessions(event.context.user.id);
});