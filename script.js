const miniatures = [
    { title: `Custodes Soldaty`, folder: `images/soldaty`, count: 5, description: `Вексила` },
    { title: `Custodes Warden`, folder: `images/warden`, count: 5, description: `Основной воин` },
    { title: `Custodes Shield-captain`, folder: `images/shield-captain`, count: 5, description: `Капитан` }
]; 
// создание карточек
const modal = document.querySelector(`#modal`);
const modalImg = document.querySelector(`#modal-img`);
const closeBtn = document.querySelector(`#close`);
const themeBtn = document.querySelector(`#theme`); // смена темы
const caption = document.querySelector(`#caption`);
const modalDescription = document.querySelector(`#description`);
const prevBtn = document.querySelector(`#prev`); 
const nextBtn = document.querySelector(`#next`);
const gallery = document.querySelector(`main`);
let photos = [];
let index = 0;
let title = ``;

miniatures.forEach(function (miniature) {
    const card = document.createElement(`article`);
    card.className = `card`;
    card.dataset.folder = miniature.folder;
    card.dataset.count = miniature.count;

    const img = document.createElement(`img`);
    img.src = `${miniature.folder}/1.jpg`;

    const heading = document.createElement(`h2`);
    heading.textContent = miniature.title;

    const description = document.createElement(`p`);
    description.textContent = miniature.description;

    card.append(img, heading, description);
    gallery.append(card);
});

const cards = document.querySelectorAll(`.card`);

function showPhoto() {
    modalImg.src = photos[index];
    caption.textContent = `${title} (${index + 1}/${photos.length})`;
    modalImg.alt = caption.textContent;
}

function closeModal() {
    modal.classList.remove(`open`);
}

function nextPhoto() {
    index = index + 1;
    if (index === photos.length) {
        index = 0;
    }
    showPhoto();
};

function prevPhoto() {
    index = index - 1;
    if (index < 0) {
        index = photos.length - 1;
    }
    showPhoto();
}

cards.forEach(function (card) {
    card.addEventListener(`click`, function () {
        photos = [];
        for (let i = 1; i <= Number(card.dataset.count); i++){
            photos.push(`${card.dataset.folder}/${i}.jpg`);
        }
        index = 0;
        title = card.querySelector(`h2`).textContent;
        modalDescription.textContent = card.querySelector(`p`).textContent;
        prevBtn.hidden = photos.length === 1;
        nextBtn.hidden = photos.length === 1;
        console.log(photos, index, title);
        showPhoto();
        modal.classList.add(`open`);
    });
});

// стрелка дальше
nextBtn.addEventListener(`click`, function () {
    nextPhoto ();
});

// стрелка назад
prevBtn.addEventListener(`click`, function () {
    prevPhoto ();
});

// закрывать на крестик
closeBtn.addEventListener(`click`, function() {
    closeModal();
});

// закрывать по клику на фон
modal.addEventListener(`click`, function (event) { 
    if (event.target === modal) {
        closeModal();
    }
});

// закрывать на Esc стрелки перелистывают фото Home End прыгают по краям
document.addEventListener(`keydown`, function (event) {
    if (modal.classList.contains(`open`)){
        if (event.key === `Escape`) {
            closeModal();
        } else if (event.key === `ArrowRight`) {
            nextPhoto();
        } else if (event.key === `ArrowLeft`) {
            prevPhoto();
        } else if (event.key === `Home`) {
            index = 0;
            showPhoto();
        } else if (event.key === `End`) {
            index = photos.length - 1;
            showPhoto();
        }

    }
    
});
//обработчик кнопки темы
themeBtn.addEventListener(`click`, function() {
    document.querySelector(`body`).classList.toggle(`red`);
    if (document.body.classList.contains(`red`)) {
        localStorage.setItem(`theme`, `red`);
    } else {
        localStorage.setItem(`theme`, `gold`);
    }
});
//запомненная тема
if (localStorage.getItem(`theme`) === `red`) {
    document.body.classList.add(`red`);
}