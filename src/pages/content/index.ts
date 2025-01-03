console.log("Grok logo extension loaded");

const observer = new MutationObserver((mutations) => {
  for (const mutation of mutations) {
    if (mutation.addedNodes.length > 0) {
      const element = mutation.addedNodes[0] as HTMLElement;
      const grokAdded = element.querySelector("a[aria-label='Grok']");
      const miniGrokAdded = element.querySelector(
        "button[data-testid='grokImgGen']"
      );
      if (grokAdded) {
        console.log("Grok added");
        const newLogo = document.createElement("img");
        newLogo.src = chrome.runtime.getURL("grok-logo.png");
        newLogo.alt = "Grok";
        newLogo.style.width = "1.85rem";
        newLogo.style.height = "1.85rem";
        if (grokAdded.firstChild?.firstChild) {
          grokAdded.firstChild.firstChild.replaceWith(newLogo);
        }
      }
      if (miniGrokAdded) {
        console.log("Mini Grok added");
        const newLogo = document.createElement("img");
        newLogo.src = chrome.runtime.getURL("mini-grok-logo.png");
        newLogo.alt = "Grok";
        newLogo.style.width = "1.5rem";
        newLogo.style.height = "1.5rem";
        const button = miniGrokAdded.firstChild as HTMLButtonElement;
        if (button.firstChild) {
          button.style.display = "flex";
          button.style.alignItems = "center";
          button.style.justifyContent = "center";
          button.firstChild.replaceWith(newLogo);
        }
      }
    }
  }
});

observer.observe(document.body, { childList: true, subtree: true });
