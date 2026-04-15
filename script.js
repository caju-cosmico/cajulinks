// Seleciona todos os cards de link
const linkCards = document.querySelectorAll(".splitButton");

/**
 * Compartilhar link
 */
async function shareLink(url) {
  if (navigator.share) {
    try {
      await navigator.share({
        title: "Confira meu perfil",
        text: "Olha esse link 👇",
        url
      });
    } catch (error) {
      console.log("Erro ao compartilhar:", error);
    }
  } else {
    copyToClipboard(url);
  }
}

/**
 * Copiar link
 */
async function copyToClipboard(text) {
  try {
    await navigator.clipboard.writeText(text);
    alert("Link copiado!");
  } catch {
    // fallback antigo (importante pro teu erro)
    const input = document.createElement("input");
    input.value = text;
    document.body.appendChild(input);

    input.select();
    document.execCommand("copy");

    document.body.removeChild(input);

    alert("Link copiado!");
  }
}

/**
 * Eventos
 */
linkCards.forEach(card => {
  const url = card.dataset.link;

  const textBtn = card.querySelector(".txt-button");
  const shareBtn = card.querySelector(".share-btn");

  // Abrir link
  textBtn.addEventListener("click", () => {
    window.open(url, "_blank");
  });

  // Compartilhar
  shareBtn.addEventListener("click", () => {
    shareLink(url);
  });
});