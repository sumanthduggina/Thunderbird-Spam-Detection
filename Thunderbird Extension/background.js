messenger.messageDisplayScripts.register({
  js: [{ file: "messageDisplay/message-content-script.js" }],
  css: [{ file: "messageDisplay/message-content-styles.css" }],
});

messenger.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log("Received message:", message);
  if (message && message.hasOwnProperty("command")) {
    return commandHandler(message, sender);
  }
  console.error("Invalid message:", message);
  return Promise.resolve(false);
});

async function commandHandler(message, sender) {
  console.log("Handling command:", message.command, "from tab:", sender.tab.id);
  let messageHeader;
  try {
    messageHeader = await messenger.messageDisplay.getDisplayedMessage(
      sender.tab.id
    );
    if (!messageHeader) {
      console.error("No message header found for tab:", sender.tab.id);
      return Promise.resolve(null);
    }
    console.log("Message header:", messageHeader);
  } catch (e) {
    console.error("Error getting message header:", e);
    return Promise.resolve(null);
  }

  switch (message.command) {
    case "getBannerDetails":
      let fullMessage;
      try {
        fullMessage = await messenger.messages.getFull(messageHeader.id);
        console.log("Full message retrieved:", messageHeader.id);
      } catch (e) {
        console.error("Error getting full message:", e);
        return Promise.resolve({
          text: "Error",
          is_spam: false,
          details: "Failed to load message",
        });
      }

      let content = "";
      function extractContent(parts) {
        for (let part of parts) {
          if (part.body) content += part.body;
          if (part.parts) extractContent(part.parts);
        }
      }
      extractContent(fullMessage.parts);
      console.log("Message content:", content.substring(0, 100) + "...");

      const urlRegex = /https?:\/\/[^\s<>"']+/g;
      const urls = content.match(urlRegex) || [];
      const bannerText = `Subject: "${messageHeader.subject}" From: ${messageHeader.author}`;
      console.log("Extracted sender:", messageHeader.author, "URLs:", urls);

      const result = await checkEmail(messageHeader.author, urls);
      console.log("Check email result:", result);

      let details = "";
      if (result.is_spam) {
        details = [];
        if (result.sender_label === "Spam") {
          details.push(
            `Sender: Spam (Probability: ${(
              result.sender_probability * 100
            ).toFixed(2)}%)`
          );
        }
        if (result.malicious_urls && result.malicious_urls.length > 0) {
          details.push(
            `Malicious URLs:\n${result.malicious_urls
              .map(
                (u) =>
                  `${u.url} (Probability: ${(u.probability * 100).toFixed(2)}%)`
              )
              .join("\n")}`
          );
        }
        details = details.join("\n");
      } else {
        details = "No spam detected";
      }

      return {
        text: bannerText,
        is_spam: result.is_spam,
        details: details,
      };
    case "markUnread":
      try {
        await messenger.messages.update(messageHeader.id, { read: false });
        console.log("Marked message unread:", messageHeader.id);
      } catch (e) {
        console.error("Error marking unread:", e);
      }
      return Promise.resolve(null);
    default:
      console.error("Unknown command:", message.command);
      return Promise.resolve(null);
  }
}

async function checkEmail(sender, urls) {
  const serverUrl = " https://8e4a-34-56-46-4.ngrok-free.app/predict_email";
  console.log(
    "Sending request to:",
    serverUrl,
    "with sender:",
    sender,
    "urls:",
    urls
  );
  try {
    const response = await fetch(serverUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ sender, urls }),
    });
    if (!response.ok) {
      console.error(
        "Fetch error, status:",
        response.status,
        "text:",
        await response.text()
      );
      return {
        is_spam: false,
        sender_label: "Non-Spam",
        sender_probability: 0,
        malicious_urls: [],
      };
    }
    const result = await response.json();
    console.log("Fetch successful, result:", result);
    return result;
  } catch (error) {
    console.error("Fetch error:", error.message);
    return {
      is_spam: false,
      sender_label: "Non-Spam",
      sender_probability: 0,
      malicious_urls: [],
    };
  }
}
