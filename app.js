const deposit = document.getElementById("deposit");

deposit.addEventListener("keydown", async (event) => {
  if (event.key !== "Enter" || event.shiftKey) return;

  event.preventDefault();

  const text = deposit.value.trim();
  if (!text) return;

  const response = await fetch("/api/ai", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      message: text
    })
  });

  const data = await response.json();

  deposit.value = data.reply;
});
