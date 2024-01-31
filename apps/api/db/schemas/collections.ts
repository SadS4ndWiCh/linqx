import { sqliteTable, text } from "drizzle-orm/sqlite-core";
import { users } from "./users";

export const collections = sqliteTable("collections", {
  id: text("id").notNull().primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),

  name: text("name", { length: 30 }).notNull(),
});