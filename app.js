const deposit = document.getElementById("deposit");

deposit.addEventListener("keydown", async (event) => {
  if (event.key !== "Enter") return;

  event.preventDefault();

  const response = await fetch("/api/ai", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      message: deposit.value
    })
  });

  const data = await response.json();

  deposit.value = data.reply;
});
