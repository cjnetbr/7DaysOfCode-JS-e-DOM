//Day 1 - vincular uma função ao evento de submissão do formulário.
// A função vinculada deverá pegar o valor informado nos campos nome e
//  data de nascimento e imprimi-los no console.

const btnSubmit = document.querySelector("#submit");

btnSubmit.addEventListener("click", (e) => {
  e.preventDefault();
  const nome = document.querySelector("#name").value;
  const dataNascimento = document.querySelector("#birth-date").value;
  console.log(nome, dataNascimento);
});
