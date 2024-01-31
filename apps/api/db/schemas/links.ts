import { sqliteTable, text } from "drizzle-orm/sqlite-core";

import { collections } from "./collections";

export const links = sqliteTable("links", {
  id: text("id").notNull().primaryKey(),
  collectionId: text("collection_id")
    .notNull()
    .references(() => collections.id, { onDelete: "cascade" }),
  
  url: text("url").notNull()
});