async function getDados() {
    const resposta = await fetch("http://localhost:3000/alunos");
    const alunos = await resposta.json();
    const lista = document.getElementById("dados");
}

async function postRegistro(event){
    event.preventDefault();

    const respostaRegistro = await fetch("http://localhost:3000/registrar", {
        method: "POST",
        headers: {"Content-Type" : "application/json"},
        body: JSON.stringify({
            nome, email, senha
        })
    });
}

async function postLogin(event) {
    event.preventDefault();

    const respostaLogin = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {"Content-Type" : "application/json"},
        body: JSON.stringify({
            nome, email, senha
        })
    });
}

async function putDados(id) {
    const respostaPut = await fetch(`http://localhost:3000/alunos/${id}`, {
        method: "PUT",
        headers: {"Content-Type" : "application/json"},
        body: JSON.stringify({
            nome, email, senha
        })
    });
}

async function deleteDados(id) {
    const respostaDelete = await fetch(`http://localhost:3000/alunos/${id}`, {
        method: "DELETE"
    });
    if(!respostaDelete.ok){
        getDados();
    }
}

getDados();