# 📘 Calendário de Aniversários — CRUD em JavaScript

Aplicação simples e funcional desenvolvida em JavaScript puro, com armazenamento em LocalStorage, validação de formulário e operações completas de CRUD (Criar, Listar, Editar e Deletar) sobre uma lista de pessoas com nome e data de nascimento.

## 📌 Funcionalidades

✔️ Criar Pessoa

- Cadastro de nome e data de nascimento.
- Validação completa do formulário:
  - Nome entre 3 e 120 letras.
  - penas letras (inclui acentos).
  - Data no formato DD/MM/AAAA.
  - Verificação de dia, mês e ano válido.
- Dados são salvos no LocalStorage de forma persistente.

✔️ Listar Pessoas

- A tabela exibe automaticamente todos os registros presentes no LocalStorage.
- O conteúdo é carregado no momento em que a página abre.

✔️ Editar Pessoa

- Ao clicar em Editar, os dados da pessoa são carregados nos inputs.
- O botão “Salvar” muda para Atualizar.
- Após editar, o registro é sobrescrito no LocalStorage.
- Linha sendo editada pode ser destacada visualmente (opcional).

✔️ Deletar Pessoa

- Remoção do registro com atualização imediata da tabela e do LocalStorage.

## 🗃️ Tecnologias utilizadas

- HTML — Estrutura da página.
- CSS — Estilização básica e organização visual.
- JavaScript — Controle das funcionalidades e regras de negócio.
- LocalStorage — Persistência dos dados no navegador.

## 🧠 Estrutura do Projeto

```
/
├── index.html
├── script.js
├── style.css
└── README.md   ← (este arquivo)

```

## ⚙️ Como funciona o CRUD

## 🟢 Create (Criar)

O botão Salvar cria uma nova pessoa:

```
const novaPessoa = {
  id: Date.now(),
  nome,
  dataNascimento,
};
pessoas.push(novaPessoa);
salvarPessoas();

```

O ID é único e gerado pela função Date.now().

## 🔵 Read (Ler)

A função renderizarPessoas() monta a tabela no DOM:

```
function renderizarPessoas() {
  listarPessoas.innerHTML = ""; // evita duplicação
  pessoas.forEach((pessoa) => { ... });
}
```

## 🟡 Update (Editar)

Quando o usuário clica em Editar, os campos do formulário recebem os dados e o botão muda para "Atualizar":

```
function editarPessoa(pessoa) {
  document.querySelector("#name").value = pessoa.nome;
  document.querySelector("#birth-date").value = pessoa.dataNascimento;
  pessoaEmEdicao = pessoa;
}
```

Ao salvar novamente:

```
pessoaEmEdicao.nome = nome;
pessoaEmEdicao.dataNascimento = dataNascimento;
```

## 🔴 Delete (Deletar)

Remoção pelo ID:

```
pessoas = pessoas.filter((p) => p.id !== id);
salvarPessoas();
renderizarPessoas();
```

## 🧪 Validações implementadas

### Nome:

- Apenas letras e espaços:
  /^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/
- Mínimo 3 caracteres
- Máximo 120 caracteres

### Data de nascimento:

- Regex para formato DD/MM/AAAA:

```
/^(\d{2})\/(\d{2})\/(\d{4})$/

```

- Verificação individual:
  - 1 ≤ dia ≤ 31
  - 1 ≤ mês ≤ 12
  - 1900 ≤ ano ≤ ano atual

## 💾 Persistência dos dados

Os dados são salvos como JSON no LocalStorage:

```
localStorage.setItem("pessoas", JSON.stringify(pessoas));
```

E recuperados na inicialização:

```
JSON.parse(localStorage.getItem("pessoas")) || [];

```

## 🚀 Melhorias futuras (opcional)

- Validação em tempo real (oninput).
- Pesquisa por nome.
- Ordenação por data de nascimento.
- Exportar para CSV.
- Modo escuro (Dark Mode).
- Destaque visual para aniversários do mês.

## 📄 Licença

Este projeto é livre para estudo e uso pessoal.
