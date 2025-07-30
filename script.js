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
  runConfetti(5, 2500);

  setTimeout(() => {
    pledgeBox.classList.add("hidden");
    resultBox.classList.remove("hidden");
    generateImage(usernameInput.value.trim().replace(/^@/, ""));
  }, 2600);
});

// ✳️ Step 3: Generate Image
function generateImage(username) {
  const canvas = document.createElement("canvas");
  canvas.width = 1200;
  canvas.height = 1350;

  const ctx = canvas.getContext("2d");
  ctx.fillStyle = "#000";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  const logo = new Image();
  const pfp = new Image();

  logo.src = "badge3.png";
  pfp.crossOrigin = "anonymous";
  pfp.src = `https://unavatar.io/twitter/${username}`;

  logo.onload = () => {
    // Centered logo at top
    const logoWidth = 140;
    const logoX = (canvas.width - logoWidth) / 2;
    ctx.drawImage(logo, logoX, 60, logoWidth, logoWidth);

    pfp.onload = () => {
      // Draw circular PFP
      const pfpSize = 80;
      ctx.save();
      ctx.beginPath();
      ctx.arc(90 + pfpSize / 2, 230 + pfpSize / 2, pfpSize / 2, 0, Math.PI * 2);
      ctx.closePath();
      ctx.clip();
      ctx.drawImage(pfp, 90, 230, pfpSize, pfpSize);
      ctx.restore();

      // Draw @username
      ctx.fillStyle = "#A9ECFD";
      ctx.font = "bold 26px JetBrains Mono";
      ctx.fillText(`@${username}`, 190, 280);

      // Draw pledge text
      ctx.font = "18px JetBrains Mono";
      const lines = pledgeTemplate(username).split("\n");
      let y = 360;
      for (let line of lines) {
        ctx.fillText(line, 90, y);
        y += 38;
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

    pfp.onerror = () => {
      alert("Couldn't load profile picture. Try a different username.");
    };
  };

  logo.onerror = () => {
    alert("Logo failed to load.");
  };
}

// ✳️ Confetti Effect
function runConfetti(times, duration) {
  if (typeof confetti !== "function") {
    console.warn("Confetti library not loaded.");
    return;
  }
  for (let i = 0; i < times; i++) {
    setTimeout(() => {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    }, (duration / times) * i);
  }
}
