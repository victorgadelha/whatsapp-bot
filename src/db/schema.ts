import {
  pgTable,
  uuid,
  text,
  varchar,
  timestamp,
  boolean,
  vector,
} from "drizzle-orm/pg-core";

const EMBEDDING_DIM = 1536;

export const conversations = pgTable("conversations", {
  id: uuid("id").primaryKey().defaultRandom(),
  whatsapp_chat_id: varchar("whatsapp_chat_id", { length: 100 }).notNull(),
  title: varchar("title", { length: 300 }),
  is_group: boolean("is_group").default(false),
  created_at: timestamp("created_at").defaultNow().notNull(),
});

export const messages = pgTable("messages", {
  id: uuid("id").primaryKey().defaultRandom(),
  conversation_id: uuid("conversation_id")
    .notNull()
    .references(() => conversations.id),
  author: varchar("author", { length: 50 }),
  from_me: boolean("from_me").default(false),
  body: text("body"),
  timestamp: timestamp("timestamp").defaultNow().notNull(),
});

export const embeddings = pgTable("embeddings", {
  id: uuid("id").primaryKey().defaultRandom(),
  message_id: uuid("message_id")
    .notNull()
    .references(() => messages.id),
  model: varchar("model", { length: 100 }).notNull(),
  embedding: vector("embedding", { dimensions: EMBEDDING_DIM }).notNull(),
  created_at: timestamp("created_at").defaultNow().notNull(),
});
