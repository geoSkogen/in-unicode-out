'use strict'

//window.addEventListener('load', init_charcodes)

//function init_charcodes() {

  function toggle_app(this_id) {
    var appendages = ['_title','_link']
    var trimmed_id = ''
    var icons = document.querySelectorAll('i')
    var title_icons = []
    var toggle_back = false
    icons.forEach( (e) => {
      if (e.id.indexOf('_title_icon') > -1) {
        title_icons.push(e)
      }
    })
    appendages.forEach( (e) => {
      if (this_id.indexOf(e) > -1) {
        trimmed_id = this_id.slice( 0, this_id.indexOf(e) )
      }
    })

    toggle_back =
      (document.querySelector('#' + trimmed_id).
        querySelector('.appShell').style.display === 'block') ?
      true : false

    for (let i = 0; i < app_links.length; i++) {

      app_links[i].style.display = 'block'
      if (app_links[i].href.indexOf(trimmed_id) > -1 && !toggle_back) {
        app_links[i].style.display = 'none'
      }

      app_els[i].querySelector('.appShell').style.display = 'none'
      if (app_els[i].id === trimmed_id && !toggle_back) {
        app_els[i].querySelector('.appShell').style.display = 'block'
      }

      title_icons[i].className = 'fas fa-caret-right'
      if (title_icons[i].id.indexOf(trimmed_id) > -1 && !toggle_back) {
        title_icons[i].className = 'fas fa-caret-down'
      }

    }
  }

  //Main Namespace - Parent DOM elements and corresponding data objects
  var app_els = document.querySelectorAll('.app')
  var app_links = document.querySelectorAll('.app_link')
  var apps = {}

  app_links.forEach( (this_link) => {
    this_link.addEventListener( 'click', function () {
      console.log(this.id)
      toggle_app(this.id)
    })
  })

  app_els.forEach( (app_el) => {
    //Assigns DOM and data scope for app components
    var this_title = app_el.querySelector('.app_title')
    var this_input = app_el.querySelector('#' + app_el.id + '_in')
    var aux_input = app_el.querySelectorAll('input')[1]
    var these_modes = app_el.querySelectorAll('.' + app_el.id + '_mode')
    var this_go = app_el.querySelector('.go')
    var this_div = app_el.querySelector('#' + app_el.id + '_out')
    var app_obj = {}

    these_modes.forEach( (radio) => {
      radio.addEventListener('click', function () {
        var app_type = this.parentElement.parentElement.parentElement.id
        apps[app_type].app_mode = this.id
        app_control[app_type].app_mode = this.id
        app_control[app_type].init_mode(apps[app_type].app_dom, app_type, this.id, this.value)
      })
    })

    this_title.addEventListener( 'click', function () {
      toggle_app(this.id)
      console.log(this.id)
    })

    app_obj = {
      app_type : app_el.id,
      app_mode : these_modes[0].value,
      app_dom : {
        form_field : this_input,
        form_factor : aux_input,
        mode_radios : these_modes,
        go_button : this_go,
        display_div: this_div
      }
    }

    apps[app_el.id] = app_obj
    app_control[app_el.id].app_mode = app_obj.app_mode
    app_control[app_el.id].init_mode(
      apps[app_el.id].app_dom,
      app_el.id,
      these_modes[0].id,
      these_modes[0].value
    )
  })
//}
