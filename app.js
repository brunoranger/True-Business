const space = document.getElementById("space");
const deposit = document.getElementById("deposit");
const answer = document.getElementById("answer");

let busy = false;

function activate() {
  if (busy) return;
  deposit.classList.add("active");
  deposit.focus();
}

space.addEventListener("click", activate);

deposit.addEventListener("keydown", async (event) => {
  if (event.key === "Enter" && !event.shiftKey) {
    event.preventDefault();
    const text = deposit.value.trim();
    if (!text || busy) return;
    await send(text);
  }
});

async function send(text) {
  busy = true;

  deposit.value = "";
  deposit.blur();
  deposit.classList.remove("active");

  answer.textContent = "";
  answer.className = "";

  let reply = "";

  try {
    const res = await fetch("/api/ai", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text })
    });

    const data = await res.json();
    reply = (data.answer || "").trim();
  } catch (error) {
    reply = "";
  }

  if (!reply) {
    busy = false;
    return;
  }

  const words = reply.split(/\s+/).filter(Boolean).length;
  const displayTime = Math.max(5000, 5000 + words * 600);

  answer.textContent = reply;
  if (words > 55) answer.classList.add("long");

  requestAnimationFrame(() => {
    answer.classList.add("visible");
  });

  setTimeout(() => {
    answer.classList.remove("visible");

    setTimeout(() => {
      answer.textContent = "";
      answer.className = "";
      busy = false;
    }, 3000);
  }, 3000 + displayTime);
}
