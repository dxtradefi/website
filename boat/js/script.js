// window.onload = function () {
window.addEventListener('DOMContentLoaded', DOMloaded)

function DOMloaded () {

  // BUTTONS
  const btns = document.querySelector('#buttons')
  const boxs = document.querySelectorAll('.bt-box')

  function btnFun (e) {
    const btn = e.target
    if (btn.id == "buttons") {
      return
    }
    if (!btn.classList.contains('active')) {
      for (const i of btns.children) {
        if (i.classList.contains('active')) {
          i.classList.remove('active')
          btnDisable = false
        }
      }
      btn.classList.add('active');
      attr = btn.getAttribute('data-btnId')
      btnActive = true
    }
    boxesAction(attr)
  }
  btns.addEventListener('click', btnFun)

  // BOXES
  function boxesAction(index) {
    boxs.forEach(box => {
      if (box.getAttribute('data-boxId') === index ) {
        if (!box.classList.contains('show-spec')) {
          box.className = 'bt-box show-spec'
        }        
      } else {
        box.className = 'bt-box hide-spec'
      }
    })
  }






  // КАРУСЕЛЬ КАРТИНОК
  // СМ. прототип с комментариями

  const carusel = document.querySelector('#image-carusel')
  let caruselWidth = carusel.getBoundingClientRect().width
  const collage = document.querySelector('#image-collage')
  const collageWidth = collage.getBoundingClientRect().width
  let posInitial
  let posX1 = 0
  let posX2 = 0
  let doubleTouch = false
  
    // Событие нажатия мыши
  collage.addEventListener('mousedown', startAction)
  
    // Событие нажатия пальцем
  collage.addEventListener('touchstart', startAction)
  collage.addEventListener('touchmove', moveAction)
  collage.addEventListener('touchend', endAction)

    // Событие двойного нажатия (открыть модальное окно)
  collage.addEventListener('dblclick', openModalWindow)
  collage.addEventListener('touchstart', openModalWindow)
    

  function startAction (e) {
      // Ignored attempt to cancel a touchstart event with cancelable=false
    if (e.cancelable) {
      e.preventDefault();
    }

    if (screen.orientation.type === 'portrait-primary') {
      caruselWidth = carusel.getBoundingClientRect().width
    } else {
      caruselWidth = carusel.getBoundingClientRect().width
    }
    
      // Начальная позиция колажа 
    posInitial = collage.offsetLeft
    if (e.type === 'touchstart') { 
        // Текущая позиция касания
      posX1 = e.touches[0].screenX
      
      
    } else {
      // Текущая позиция мыши
      posX1 = e.clientX
    }

      // Собыитя документа при нажатии мыши
    document.onmousemove =  moveAction
    document.onmouseup =  endAction
  }
  
  

  function moveAction (e) {
    if (e.type === 'touchmove') {
        // Предыдущая позиция - текущая позиция
      posX2 = posX1 - e.touches[0].screenX
        // Текущая позиция
      posX1 = e.touches[0].screenX
    } else {
      posX2 = posX1 - e.clientX
      posX1 = e.clientX
    }

      // Отнимаем от текущей позиции элемента, полученое смещение курсора
    collage.style.left = `${collage.offsetLeft - posX2}px`
  }
  
  
  function endAction (e) {
      // Конецовка последнего слайда
      // по отношению к правому краю карусели
      // Ширина коллажа - ширина карусели - 20px margin-right

    if (e.cancelable) {
      e.preventDefault();
    }

    let endOfSlides = -(collageWidth - caruselWidth)
    // console.log(endOfSlides);
    

      // Если смещение больше 0, возвращаем к началу
    if (collage.offsetLeft >= 0) {
      collage.style.left = `${15}px`
    }
    
    // Если смещение больше endOfSlides
    // возвращаем к ndOfSlides
    if (collage.offsetLeft <= endOfSlides) {
      collage.style.left = `${endOfSlides}px`
    }
      // Сбрасываем событие нажатия
    document.onmouseup = null
    document.onmousemove = null
  }

  
  function openModalWindow (e) {
      
      // Проверяем на касание
    if (e.type === 'touchstart') {
        // Проверка на двойное касание
        // С использованием setTimeout()
        // Если касание не повторилось за 300мс
        // Оно не засчитывается как двойное
      if (!doubleTouch) {
        setTimeout(() => {
          doubleTouch++
          if (doubleTouch == 1) {
            setTimeout(() => {
              doubleTouch = false
            },300)
          }
          if (doubleTouch > 1) {
            // console.log('double touch');
            modalWindow(e)
            doubleTouch = false
          }
        },300)
      }
    } else {
      modalWindow(e)
      // console.log('double click');
    }
  }
  function modalWindow (e) {
    console.log(e);
    
    const body = e.target.closest('body')
    const main = e.target.closest('main')
      // Проверка на наличие ссылки на картинку
    if (e.target.getAttribute('src') === null) {
      return
    }
    const link = e.target.getAttribute('src')
    
    // Создаем элементы
    const modal = document.createElement('div')
    const block = document.createElement('figure')
    const image = document.createElement('img')
    const close = document.createElement('span')


    modal.setAttribute('class', 'modal')
    block.setAttribute('id', 'modal-box')
    image.setAttribute('src', `${link}`)
    image.setAttribute('draggable', false)
    close.setAttribute('class', 'close-btn')

    block.appendChild(image)
    // block.appendChild(close)
    modal.appendChild(block)
    modal.appendChild(close)
    body.insertBefore(modal, main)
    setTimeout(() => {
      modal.classList.add('show-modal')
    }, 100)
    body.style.overflow = 'hidden'

    modal.addEventListener('click', closeModal)
    // close.addEventListener('click', closeModal)
    // console.log(e.target.closest('body'));
    function closeModal (e) {
      body.removeAttribute('style')
      
      if (e.target.className === '') {
        return
      }
      modal.classList.remove('show-modal')
      setTimeout(() => {
        modal.remove()
      }, 300)
    }
  }
}