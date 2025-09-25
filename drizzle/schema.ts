import {
  sqliteTable,
  AnySQLiteColumn,
  integer,
  text,
  index,
  foreignKey,
  numeric,
  blob,
} from "drizzle-orm/sqlite-core";
import { sql } from "drizzle-orm";

export const conversations = sqliteTable("conversations", {
  id: integer().primaryKey({ autoIncrement: true }),
  whatsappChatId: text("whatsapp_chat_id").notNull(),
  title: text(),
  isGroup: integer("is_group").default(0),
  createdAt: text("created_at").default("sql`(CURRENT_TIMESTAMP)`").notNull(),
});

export const messages = sqliteTable(
  "messages",
  {
    id: integer().primaryKey({ autoIncrement: true }),
    conversationId: integer("conversation_id")
      .notNull()
      .references(() => conversations.id),
    author: text(),
    fromMe: integer("from_me").notNull(),
    body: text(),
    timestamp: text().default("sql`(CURRENT_TIMESTAMP)`").notNull(),
    embedding: numeric().notNull(),
  },
  (table) => [index("message_index").on(table.embedding)]
);

export const messageIndexShadow = sqliteTable(
  "message_index_shadow",
  {
    indexKey: integer("index_key").primaryKey(),
    data: blob(),
  },
  (table) => [index("message_index_shadow_idx").on(table.indexKey)]
);
