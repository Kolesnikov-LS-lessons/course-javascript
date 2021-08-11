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

document.addEventListener('mousemove', (e) => {
  e.preventDefault();
  if (currentDiv) {
    currentDiv.style.left = e.pageX - ShiftX + 'px';
    currentDiv.style.top = e.pageY - ShiftY + 'px';
  }
});

export function createDiv() {
  const minDivSize = 100,
    maxDivSize = 300,
    maxWindowWidth = document.documentElement.clientWidth,
    maxWindowHeight = document.documentElement.clientHeight,
    randomInteger = (min, max) => Math.round(min - 0.5 + Math.random() * (max - min + 1)),
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
  newDiv.addEventListener('mousedown', (e) => {
    e.preventDefault();
    ShiftX = e.clientX - newDiv.offsetLeft;
    ShiftY = e.clientY - newDiv.offsetTop;
    newDiv.style.cursor = 'move';
    newDiv.style.zIndex = '2';
    currentDiv = newDiv;
  });
  newDiv.addEventListener('mouseup', (e) => {
    e.preventDefault();
    currentDiv = false;
    newDiv.style.cursor = 'auto';
    newDiv.style.zIndex = 'auto';
  });
  return newDiv;
}

const addDivButton = homeworkContainer.querySelector('#addDiv');

addDivButton.addEventListener('click', function () {
  const div = createDiv();
  homeworkContainer.appendChild(div);
});
