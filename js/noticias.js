document.addEventListener("DOMContentLoaded", function(){

    const lista = document.getElementById("listaNoticias");
    let noticias = JSON.parse(localStorage.getItem("noticias")) || [];

    if(noticias.length === 0){
        lista.innerHTML = "<p style='text-align:center;'>Nenhuma notícia publicada ainda.</p>";
        return;
    }

    noticias.forEach((n, index)=>{

        let previa = n.conteudo.length > 120 
            ? n.conteudo.substring(0,120) + "..." 
            : n.conteudo;

        let card = document.createElement("div");
        card.classList.add("card-noticia");

        card.innerHTML = `
            <img src="${n.imagem}">
            <div class="conteudo-noticia">
                <h2>${n.titulo}</h2>
                <p>${previa}</p>
                <span class="ler-mais">Leia mais →</span>
            </div>
        `;

        // 🔥 FORÇANDO clique funcionar
        card.style.cursor = "pointer";

        card.onclick = function(){
            window.location.href = "noticia.html?id=" + index;
        };

        lista.appendChild(card);
    });

});