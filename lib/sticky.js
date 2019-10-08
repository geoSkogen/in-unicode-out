var shell = document.querySelector('#sticky_shell')
var nav = document.querySelector('#sticky_nav')
var sticky = false

window.addEventListener('scroll', function () {
  if (window.pageYOffset > 60) {
    if (!sticky) {
      sticky = true
      shell.className += '_sticky'
      nav.className += '_space'
    }
  }

  if (window.pageYOffset <= 60) {
    if (sticky) {
      sticky = false
      nav.className = nav.className.slice( 0, nav.className.indexOf('_space') )
      shell.className = shell.className.slice( 0, shell.className.indexOf('_sticky') )

    }
  }

})
