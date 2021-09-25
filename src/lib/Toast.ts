const Toast = (value = '', position = 'center') => {
  const div:HTMLDivElement = document.createElement('div')
  div.textContent = value || null
  if (position === 'center'){
    div.setAttribute('style','position: absolute;left: 50%;top: 50%;transform: translate(-50%,-50%);' +
    'border-radius: 5px; background-color: #4c4c4c;color: white; line-height: 2em;' )
  }
  document.body.appendChild(div)
  setTimeout(()=>{
    div.remove()
  },1500)
}

export {Toast}