import { relations } from "drizzle-orm/relations";
import { chats, messages } from "./schema";

export const messagesRelations = relations(messages, ({ one }) => ({
  conversation: one(chats, {
    fields: [messages.chatId],
    references: [chats.id],
  }),
}));

export const conversationsRelations = relations(chats, ({ many }) => ({
  messages: many(messages),
}));
