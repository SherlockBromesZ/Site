const pontos = [
    { nome: "Condomel – Big Bee Brasil", endereco: "R. Leonardo Meca, 56 – Centro", lat: -23.7095169, lng: -46.412993 },
    { nome: "Condomel – Câmara Municipal", endereco: "Rua Virgílio Gola, 40 – Pastoril", lat: -23.7112766, lng: -46.4112281 },
    { nome: "Condomel – Espaço Lavoisier", endereco: "Av. Pref. Valdírio Prisco, 200 – Centro", lat: -23.7081625, lng: -46.4173833  },
    { nome: "Condomel – Abelhas da Justiça", endereco: "Av. Pref. Valdírio Prisco, 150 – Centro", lat: -23.7083724, lng: -46.4175207 },
    { nome: "Condomel – Colégio Gran Leone", endereco: "Jardim Panorama – R. Águida Tori Sortino, 90 – Centro", lat: -23.7075713, lng: -46.4087648 },
    { nome: "Condomel – Abelhas da Saúde", endereco: "Rua Júlio Prestes 22, Jardim Luzo", lat: -23.7112517, lng: -46.38577 },
    { nome: "Condomel – Pomar Urbano", endereco: "Estr. da Col., 1500 – Santa Luzia", lat: -23.6944009, lng: -46.3967345 },
    { nome: "Condomel – LeBem", endereco: "Av. Benjamim Baptista Cerezoli, 580 – Pilar Velho", lat: -23.6821879, lng: -46.4074776 },
    { nome: "Condomel – Abelhas da Educação", endereco: "R. Emerson Conde Soares Giacomini, 200 – Ouro Fino", lat: -23.6818131, lng: -46.355889 },
    { nome: "Condomel – CRI", endereco: "R. Alferes Botacin, 171 – Centro Alto", lat: -23.7157106, lng: -46.4132153 },
    { nome: "Condomel – Vila do Doce", endereco: "R. Boa Vista, s/n – Centro", lat: -23.711525, lng: -46.4130372 },
    { nome: "Condomel – Escola Municipal Edir Maria de Oliveira", endereco: "Av. Ver. Rubens Maziero, 526 – Sítio Santana", lat: -23.6747838, lng: -46.3452608 },
    { nome: "Condomel – Toth", endereco: "R. Osvaldo Cruz, 02 – Centro", lat: -23.71965, lng: -46.4105132 },
    { nome: "Condomel – Estancia Delfis", endereco: "R. Eugênio Galo, 145 – Centro", lat: -23.7067633, lng: -46.4084658 },
    { nome: "Condomel – CAPS Infantil", endereco: "R. Primeiro de Maio, 108 – Jardim Itacolomy", lat: -23.706735, lng:-46.4167056 }
];


const map = L.map('map').setView([-23.7111, -46.4140], 13);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);


const customIcon = L.icon({
    iconUrl: 'img/brr.png',
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32]
});

const markers = pontos.map(ponto => 
    L.marker([ponto.lat, ponto.lng], {icon: customIcon})
     .addTo(map)
     .bindPopup(`<b>${ponto.nome}</b><br>${ponto.endereco}`)
);

const pontosList = document.getElementById('pontos-lista');
pontos.forEach((ponto, index) => {
    const li = document.createElement('li');
    li.innerHTML = `<strong>${ponto.nome}:</strong> ${ponto.endereco}`;
    li.style.cursor = 'pointer';
    li.addEventListener('click', () => {
        document.getElementById('map').scrollIntoView({ behavior: 'smooth' });
        
        setTimeout(() => {
            map.setView([ponto.lat, ponto.lng], 18);
            markers[index].openPopup();
        }, 500);
    });
    pontosList.appendChild(li);
});

document.getElementById('visitForm').addEventListener('submit', function(e) {
    e.preventDefault();
    alert('Sua solicitação de visita foi enviada com sucesso! Entraremos em contato em breve para confirmar os detalhes.');
    this.reset();
});

const scrollToTopButton = document.getElementById('scrollToTop');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollToTopButton.style.display = 'block';
    } else {
        scrollToTopButton.style.display = 'none';
    }
});

scrollToTopButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.fade-in').forEach(el => {
    observer.observe(el);
});

