//Day 1 - vincular uma função ao evento de submissão do formulário.
// A função vinculada deverá pegar o valor informado nos campos nome e
//  data de nascimento e imprimi-los no console.

//Day 3
// - pegar os dados informados nos campos do mesmo para salvá-los localmente e exibi-los em uma tabela.
// - Para fazer isso, você terá que adicionar um evento para ouvir a submissão do formulário, e esse evento coletará os valores informados em todos os campos do formulário e montará um objeto representando uma pessoa (com nome e data de nascimento).
// - Com os dados em mãos, salve-os localmente de forma persistente, para não perdê-los.
// - Por fim, leia os dados salvos localmente e exiba-os em uma tabela quando a página for recarregada ou fechada e reaberta.

let pessoas = getPessoasFromLocalStorage();

//Day 4
//dicionar uma funcionalidade de edição que torne possível alterar os dados das pessoas,
// para realizar possíveis mudanças ou correções.

let editarPessoa = null; // Variável para armazenar a pessoa que está sendo editada

function getPessoasFromLocalStorage() {
  const pessoasSalvasJSON = localStorage.getItem("pessoas");
  return pessoasSalvasJSON ? JSON.parse(pessoasSalvasJSON) : [];
}

const btnSubmit = document.querySelector("#submit");

btnSubmit.addEventListener("click", (e) => {
  e.preventDefault(); //impede o envio se houver erros de validação

  const form = document.querySelector(".js-form");
  const nome = document.querySelector("#name").value.trim();
  const dataNascimento = document.querySelector("#birth-date").value.trim();
  const msg = document.querySelector(".msg");

  //validação do Formulário
  let erros = [];
  //Day 2
  // Dessa forma, seu desafio de hoje será garantir um conjunto mínimo de validações para o seu formulário. Como ele representa uma pessoa, com nome e data de nascimento, as regras de negócio serão:
  // Um nome precisa ter no mínimo três letras.
  // Um nome pode ter no máximo 120 letras.
  // Um nome pode apenas conter letras, e não números.

  if (!/^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/.test(nome)) {
    erros.push("O nome deve conter apenas letras.");
  } else if (nome.lenght < 3) {
    erros.push("O nome deve ter no mínimo 3 letras.");
  } else if (nome.lenght > 120) {
    erros.push("O nome deve ter no máximo 120 letras.");
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
    return;
  }

  // --- Se estiver editando ---
  if (editarPessoa) {
    editarPessoa.nome = nome;
    editarPessoa.dataNascimento = dataNascimento;
    editarPessoa = null; //Resseta o modo de edição
    btnSubmit.textContent = "Salvar"; //Volta o texto do botão para "Salvar"
    msg.innerHTML = "Pessoa editada com sucesso! ✅";
    msg.style.color = "green";
  } else {
    //persisteência dos dados (LOCALSTORAGE)

    //criar um novo objeto Pessoa
    const novaPessoaObj = {
      id: Date.now(),
      nome,
      dataNascimento,
    };

    // Adiciona o objeto pessoa ao array
    pessoas.push(novaPessoaObj);
    msg.innerHTML = "Pessoa cadastrada com sucesso! ✅";
    msg.style.color = "green";
  }
  //Salvar no localStorage
  salvarPessoas();
  renderizarPessoas();
  form.reset();
});

function renderizarPessoas() {
  const listarPessoas = document.querySelector("#listarPessoas");
  listarPessoas.innerHTML = ""; // Limpa a lista antes de renderizar novamente
  pessoas.forEach((pessoa) => {
    const row = document.createElement("tr");

    const nomeCell = document.createElement("td");
    nomeCell.textContent = pessoa.nome;

    const dataCell = document.createElement("td");
    dataCell.textContent = pessoa.dataNascimento;

    const actionsCell = document.createElement("td");

    const deleteBtn = document.createElement("span");
    deleteBtn.textContent = "Deletar";
    deleteBtn.classList.add("botoes", "deletar");
    deleteBtn.id = "btnDeletar";

    //Day 5
    // criar uma funcionalidade de remoção, com a qual você possa remover uma determinada
    // pessoa da sua persistência física e da tabela de exibição.
    deleteBtn.addEventListener("click", () => detarPessoa(pessoa.id));

    const editBtn = document.createElement("span");
    editBtn.textContent = "Editar";
    editBtn.classList.add("botoes", "editar");
    editBtn.id = "btnEditar";

    //Day 4
    editBtn.addEventListener("click", () => editandoPessoa(pessoa));

    actionsCell.appendChild(editBtn);
    actionsCell.appendChild(deleteBtn);

    row.appendChild(nomeCell);
    row.appendChild(dataCell);
    row.appendChild(actionsCell);

    listarPessoas.appendChild(row);
  });
}

function editandoPessoa(pessoa) {
  document.querySelector("#name").value = pessoa.nome;
  document.querySelector("#birth-date").value = pessoa.dataNascimento;
  editarPessoa = pessoa; // Define a pessoa que está sendo editada
  document.querySelector("#submit").textContent = "Atualizar"; // Muda o texto do botão para "Atualizar"
  const msg = document.querySelector(".msg");
  document
    .querySelectorAll("tr")
    .forEach((tr) => tr.classList.remove("editando"));
  event.target.closest("tr").classList.add("editando");

  msg.innerHTML = `Editando o registro de <b>${pessoa.nome}</b>.. Faça as alterações e clique em Atualizar.`;
  msg.style.color = "blue";
}

function detarPessoa(id) {
  pessoas = pessoas.filter((pessoa) => pessoa.id !== id);
  salvarPessoas();
  renderizarPessoas();
}

function salvarPessoas() {
  const pessoasString = JSON.stringify(pessoas);
  localStorage.setItem("pessoas", pessoasString);
}

renderizarPessoas();
