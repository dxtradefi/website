window.addEventListener('load', () => {
  
    // Список услуг
  const list = document.querySelector('.service')
  const listItem = document.querySelectorAll('.service-list')

  //   // Ищем ячейки с дополнительной информацией
  const arrBtnPlus = []
  for (const el of listItem) {
    if (el.children.length > 1) {
      arrBtnPlus.push(el)
    }
  }

    // Вставляем элемент "плюс" и атрубиты идентификации
  arrBtnPlus.forEach(el => {
    const btn = document.createElement('div')
    btn.setAttribute('class', 'plus-content')
    const plusIcon = document.createElement('span')
    btn.appendChild(plusIcon)
    el.children[1].setAttribute('data-content', `${el.id}`)
    el.children[0].append(btn)
  })
 
  const openContent = (el) => {
      // Берем id родителя
    const idEl = el.id
      // Берем span
    const childEl = el.querySelector('span')    
       // Перебираем массив с доп. инфой
    for (const txt of arrBtnPlus) {
      const infoBox = txt.children[1]      
      const infoBoxDataId = infoBox.getAttribute('data-content')
        // Проверка на id
        // Добавляем
      if (idEl === infoBoxDataId) {
        infoBox.classList.toggle('show')
        childEl.classList.toggle('hide')
      }
    }
  } 
    // Делигирование
    // Метод closest() - возвращает ближайший родительский элемент
  list.addEventListener('click', e => {
    const el = e.target.closest('li')
    openContent(el)
  })
})