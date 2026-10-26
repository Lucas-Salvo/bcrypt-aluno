const botaoCad = document.getElementById("btnCad");
const botaoLog = document.getElementById("btnLog");
const getAll = document.getElementById("divGet");
const botaoGet = document.getElementById("btnGet");
const btnPut = document.getElementById('btnPut')

botaoGet.addEventListener("click", async () => {
    const resposta = await fetch("http://localhost:3000/alunos")
    const data = await resposta.json();
    document.getElementById("divGet").textContent = JSON.stringify(data);
})

botaoCad.addEventListener("submit", async () => {
    const resposta = await fetch("http://localhost:3000/registrar", {
        method: "POST",
        headers: {"Content-Type" : "application/json"},
        body: JSON.stringify({
            nome: document.getElementById("cadNome").value,
            email: document.getElementById("cadEmail").value,
            senha: document.getElementById("cadSenha").value
        })
    })
    const data = await resposta.json();
})

botaoLog.addEventListener("click", async () => {
    const resposta = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {"Content-Type" : "application/json"},
        body: JSON.stringify({
            nome: document.getElementById("logNome").value,
            email: document.getElementById("logEmail").value,
            senha: document.getElementById("logSenha").value
        })
    })
    const data = await resposta.json();
})

btnPut.addEventListener('click', async () => {
    const id = document.getElementById('putId').value;
    const response = await fetch(`http://localhost:3000/${id}`, {
        method: 'PUT', 
        headers: {'Contet-Type': 'application/json'},
        body: JSON.stringify({
            nome: document.getElementById('putNome').value,
            email: document.getElementById('putEmail').value,
            senha: document.getElementById('putSenha').value
        })
    })
    const data = await response.json()
    console.log(data)
})