window.addEventListener('DOMContentLoaded', DOMloaded);

function DOMloaded() {
  // BUTTONS
  const btns = document.querySelector('#buttons');
  const boxs = document.querySelectorAll('.bt-box');

  function btnFun(e) {
    const btn = e.target;
    if (btn.id == 'buttons') {
      return;
    }
    if (!btn.classList.contains('active')) {
      for (const i of btns.children) {
        if (i.classList.contains('active')) {
          i.classList.remove('active');
          btnDisable = false;
        }
      }
      btn.classList.add('active');
      attr = btn.getAttribute('data-btnId');
      btnActive = true;
    }
    boxesAction(attr);
  }
  btns.addEventListener('click', btnFun);

  // BOXES
  function boxesAction(index) {
    boxs.forEach(box => {
      if (box.getAttribute('data-boxId') === index) {
        if (!box.classList.contains('show-spec')) {
          box.className = 'bt-box show-spec';
        }
      } else {
        box.className = 'bt-box hide-spec';
      }
    });
  }

  // КАРУСЕЛЬ КАРТИНОК
  // СМ. прототип с комментариями

  const carusel = document.querySelector('#carusel');
  let caruselWidth = Math.round(carusel.getBoundingClientRect().width);
  const collage = document.querySelector('#collage');
  const collageWidth = collage.getBoundingClientRect().width;
  const nextBtn = document.getElementById('next-btn');
  const prevBtn = document.getElementById('prev-btn');
  const imgs = document.querySelectorAll('.open-img');
  const slideWidth = collage.children[0].getBoundingClientRect().width;
  const marginRight = 20;
  var posInitial;
  let posFinal;
  let posX1 = 0;
  let posX2 = 0;
  let doubleTouch = false;

  // Событие нажатия мыши
  collage.addEventListener('mousedown', startAction);

  // Событие нажатия пальцем
  collage.addEventListener('touchstart', startAction);
  collage.addEventListener('touchmove', moveAction);
  collage.addEventListener('touchend', endAction);

  // Событие двойного нажатия (открыть модальное окно)
  collage.addEventListener('dblclick', openModalWindow);
  collage.addEventListener('touchstart', openModalWindow);
  imgs.forEach(img => {
    img.addEventListener('click', openModalWindow);
  });

  // Событие кнопок контроля
  nextBtn.addEventListener('click', btnAction.bind(null, 'next'));
  prevBtn.addEventListener('click', btnAction.bind(null, 'prev'));

  collage.addEventListener('transitioned', animaSlide);

  // Добавляем анимацию при переходах или клаках
  function animaSlide() {
    collage.classList.add('slide-anim');
  }

  // Функция событие при нажатии на карусель
  function startAction(e) {
    // Ignored attempt to cancel a touchstart event with cancelable=false
    if (e.cancelable) {
      e.preventDefault();
    }
    // Удаляем анимацию при перетаскивании
    // !!! ВНИМАНИЕ если не удалить, то перетаскиваться не будет
    collage.classList.remove('slide-anim');

    // Ширина карусели при смене ориентации
    if (screen.orientation.type === 'portrait-primary') {
      caruselWidth = carusel.getBoundingClientRect().width;
    } else {
      caruselWidth = carusel.getBoundingClientRect().width;
    }

    // Начальная позиция колажа
    // posInitial = collage.offsetLeft
    if (e.type === 'touchstart') {
      // Текущая позиция касания
      posX1 = e.touches[0].screenX;
    } else {
      // Текущая позиция мыши
      posX1 = e.clientX;
    }

    // Собыитя документа при нажатии мыши
    document.onmousemove = moveAction;
    document.onmouseup = endAction;
  }

  // Фунция собития при перетаскивании карусели
  function moveAction(e) {
    if (e.type === 'touchmove') {
      // Предыдущая позиция - текущая позиция
      posX2 = posX1 - e.touches[0].screenX;
      // Текущая позиция
      posX1 = e.touches[0].screenX;
    } else {
      posX2 = posX1 - e.clientX;
      posX1 = e.clientX;
    }

    // Текущая позиция колажа при передвижении
    posInitial = Math.round(collage.offsetLeft);
    // Конечная позиция колажа
    // Ширина колажа, ширини карусели, правый отступ 20px
    posFinal = Math.round(-(collageWidth - caruselWidth - marginRight));
    // Центр одной ячейки слайда
    const halfSlide = slideWidth + marginRight;

    // Класс для контроллера
    if (posInitial > -halfSlide) {
      prevBtn.classList.add('hide');
    } else {
      prevBtn.classList.remove('hide');
    }

    if (posInitial < posFinal + halfSlide) {
      nextBtn.classList.add('hide');
    } else {
      nextBtn.classList.remove('hide');
    }

    // Отнимаем от текущей позиции элемента
    // Фиксируем начальное и конечно положение
    // (убирает поддергивания карусели если выходит за пределы 1-2px)
    let posCurrent = collage.offsetLeft - posX2;
    posCurrent = posCurrent <= 15 ? posCurrent : null;
    posCurrent = posCurrent >= posFinal ? posCurrent : null;

    // полученое смещение курсора
    collage.style.left = `${posCurrent}px`;
  }

  // Функия при отжатии мыши/пальца от карусели
  function endAction() {
    // Добавляем transition
    animaSlide();
    // Начальная позиция
    posInitial = Math.round(collage.offsetLeft);
    // Конецовка последнего слайда
    // по отношению к правому краю карусели
    // Ширина коллажа - ширина карусели - 20px margin-right
    posFinal = Math.round(-(collageWidth - caruselWidth - marginRight));
    // Слайд с правым отступом
    const slide = slideWidth + marginRight;

    // Если смещение меньше половины начального слайда
    // Возвращаем к началу
    if (posInitial > -(slide / 2)) {
      btnAction('prev');
      collage.style.left = `${15}px`;
      prevBtn.classList.add('hide');
    }
    // Если смещение больше половины начального слайда
    // Возвращаем к следующему слайду
    else if (posInitial < -(slide / 2) && posInitial >= -slide) {
      prevBtn.classList.remove('hide');
      collage.style.left = `-${slide}px`;
    }

    // Если смещение больше половины последнего слайда
    // возвращаем к posFinal
    if (posInitial <= posFinal + slide / 2) {
      btnAction('next');
      collage.style.left = `${posFinal}px`;
      nextBtn.classList.add('hide');
    }
    // Если смещение меньше половины последнего слайда
    // возвращаем к предыдущему слайду
    else if (posInitial < posFinal + slide) {
      nextBtn.classList.remove('hide');
      collage.style.left = `${posFinal + slide}px`;
    }
    // Сбрасываем событие нажатия
    document.onmouseup = null;
    document.onmousemove = null;
  }

  // Стрелочный контроллер (кнопки - стрелки)
  function btnAction(dir) {
    // Начальная позиция
    posInitial = collage.offsetLeft;
    // Слайд с правым отступом
    const slide = slideWidth + marginRight;
    // Конечная позиция колажа
    posFinal = -(collageWidth - caruselWidth - marginRight);
    // добавляем стиль с Transition
    animaSlide();

    if (dir === 'next') {
      collage.style.left = `${posInitial - slide}px`;
      prevBtn.classList.remove('hide');

      if (posInitial <= posFinal + slide) {
        nextBtn.classList.add('hide');
        collage.style.left = `${posFinal}px`;
      }
    }

    if (dir === 'prev') {
      collage.style.left = `${posInitial + slide}px`;
      nextBtn.classList.remove('hide');

      if (posInitial >= -slide) {
        prevBtn.classList.add('hide');
        collage.style.left = `${15}px`;
      }
    }
  }

  // МОДАЛЬНОЕ ОКНО
  function openModalWindow(e) {
    // Проверяем на касание
    if (e.type === 'touchstart') {
      // Проверка на двойное касание
      // С использованием setTimeout()
      // Если касание не повторилось за 300мс
      // Оно не засчитывается как двойное
      if (!doubleTouch) {
        setTimeout(() => {
          doubleTouch++;
          if (doubleTouch == 1) {
            setTimeout(() => {
              doubleTouch = false;
            }, 300);
          }
          if (doubleTouch > 1) {
            // Импортирование модального окна
            // Не грузим личней код без надобности
            import('./modal.js').then(modal => {
              modal.modalWindow(e);
            });
            doubleTouch = false;
          }
        }, 300);
      }
    } else {
      import('./modal.js').then(modal => {
        modal.modalWindow(e);
      });
    }
  }
}
