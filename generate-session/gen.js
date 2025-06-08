require('dotenv').config({ path: '../.env' });
const { TelegramClient } = require("telegram");
const { StringSession } = require("telegram/sessions");
const input = require("prompt-sync")();
const { Buffer } = require("buffer");

const apiId = process.env.API_ID;
const apiHash = process.env.API_HASH;
const stringSession = new StringSession("");

function toHex(buffer) {
  return buffer.toString("hex");
}

function toBase64(obj) {
  return Buffer.from(JSON.stringify(obj)).toString("base64");
}

(async () => {
  console.log("📲 Masukkan nomor HP Telegram (cth: +628123456789)");
  const phoneNumber = input("Nomor HP: ");

  const client = new TelegramClient(stringSession, apiId, apiHash, {
    connectionRetries: 5,
  });

  await client.start({
    phoneNumber: async () => phoneNumber,
    password: async () => input("🔐 Masukkan password 2FA: "),
    phoneCode: async () => input("📩 Masukkan kode OTP (dari Telegram): "),
    onError: (err) => console.log(err),
  });

  const user = await client.getMe();
  const telethonString = client.session.save();
  const authKey = client.session.authKey.getKey();
  const dcId = client.session.dcId;

  const pyrogramV1 = Buffer.from(`${dcId}:${apiId}:${toHex(authKey)}`).toString("base64");

  const pyrogramV2 = toBase64({
    dc_id: dcId,
    api_id: apiId,
    auth_key: toHex(authKey),
  });

  console.log("✅ Login berhasil sebagai:", user.username || user.firstName);
  console.log("\n🔑 Telethon Session:\n", telethonString);
  console.log("\n🔁 Pyrogram V1:\n", pyrogramV1);
  console.log("\n🔁 Pyrogram V2:\n", pyrogramV2);

  const formattedMessage = `
<b>✅ SESSION TELETHON & PYROGRAM</b>

<b>👤 Akun:</b> ${user.firstName} (${user.username || "-"})

<b>⭐ Telethon:</b>
<code>${telethonString}</code>

<b>⭐ Pyrogram V1:</b>
<code>${pyrogramV1}</code>

<b>⭐ Pyrogram V2:</b>
<code>${pyrogramV2}</code>
`;

  await client.sendMessage("me", {
    message: formattedMessage,
    parseMode: "html",
  });

  console.log("📨 Semua session berhasil dikirim ke Saved Messages!");
  await client.disconnect();
})();
