import {
  sqliteTable,
  integer,
  text,
  index,
  foreignKey,
  numeric,
  blob,
} from "drizzle-orm/sqlite-core";
import { sql } from "drizzle-orm";

export const chats = sqliteTable("chats", {
  id: integer().primaryKey({ autoIncrement: true }),
  whatsappChatId: text("whatsapp_chat_id").notNull(),
  title: text(),
  isGroup: integer("is_group").default(0),
  createdAt: text("created_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
});

export const messages = sqliteTable(
  "messages",
  {
    id: integer().primaryKey({ autoIncrement: true }),
    chatId: integer("chat_id")
      .notNull()
      .references(() => chats.id),
    author: text(),
    fromMe: integer("from_me").notNull(),
    body: text(),
    createdAt: text("created_at")
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    timestamp: text().notNull(),
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
