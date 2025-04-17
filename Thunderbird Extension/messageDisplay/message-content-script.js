async function showBanner() {
  console.log("Starting showBanner");
  let bannerDetails;
  try {
    bannerDetails = await browser.runtime.sendMessage({
      command: "getBannerDetails",
    });
    console.log("Banner details received:", bannerDetails);
  } catch (e) {
    console.error("Error getting banner details:", e);
    return;
  }

  if (!bannerDetails) {
    console.error("No banner details returned");
    return;
  }

  const banner = document.createElement("div");
  banner.className = "messageBanner" + (bannerDetails.is_spam ? " spam" : "");

  const bannerText = document.createElement("div");
  bannerText.className = "messageBannerText";
  bannerText.innerText = bannerDetails.is_spam
    ? `${bannerDetails.text}\nWarning: Spam Detected\n${bannerDetails.details}`
    : `${bannerDetails.text}\n${bannerDetails.details}`;
  console.log("Banner text:", bannerText.innerText);

  banner.appendChild(bannerText);
  document.body.insertBefore(banner, document.body.firstChild);
  console.log("Banner inserted");
}

showBanner().catch((e) => console.error("showBanner error:", e));
