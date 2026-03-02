// ===================== HERO DINÂMICO =====================
function carregarHeroHome() {
    const hero = document.getElementById("heroBanners");
    if (!hero) return;

    const banners = JSON.parse(localStorage.getItem("heroBanners")) || [
        {imagem:"assets/images/banner1.jpg", titulo:"Levando esperança onde há necessidade", subtitulo:"Junte-se à nossa missão e faça parte da transformação."},
        {imagem:"assets/images/banner2.jpg", titulo:"Impactando famílias", subtitulo:"Através de ações sociais e evangelismo."},
        {imagem:"assets/images/banner3.jpeg", titulo:"Missões pelo mundo", subtitulo:"Expandindo o Reino de Deus."}
    ];

    hero.innerHTML = "";

    banners.forEach((b,i)=>{
        const div = document.createElement("div");
        div.classList.add("hero-slide");
        if(i===0) div.classList.add("active");
        div.style.backgroundImage = `url('${b.imagem}')`;
        div.innerHTML = `
            <div class="hero-overlay"></div>
            <div class="hero-content">
                <h1>${b.titulo}</h1>
                <p>${b.subtitulo}</p>
            </div>
        `;
        hero.appendChild(div);
    });

    // Troca automática de slides
    let current = 0;
    setInterval(() => {
        const slides = document.querySelectorAll('.hero-slide');
        slides[current].classList.remove('active');
        current = (current + 1) % slides.length;
        slides[current].classList.add('active');
    }, 5000);
}

// ===================== ADMIN HERO =====================
function carregarHeroAdmin(){
    const lista = document.getElementById("listaHeroAdmin");
    if(!lista) return;

    const banners = JSON.parse(localStorage.getItem("heroBanners")) || [];
    lista.innerHTML = "";

    banners.forEach((b,i)=>{
        const div = document.createElement("div");
        div.classList.add("admin-item");
        div.innerHTML = `
            <img src="${b.imagem}" alt="Banner ${i+1}">
            <div>
                <strong>${b.titulo}</strong><br>
                <small>${b.subtitulo}</small>
            </div>
            <button onclick="removerHero(${i})">Excluir</button>
        `;
        lista.appendChild(div);
    });
}

// Salvar novo banner
function salvarHero(){
    const titulo = document.getElementById("tituloHero").value;
    const subtitulo = document.getElementById("subtituloHero").value;
    const file = document.getElementById("imagemHero").files[0];

    if(!file) return alert("Selecione uma imagem");

    const reader = new FileReader();
    reader.onload = function(){
        const banners = JSON.parse(localStorage.getItem("heroBanners")) || [];
        banners.push({
            titulo: titulo,
            subtitulo: subtitulo,
            imagem: reader.result
        });
        localStorage.setItem("heroBanners", JSON.stringify(banners));
        carregarHeroAdmin();

        document.getElementById("tituloHero").value = "";
        document.getElementById("subtituloHero").value = "";
        document.getElementById("imagemHero").value = "";
        document.getElementById("previewHero").style.display = "none";
    }
    reader.readAsDataURL(file);
}

// Remover banner
function removerHero(index){
    const banners = JSON.parse(localStorage.getItem("heroBanners")) || [];
    banners.splice(index,1);
    localStorage.setItem("heroBanners", JSON.stringify(banners));
    carregarHeroAdmin();
}

// Preview da imagem
document.getElementById("imagemHero")?.addEventListener("change", function(){
    const file = this.files[0];
    if(file){
        const reader = new FileReader();
        reader.onload = function(){
            const img = document.getElementById("previewHero");
            img.src = reader.result;
            img.style.display = "block";
        }
        reader.readAsDataURL(file);
    }
});

// ===================== SOBRE DINÂMICO =====================
function carregarSobre(){
    const sobreSection = document.getElementById("sobreSection");
    if(!sobreSection) return;

    const sobre = JSON.parse(localStorage.getItem("sobre")) || {
        titulo: "Quem Somos",
        texto: "Somos um ministério missionário comprometido em transformar vidas, apoiar comunidades e compartilhar o amor de Cristo através de ações sociais e projetos missionários nacionais e internacionais."
    };

    sobreSection.innerHTML = `
        <div class="container">
            <h2>${sobre.titulo}</h2>
            <p>${sobre.texto}</p>
        </div>
    `;
}

// Salvar conteúdo do "Quem Somos" (para admin)
function salvarSobre(){
    const titulo = document.getElementById("tituloSobre").value;
    const texto = document.getElementById("textoSobre").value;
    if(!titulo || !texto) return alert("Preencha todos os campos");

    localStorage.setItem("sobre", JSON.stringify({titulo,texto}));
    alert("Seção 'Quem Somos' atualizada!");
    carregarSobre();
}

// Atualiza em tempo real se o admin modificar em outra aba
window.addEventListener("storage", function(event){
    if(event.key === "sobre") carregarSobre();
    if(event.key === "heroBanners") carregarHeroHome();
});

// Inicializa tudo ao carregar a página
document.addEventListener("DOMContentLoaded", function(){
    carregarHeroHome();
    carregarHeroAdmin();
    carregarSobre();
});