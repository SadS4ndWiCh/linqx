import type { User } from "lucia";

const excludedPaths = ["/auth/login", "/auth/register"];

export default defineEventHandler(async (event) => {
  const url = getRequestURL(event);
  const isExcludedPath = excludedPaths.some((path) => url.pathname.startsWith(path));
  const token = getHeader(event, "authorization");

  if ((!isExcludedPath && !token) || (isExcludedPath && token)) {
    return setResponseStatus(event, 401);
  } else if (!isExcludedPath && token) {
    const sessionId = lucia.readBearerToken(token);
    const { user } = await lucia.validateSession(sessionId);

    if (!user) return setResponseStatus(event, 401);

    event.context.user = user;
  }
});

declare module "h3" {
  interface H3EventContext {
    user: User | null;
  }
}