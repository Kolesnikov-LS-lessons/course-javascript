/* Задание со звездочкой */

/*
 Создайте страницу с кнопкой.
 При нажатии на кнопку должен создаваться div со случайными размерами, цветом и позицией на экране
 Необходимо предоставить возможность перетаскивать созданные div при помощи drag and drop
 Запрещено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер
 */

/*
 homeworkContainer - это контейнер для всех ваших домашних заданий
 Если вы создаете новые html-элементы и добавляете их на страницу, то добавляйте их только в этот контейнер

 Пример:
   const newDiv = document.createElement('div');
   homeworkContainer.appendChild(newDiv);
 */
import './dnd.html';

const homeworkContainer = document.querySelector('#app');

let currentDiv = false,
  ShiftX,
  ShiftY;

document.addEventListener('mousedown', (e) => {
  if (e.target.classList.contains('draggable-div')) {
    e.preventDefault();
    ShiftX = e.clientX - e.target.offsetLeft;
    ShiftY = e.clientY - e.target.offsetTop;
    e.target.style.cursor = 'move';
    e.target.style.zIndex = '2';
    currentDiv = e.target;
  }
});

document.addEventListener('mousemove', (e) => {
  e.preventDefault();
  if (currentDiv) {
    currentDiv.style.left = e.pageX - ShiftX + 'px';
    currentDiv.style.top = e.pageY - ShiftY + 'px';
  }
});

document.addEventListener('mouseup', (e) => {
  if (currentDiv) {
    e.preventDefault();
    currentDiv = false;
    e.target.style.cursor = 'auto';
    e.target.style.zIndex = 'auto';
  }
});

const randomInteger = (min, max) =>
  Math.round(min - 0.5 + Math.random() * (max - min + 1));

export function createDiv() {
  const minDivSize = 100,
    maxDivSize = 300,
    maxWindowWidth = document.documentElement.clientWidth,
    maxWindowHeight = document.documentElement.clientHeight,
    newDiv = document.createElement('div');
  newDiv.classList.add('draggable-div');
  newDiv.draggable = true;
  newDiv.style.width = randomInteger(minDivSize, maxDivSize) + 'px';
  newDiv.style.height = randomInteger(minDivSize, maxDivSize) + 'px';
  newDiv.style.backgroundColor = '#' + Math.random().toString(16).slice(3, 9);
  newDiv.style.left =
    randomInteger(0, maxWindowWidth - parseInt(newDiv.style.width)) + 'px';
  newDiv.style.top =
    randomInteger(0, maxWindowHeight - parseInt(newDiv.style.height)) + 'px';
  return newDiv;
}

const addDivButton = homeworkContainer.querySelector('#addDiv');

addDivButton.addEventListener('click', function () {
  const div = createDiv();
  homeworkContainer.appendChild(div);
});
