import pkg from "whatsapp-web.js";
import qrcode from "qrcode-terminal";

const { Client, LocalAuth } = pkg;

export const whatsAppClient = new Client({
  authStrategy: new LocalAuth(),
});

whatsAppClient.once("ready", () => {
  console.log("Client is ready!");
});

whatsAppClient.on("qr", (qr) => {
  qrcode.generate(qr, { small: true });
});

whatsAppClient.on("message_create", async (message) => {
  if (message.fromMe && message.body.startsWith("!")) {
  }
});

whatsAppClient.initialize();
