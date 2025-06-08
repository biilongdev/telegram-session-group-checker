require('dotenv').config({ path: '../.env' });
const { TelegramClient } = require("telegram");
const { StringSession } = require("telegram/sessions");
const { Api } = require("telegram");
const fs = require("fs");

const apiId = Number(process.env.API_ID);
const apiHash = process.env.API_HASH;
const session = new StringSession(process.env.STRING_SESSION);

const client = new TelegramClient(session, apiId, apiHash, {
  connectionRetries: 5,
});

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function getGroupTopServiceMessage(entity) {
  let offsetId = 0;
  let oldestServiceMsg = null;

  try {
    while (true) {
      const history = await client.invoke(
        new Api.messages.GetHistory({
          peer: entity,
          limit: 100,
          offsetId: offsetId,
          maxId: 0,
          minId: 0,
          addOffset: 0,
          hash: 0,
        })
      );

      const messages = history.messages || [];
      if (messages.length === 0) break;

      for (const msg of messages) {
        if (msg.action && (!oldestServiceMsg || msg.id < oldestServiceMsg.id)) {
          oldestServiceMsg = msg;
        }
      }

      offsetId = messages[messages.length - 1].id;
    }

    if (oldestServiceMsg) {
      return {
        id: oldestServiceMsg.id,
        date: oldestServiceMsg.date,
        text: getServiceText(oldestServiceMsg.action),
      };
    }
  } catch (e) {
    console.log(`⚠️ Error ambil pesan service: ${e.message}`);
  }

  return null;
}

function getServiceText(action) {
  if (action instanceof Api.MessageActionChannelCreate) {
    return `Grup dibuat: ${action.title}`;
  } else if (action instanceof Api.MessageActionChatAddUser) {
    return `User ditambahkan ke grup`;
  } else if (action instanceof Api.MessageActionChatCreate) {
    return `Grup dibuat: ${action.title}`;
  } else {
    return `Service action: ${action.className}`;
  }
}

(async () => {
  try {
    await client.connect();
    const me = await client.getMe();
    console.log("✅ Login sebagai:", me.username || me.firstName);

    const dialogs = await client.getDialogs({});
    let outputText = "";
    let outputCSV = "Nama,ID,Username,Tipe,Dibuat Olehmu,Member,Pesan Service Pertama\n";
    let total = 0;

    for (const dialog of dialogs) {
      const entity = dialog.entity;

      if (entity.className !== "Channel") continue;

      const type = entity.broadcast
        ? "Channel"
        : entity.megagroup
        ? "Megagroup"
        : "Group";

      let creator = "❌";
      let memberCount = "Tidak diketahui";
      let serviceMessage = "-";

      let full = null;

      try {
        full = await client.invoke(
          new Api.channels.GetFullChannel({ channel: entity })
        );

        await sleep(1000);

        if (full.chats?.[0]?.creator) {
          creator = "✅";
        } else {
          continue;
        }

        if (full.fullChat?.participantsCount) {
          memberCount = full.fullChat.participantsCount;
        }

        const topService = await getGroupTopServiceMessage(entity);
        if (topService) {
          serviceMessage = `${topService.text} (${new Date(topService.date * 1000).toLocaleDateString("id-ID", { month: "long", day: "2-digit", year: "numeric" })})`;
        }

      } catch (e) {
        if (e.errorMessage?.startsWith("FLOOD_WAIT_")) {
          const waitSeconds = parseInt(e.errorMessage.split("_")[2]);
          console.log(`⏳ Flood wait: tidur ${waitSeconds}s untuk ${entity.title}`);
          await sleep(waitSeconds * 1000);
          continue;
        } else {
          console.log(`⚠️ Tidak bisa akses detail: ${entity.title} (${e.message})`);
          continue;
        }
      }

      const username = entity.username || "-";
      const row = [
        entity.title,
        entity.id,
        username,
        type,
        creator,
        memberCount,
        serviceMessage,
      ];

      const textBlock = `
🏷️  Nama         : ${row[0]}
🆔 ID            : ${row[1]}
🔗 Username      : ${row[2]}
📁 Tipe          : ${row[3]}
👑 Dibuat Olehmu : ${row[4]}
👥 Member        : ${row[5]}
📜 Pesan Awal    : ${row[6]}
───────────────────────────────`;

      console.log(textBlock);
      outputText += textBlock + "\n";
      outputCSV += `${row.map((v) => `"${String(v).replace(/"/g, '""')}"`).join(",")}\n`;

      total++;
    }

    fs.writeFileSync("group_list.txt", outputText, "utf8");
    fs.writeFileSync("group_list.csv", outputCSV, "utf8");

    console.log(`\n✅ Total grup/channel buatanmu: ${total}`);
    console.log("📁 Tersimpan ke:\n   - group_list.txt\n   - group_list.csv");

    await client.disconnect();
    process.exit(0);
  } catch (err) {
    console.error("❌ Error:", err.message || err);
    process.exit(1);
  }
})();
