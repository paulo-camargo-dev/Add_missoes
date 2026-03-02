let imagemNoticiaBase64 = "";
let imagemFotoBase64 = "";

// VERIFICAR LOGIN AO CARREGAR
document.addEventListener("DOMContentLoaded", function(){

    if(sessionStorage.getItem("adminLogado") === "true"){
        liberarPainel();
    } else {
        document.getElementById("adminPanel").style.display = "none";
    }
});

// LOGIN
function verificarSenha(){
    let senha = document.getElementById("senhaAdmin").value;

    if(senha === "1234"){
        sessionStorage.setItem("adminLogado", "true");
        liberarPainel();
    } else {
        alert("Senha incorreta");
    }
}

function liberarPainel(){
    document.getElementById("adminLogin").style.display = "none";
    document.getElementById("adminPanel").style.display = "block";
    carregarFotosAdmin();
    carregarNoticiasAdmin();
}
// PREVIEW NOTICIA
document.getElementById("imagemNoticia").addEventListener("change", function(e){
    let reader = new FileReader();
    reader.onload = function(event){
        imagemNoticiaBase64 = event.target.result;
        let preview = document.getElementById("previewNoticia");
        preview.src = imagemNoticiaBase64;
        preview.style.display = "block";
    };
    reader.readAsDataURL(e.target.files[0]);
});

// PREVIEW FOTO
document.getElementById("imagemFoto").addEventListener("change", function(e){
    let reader = new FileReader();
    reader.onload = function(event){
        imagemFotoBase64 = event.target.result;
        let preview = document.getElementById("previewFoto");
        preview.src = imagemFotoBase64;
        preview.style.display = "block";
    };
    reader.readAsDataURL(e.target.files[0]);
});

// SALVAR NOTICIA
function salvarNoticia(){

    if(sessionStorage.getItem("adminLogado") !== "true"){
        alert("Acesso negado!");
        return;
    }

    let titulo = document.getElementById("tituloNoticia").value;
    let conteudo = document.getElementById("conteudoNoticia").value;

    if(!titulo || !conteudo || !imagemNoticiaBase64){
        alert("Preencha todos os campos!");
        return;
    }

    let noticias = JSON.parse(localStorage.getItem("noticias")) || [];

    noticias.unshift({
        titulo,
        conteudo,
        imagem: imagemNoticiaBase64
    });

    localStorage.setItem("noticias", JSON.stringify(noticias));

    alert("Notícia publicada!");
}

// SALVAR FOTO
function salvarFoto(){

    const titulo = document.getElementById("tituloFoto").value;
    const descricao = document.getElementById("descricaoFoto").value;
    const imagemInput = document.getElementById("imagemFoto");

    if(!titulo || !imagemInput.files[0]){
        alert("Preencha todos os campos!");
        return;
    }

    const reader = new FileReader();

    reader.onload = function(e){

        let fotos = JSON.parse(localStorage.getItem("galeria")) || [];

        fotos.push({
            titulo: titulo,
            descricao: descricao,
            imagem: e.target.result
        });

        localStorage.setItem("galeria", JSON.stringify(fotos));

        alert("Foto publicada com sucesso!");
        location.reload();
    };

    reader.readAsDataURL(imagemInput.files[0]);
}

function logout(){
    sessionStorage.removeItem("adminLogado");
    location.reload();
}

function carregarFotosAdmin(){

    let container = document.getElementById("listaFotosAdmin");
    container.innerHTML = "";

    let fotos = JSON.parse(localStorage.getItem("galeria")) || [];

    fotos.forEach((foto,index)=>{

        container.innerHTML += `
            <div class="admin-item">
                <img src="${foto.imagem}">
                <span>${foto.titulo}</span>
                <button onclick="excluirFotoAdmin(${index})">Excluir</button>
            </div>
        `;
    });
}

function excluirFotoAdmin(index){

    let fotos = JSON.parse(localStorage.getItem("galeria")) || [];

    if(confirm("Deseja excluir esta foto?")){
        fotos.splice(index,1);
        localStorage.setItem("galeria", JSON.stringify(fotos));
        carregarFotosAdmin();
    }
}
function carregarNoticiasAdmin(){

    let container = document.getElementById("listaNoticiasAdmin");
    container.innerHTML = "";

    let noticias = JSON.parse(localStorage.getItem("noticias")) || [];

    noticias.forEach((noticia,index)=>{

        container.innerHTML += `
            <div class="admin-item">
                <img src="${noticia.imagem}">
                <span>${noticia.titulo}</span>
                <button onclick="excluirNoticiaAdmin(${index})">Excluir</button>
            </div>
        `;
    });
}

function excluirNoticiaAdmin(index){

    let noticias = JSON.parse(localStorage.getItem("noticias")) || [];

    if(confirm("Deseja excluir esta notícia?")){
        noticias.splice(index,1);
        localStorage.setItem("noticias", JSON.stringify(noticias));
        carregarNoticiasAdmin();
    }
}

//sobre

