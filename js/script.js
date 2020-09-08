/* Задания на урок 1:

1) Удалить все рекламные блоки со страницы (правая часть сайта)

2) Изменить жанр фильма, поменять "комедия" на "драма"

3) Изменить задний фон постера с фильмом на изображение "bg.jpg". Оно лежит в папке img.
Реализовать только при помощи JS

4) Список фильмов на странице сформировать на основании данных из этого JS файла.
Отсортировать их по алфавиту 

5) Добавить нумерацию выведенных фильмов */

/* Задания на урок 2:

1) Реализовать функционал, что после заполнения формы и нажатия кнопки "Подтвердить" - 
новый фильм добавляется в список. Страница не должна перезагружаться.
Новый фильм должен добавляться в movieDB.movies.
Для получения доступа к значению input - обращаемся к нему как input.value;
P.S. Здесь есть несколько вариантов решения задачи, принимается любой, но рабочий.

2) Если название фильма больше, чем 21 символ - обрезать его и добавить три точки

3) При клике на мусорную корзину - элемент будет удаляться из списка (сложно)

4) Если в форме стоит галочка "Сделать любимым" - в консоль вывести сообщение: 
"Добавляем любимый фильм"

5) Фильмы должны быть отсортированы по алфавиту */

// Возьмите свой код из предыдущей практики

'use strict';

document.addEventListener('DOMContentLoaded', () => {
    const movieDB = {
        movies: [
            "Логан",
            "Лига справедливости",
            "Ла-ла лэнд",
            "Одержимость",
            "Скотт Пилигрим против..."
        ]
    };
    
    const adv = document.querySelectorAll('.promo__adv img');
    const background = document.querySelector('.promo__bg');
    const changeGenre = background.querySelector('.promo__genre');
    const list = document.querySelector('.promo__interactive-list');
    const addForm = document.querySelector('form.add');
    const addInput = document.querySelector('.adding__input'); 
    const addCheckbox = document.querySelector('[type="checkbox"]') 
    
    addForm.addEventListener('submit', (event) => {
        event.preventDefault();
        let newFilm = addInput.value;
        const favorite = addCheckbox.checked;

        if (newFilm){

            if( newFilm.length > 21 ){
                newFilm = `${newFilm.substring(0,22)}...`;
            }

            movieDB.movies.push(newFilm);
            sortArr(movieDB.movies);
            createMovieList(movieDB.movies, list);
        }

        if(favorite){
            console.log("Добавляем любимый фильм");
        }

        event.target.reset();
    });

    const deleteAdv = (arr) => {
        arr.forEach(item => {
            item.remove();
        });
    };
    
    const makeChanges = () => {
        changeGenre.textContent = "драма";
        background.style.backgroundImage = "url(img/bg.jpg)";
    };

    const sortArr = (arr) => {
        arr.sort();
    };

    function createMovieList(films, parent){
        parent.innerHTML = "";
        sortArr(films);
        
        films.forEach(( item, i ) => {
            parent.innerHTML += `
                <li class="promo__interactive-item">${i+1} ${item}
                    <div class="delete"></div>
                </li>
            `;
        });

        document.querySelectorAll('.delete').forEach((btn, i) => {
            btn.addEventListener('click', () => {
                btn.parentElement.remove();
                movieDB.movies.splice(i, 1);
                createMovieList(films, parent);
            })
        })
    }

    deleteAdv(adv);
    makeChanges();
    createMovieList(movieDB.movies, list);
})



