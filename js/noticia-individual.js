document.addEventListener("DOMContentLoaded", function(){

    const container = document.getElementById("noticiaCompleta");

    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");

    let noticias = JSON.parse(localStorage.getItem("noticias")) || [];

    if(id === null || !noticias[id]){
        container.innerHTML = "<h2 style='text-align:center;'>Notícia não encontrada.</h2>";
        return;
    }

    let noticia = noticias[id];

    container.innerHTML = `
        <div class="layout-noticia">

            <div class="imagem-noticia">
                <img src="${noticia.imagem}" alt="">
            </div>

            <div class="conteudo-noticia-individual">
                <h1>${noticia.titulo}</h1>
                <div class="linha"></div>
                <p>${noticia.conteudo}</p>
            </div>

        </div>
    `;
});

// botão voltar
function voltarPagina(){
    window.history.back();
}