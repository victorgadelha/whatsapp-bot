import pkg from "whatsapp-web.js";
import qrcode from "qrcode-terminal";
import { db } from "../index.ts";
import { messages } from "../db/schema.ts";
import { chats } from "../db/schema.ts";

const { Client, LocalAuth } = pkg;

export const whatsAppClient = new Client({
  authStrategy: new LocalAuth(),
});
async function generateText(prompt: string) {
  const response = await fetch("http://localhost:11434/api/generate", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "gemma3:4b",
      prompt,
      stream: false,
    }),
  });

  if (!response.ok) {
    throw new Error(`Erro na API: ${response.statusText}`);
  }

  const data = await response.json();
  return data.response;
}
whatsAppClient.once("ready", async () => {
  console.log("Client is ready!");

  const chatList = await whatsAppClient.getChats();

  const insertChats = await db
    .insert(chats)
    .values(
      chatList.map((chat) => ({
        whatsappChatId: chat.id._serialized,
        title: chat.name || chat.id.user,
        isGroup: chat.isGroup ? 1 : 0,
      }))
    )
    .returning();

  console.log(insertChats);
});

whatsAppClient.on("qr", (qr) => {
  qrcode.generate(qr, { small: true });
});

whatsAppClient.on("message_create", async (message) => {
  if (message.fromMe && message.body.startsWith("!")) {
    message.reply(await generateText(message.body));
  }
});

whatsAppClient.initialize();
