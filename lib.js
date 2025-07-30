window.KtCaptcha = (() => {
  let feito = false;

  function verificar(input, msg, box) {
    const valor = input.value.trim();

    box.classList.remove("certo", "errado");
    void box.offsetWidth;

    if (valor === "Kiti Co.") {
      feito = true;
      msg.textContent = "✅ Certinho!";
      msg.style.color = "green";
      box.classList.add("certo");
    } else {
      feito = false;
      msg.textContent = "❌ Tá errado!";
      msg.style.color = "red";
      box.classList.add("errado");
    }

    console.log("[KtCaptcha] Sucesso?", feito);
  }

  function inject(id) {
    const target = document.getElementById(id);
    if (!target) return console.error("[KtCaptcha] Elemento não encontrado:", id);

    // estilos inline do captcha
    const css = `
      .ktcaptcha-box {
        font-family: sans-serif;
        padding: 10px;
        background: #fff;
        border: 1px solid #ccc;
        border-radius: 6px;
        text-align: center;
        width: 220px;
        transition: transform 0.2s ease, background-color 0.3s ease, border-color 0.3s ease;
      }
      .ktcaptcha-box.certo {
        animation: bounce 0.3s ease;
        background-color: #d4edda;
        border-color: #4caf50;
      }
      .ktcaptcha-box.errado {
        animation: shake 0.3s ease;
        background-color: #f8d7da;
        border-color: #f44336;
      }
      @keyframes bounce {
        0% { transform: scale(1); }
        30% { transform: scale(1.05); }
        100% { transform: scale(1); }
      }
      @keyframes shake {
        0% { transform: translateX(0); }
        25% { transform: translateX(-5px); }
        50% { transform: translateX(5px); }
        75% { transform: translateX(-5px); }
        100% { transform: translateX(0); }
      }
      .ktcaptcha-box label {
        font-size: 14px;
        margin-bottom: 6px;
        display: block;
      }
      .ktcaptcha-box p {
        font-size: 14px;
        margin-bottom: 6px;
        display: block;
      }
      .ktcaptcha-box input {
        padding: 6px;
        width: 90%;
        margin-bottom: 8px;
        border: 1px solid #bbb;
        border-radius: 4px;
      }
      .ktcaptcha-box button {
        padding: 6px 12px;
        font-size: 14px;
        background: #4caf50;
        color: white;
        border: none;
        border-radius: 4px;
        cursor: pointer;
      }
      .ktcaptcha-box #msg {
        font-size: 13px;
        margin-top: 6px;
        transition: color 0.3s;
      }
    `;

    // injeta CSS
    const style = document.createElement("style");
    style.innerHTML = css;
    document.head.appendChild(style);

    // cria elementos
    const box = document.createElement("div");
    box.className = "ktcaptcha-box";
    box.innerHTML = `
      <label>Digite: <b>Kiti Co.</b></label>
      <input type="text" placeholder="..." />
      <br />
      <button>✔</button>
      <div id="msg"></div>
      <p>powered by KtCaptcha</p>
    `;
    target.appendChild(box);

    const input = box.querySelector("input");
    const button = box.querySelector("button");
    const msg = box.querySelector("#msg");

    button.onclick = () => verificar(input, msg, box);
  }

  function success() {
    return feito;
  }

  return {
    inject,
    success
  };
})();
