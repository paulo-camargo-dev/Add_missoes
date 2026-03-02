document.addEventListener("DOMContentLoaded", function(){

    const grid = document.getElementById("gridGaleria");
    const lightbox = document.getElementById("lightbox");
    const lightboxImg = document.getElementById("lightboxImg");

    let fotos = JSON.parse(localStorage.getItem("galeria")) || [];

    // Se não houver fotos
    if(fotos.length === 0){
        grid.innerHTML = "<p style='text-align:center;'>Nenhuma foto publicada ainda.</p>";
        return;
    }

    fotos.forEach((foto, index)=>{

        let card = document.createElement("div");
        card.classList.add("card");

        // Verifica se admin está logado
        let botaoExcluir = "";

        card.innerHTML = `
            <div class="imagem-wrapper">
                <img src="${foto.imagem}" class="img-galeria">
                <h3>${foto.titulo}</h3>
            </div>
            <div class="descricao-card">
                <p>${foto.descricao || "Sem descrição."}</p>
            </div>
        `;
        

        // Evento para abrir lightbox
        card.querySelector(".img-galeria").addEventListener("click", function(){
            abrirLightbox(foto.imagem);
        });

        grid.appendChild(card);
    });

    // Fechar lightbox ao clicar fora
    lightbox.addEventListener("click", function(){
        lightbox.style.display = "none";
    });

});

// ABRIR LIGHTBOX
function abrirLightbox(src){
    const lightbox = document.getElementById("lightbox");
    const lightboxImg = document.getElementById("lightboxImg");

    lightbox.style.display = "flex";
    lightboxImg.src = src;
}

// EXCLUIR FOTO (PROTEGIDO)
function excluirFoto(index){

    if(sessionStorage.getItem("adminLogado") !== "true"){
        alert("Acesso negado!");
        return;
    }

    let fotos = JSON.parse(localStorage.getItem("galeria")) || [];

    if(confirm("Deseja realmente excluir esta foto?")){
        fotos.splice(index,1);
        localStorage.setItem("galeria", JSON.stringify(fotos));
        location.reload();
    }
}