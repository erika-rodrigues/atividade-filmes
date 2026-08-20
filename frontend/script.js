const API_URL = "https://atividade-filmes-backend.vercel.app/";

// Buscar e exibir todos os filmes
async function buscarFilmes() {
    try {
        const resposta = await fetch(API_URL);
        if (!resposta.ok) {
            throw new Error("Erro ao buscar os filmes");
        }

        const filmes = await resposta.json();
        const sectionFilmes = document.querySelector(".filmes");
        sectionFilmes.innerHTML = "";

        filmes.forEach((filme) => {
            sectionFilmes.innerHTML += `
                <div>
                    <h2>${filme.titulo}</h2>
                    <p><strong>Gênero:</strong> ${filme.genero}</p>
                    <p><strong>Duração:</strong> ${filme.duracao} minutos</p>
                    <p><strong>Classificação:</strong> ${filme.classificacao} anos</p>
                    <button class="btn-deletar" onclick="deletarFilme(${filme.id})">Apagar</button>
                </div>
            `;
        });

    } catch (erro) {
        console.error("Erro:", erro);
        document.querySelector(".filmes").innerHTML = `
            <p>Erro ao carregar os filmes.</p>
        `;
    }
}

// Cadastrar novo filme através do formulário
document.getElementById("form-filme").addEventListener("submit", async (evento) => {
    evento.preventDefault();

    const novoFilme = {
        titulo: document.getElementById("titulo").value,
        genero: document.getElementById("genero").value,
        duracao: Number(document.getElementById("duracao").value),
        classificacao: Number(document.getElementById("classificacao").value)
    };

    try {
        const resposta = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(novoFilme)
        });

        if (resposta.ok) {
            document.getElementById("form-filme").reset();
            buscarFilmes();
        } else {
            alert("Erro ao cadastrar o filme.");
        }
    } catch (erro) {
        console.error("Erro na requisição:", erro);
    }
});

// Deletar um filme existente
async function deletarFilme(id) {
    if (!confirm("Deseja realmente apagar este filme?")) return;

    try {
        const resposta = await fetch(`${API_URL}/${id}`, {
            method: "DELETE"
        });

        if (resposta.ok) {
            buscarFilmes();
        } else {
            alert("Erro ao apagar o filme.");
        }
    } catch (erro) {
        console.error("Erro na requisição:", erro);
    }
}

// Inicializa a listagem ao carregar a página
buscarFilmes();