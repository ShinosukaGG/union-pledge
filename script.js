// ✳️ Elements
const enterBtn = document.getElementById("enterBtn");
const pledgeBtn = document.getElementById("pledgeBtn");
const shareBtn = document.getElementById("shareBtn");
const downloadBtn = document.getElementById("downloadBtn");

const usernameInput = document.getElementById("usernameInput");
const entryBox = document.getElementById("entryBox");
const pledgeBox = document.getElementById("pledgeBox");
const resultBox = document.getElementById("resultBox");
const pledgeText = document.getElementById("pledgeText");
const pledgeImage = document.getElementById("pledgeImage");

// ✳️ Pledge Template
const pledgeTemplate = (username) => `
I ${username} pledge to stay interoperable.
It is my duty to test the chains, break what must break, and help build what lasts.
To speak of Union with pride, not panic, to echo truth, not noise.
As a tester, I walk the edge. As a yapper, I carry the word.
I will not spread fear. I will not chase rumors.
I pledge to unify — across chains, across people, across time. I pledge to be Union.

We. Are. Union.
zkgm.
`;

// ✳️ Step 1: Enter Podium
enterBtn.addEventListener("click", () => {
  const username = usernameInput.value.trim().replace(/^@/, "");
  if (!username) return alert("Please enter your username.");

  entryBox.classList.add("hidden");
  pledgeBox.classList.remove("hidden");

  pledgeText.innerText = pledgeTemplate(username);
});

// ✳️ Step 2: Pledge with Confetti
pledgeBtn.addEventListener("click", () => {
  runConfettiOnce();

  setTimeout(() => {
    pledgeBox.classList.add("hidden");
    resultBox.classList.remove("hidden");
    generateImage(usernameInput.value.trim().replace(/^@/, ""));
  }, 1000);
});

// ✳️ Step 3: Generate Image (16:9, no PFP)
function generateImage(username) {
  const canvas = document.createElement("canvas");
  canvas.width = 1280;
  canvas.height = 720;

  const ctx = canvas.getContext("2d");
  ctx.fillStyle = "#000";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  const logo = new Image();
  logo.src = "badge3.png";

  logo.onload = () => {
    // Centered logo at top
    const logoWidth = 120;
    const logoX = (canvas.width - logoWidth) / 2;
    ctx.drawImage(logo, logoX, 40, logoWidth, logoWidth);

    // Add username
    ctx.fillStyle = "#A9ECFD";
    ctx.font = "bold 26px JetBrains Mono";
    ctx.fillText(`@${username}`, 80, 200); // was 160 — increased spacing

    // Add pledge
    ctx.font = "18px JetBrains Mono";
    const lines = pledgeTemplate(username).split("\n");
    let y = 250;
    for (let line of lines) {
      ctx.fillText(line, 80, y);
      y += 30;
    }

    const dataURL = canvas.toDataURL("image/png");
    pledgeImage.src = dataURL;

    downloadBtn.onclick = () => {
      const link = document.createElement("a");
      link.download = `union_pledge_${username}.png`;
      link.href = dataURL;
      link.click();
    };

    shareBtn.onclick = () => {
      const tweetText = encodeURIComponent(
        `I have successfully Pledged to @union_build.\n\nI thereby commit to test, to speak truth, and to unify.\n\nGo Pledge Yourself: union-pledge.vercel.app\n`
      );
      const twitterURL = `https://twitter.com/intent/tweet?text=${tweetText}`;
      window.open(twitterURL, "_blank");
    };
  };

  logo.onerror = () => {
    alert("Logo failed to load. Please ensure 'badge3.png' exists in your folder.");
  };
}

// ✳️ One-time Confetti
function runConfettiOnce() {
  if (typeof confetti !== "function") {
    console.warn("Confetti library not loaded.");
    return;
  }

  confetti({
    particleCount: 150,
    spread: 70,
    origin: { y: 0.6 }
  });
}
