import { sqliteTable, text } from "drizzle-orm/sqlite-core";

export const users = sqliteTable("users", {
  id: text("id").notNull().primaryKey(),
  username: text("username").notNull(),
  email: text("email").notNull().unique(),
  hashedPassword: text("hashed_password").notNull()
});