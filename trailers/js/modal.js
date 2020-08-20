export function modalWindow (e) {
    
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