import pkg from "whatsapp-web.js";
import qrcode from "qrcode-terminal";
import Groq from "groq-sdk";

const { Client, LocalAuth } = pkg;

export const whatsAppClient = new Client({
  authStrategy: new LocalAuth(),
});

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export async function getGroqChatCompletion(message: string) {
  return groq.chat.completions.create({
    messages: [
      {
        role: "user",
        content: message,
      },
    ],
    model: "llama-3.3-70b-versatile",
  });
}

whatsAppClient.once("ready", () => {
  console.log("Client is ready!");
});

whatsAppClient.on("qr", (qr) => {
  qrcode.generate(qr, { small: true });
});

whatsAppClient.on("message_create", async (message) => {});

whatsAppClient.initialize();
