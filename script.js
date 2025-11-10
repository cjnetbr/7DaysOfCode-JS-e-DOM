//Day 1 - vincular uma função ao evento de submissão do formulário.
// A função vinculada deverá pegar o valor informado nos campos nome e
//  data de nascimento e imprimi-los no console.

// Dessa forma, seu desafio de hoje será garantir um conjunto mínimo de validações para o seu formulário. Como ele representa uma pessoa, com nome e data de nascimento, as regras de negócio serão:

// Um nome precisa ter no mínimo três letras.

const btnSubmit = document.querySelector("#submit");

btnSubmit.addEventListener("click", (e) => {
  e.preventDefault(); //impede o envio se houver erros de validação

  const form = document.querySelector(".js-form");
  const nome = document.querySelector("#name").value.trim();
  const dataNascimento = document.querySelector("#birth-date").value.trim();
  const msg = document.querySelector(".js-msg");

  // console.log("Nome:", nome);
  // console.log("Data de Nascimento:", dataNascimento);

  let erros = [];
  // Dessa forma, seu desafio de hoje será garantir um conjunto mínimo de validações para o seu formulário. Como ele representa uma pessoa, com nome e data de nascimento, as regras de negócio serão:
  // Um nome precisa ter no mínimo três letras.
  // Um nome pode ter no máximo 120 letras.
  // Um nome pode apenas conter letras, e não números.

  if (nome.lenght < 3) {
    erros.push("O nome deve ter no mínimo 3 letras.");
    console.log(nome);
  } else if (nome.lenght > 120) {
    erros.push("O nome deve ter no máximo 120 letras.");
    console.log(nome);
  } else if (!/^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/.test(nome)) {
    erros.push("O nome deve conter apenas letras.");
    console.log(nome);
  }

  // A data de nascimento precisa estar no formato DD/MM/AAAA, por exemplo: 31/01/2021.
  // O mês informado deve estar entre 01 e 12
  const dataNascimentoRegex = /^(\d{2})\/(\d{2})\/(\d{4})$/;
  const match = dataNascimento.match(dataNascimentoRegex);
  if (!match) {
    erros.push(
      "A data de nascimento deve estar no formato DD/MM/AAAA (ex: 31/01/2021)."
    );
  } else {
    const dia = parseInt(match[1], 10);
    const mes = parseInt(match[2], 10);
    const ano = parseInt(match[3], 10);

    if (dia < 1 || dia > 31) {
      erros.push("O dia informado deve estar entre 01 e 31.");
    }
    if (mes < 1 || mes > 12) {
      erros.push("O mês informado deve estar entre 01 e 12.");
    }
    if (ano < 1900 || ano > new Date().getFullYear()) {
      erros.push("O ano informado deve estar entre 1900 e o ano atual.");
    }
  }

  // exibir mensagens de erro ou sucesso
  if (erros.length > 0) {
    msg.innerHTML = erros.join("<br>");
    msg.style.color = "red";
  } else {
    msg.innerHTML = "Formulário enviado com sucesso! ✅";
    msg.style.color = "green";
    form.btnSubmit();
    form.reset();
  }
});
