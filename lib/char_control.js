'use strict'

var app_control = {
/* 1 */
  'code_to_char' : {

    app_mode : 'tester',

    codetest : function (num_str) {
      var result = '(not set)'
      if (Number(num_str)) {
        result = String.fromCharCode(num_str)
      }
      return result
    },

    decoder : function (num_str) {
      var code_arr = []
      var result = ''
      if (num_str.indexOf(' ') > 0) {
        code_arr = num_str.split(' ');
        code_arr.forEach ( (e) => {
          result +=  this.codetest(e)
        })
      } else {
        num_str = num_str.replace(/\s/g,'')
        result = this.codetest(num_str)
      }
      return result
    },

    randomizer : function (num_str) {
      var new_code = 0
      var code_str = ''
      for (let i = 0; i < Number(num_str); i++) {
        new_code = Math.ceil(Math.random() * 100000)
        code_str += new_code.toString()
        code_str += (i === Number(num_str)-1) ? '' : ' '
      }
      return {
        codes : code_str,
        chars : this.decoder(code_str)
      }
    },

    init_mode : function ( dom_obj, app_type, mode_str, mode_type) {
      var this_app = this
      console.log('init mode: ' + mode_type)
      this_app.app_mode = mode_type
      switch (mode_type) {

        case 'tester' :
          dom_obj.form_factor.style.opacity = 0
          dom_obj.go_button.addEventListener('click', function () {
            var value = this_app[mode_str](dom_obj.form_field.value)
            dom_obj.display_div.innerHTML = value
          })
          dom_obj.form_field.addEventListener('keypress', function () {
            if (event.keyCode === 13) {
              dom_obj.go_button.click()
            }
          })
          break
        case 'composer' :
          dom_obj.form_factor.style.opacity = 0
          dom_obj.form_field.addEventListener( 'keyup', function () {
            var value
            if (this_app.app_mode === 'composer') {
              value = this_app[mode_str](this.value)
              dom_obj.display_div.innerHTML = value
            }
          })
          break
        case 'randomizer' :
          dom_obj.form_factor.style.opacity = 1
          dom_obj.form_factor.addEventListener('change', function () {
            var random_obj = this_app[mode_str](dom_obj.form_factor.value)
            dom_obj.form_field.value = random_obj.codes
            dom_obj.display_div.innerHTML = random_obj.chars
          })
          break
        default :
          console.log('app mode init error')
      }
    }

  },
/* 2 */
  'char_to_code' : {

    app_mode : 'tester',

    chartest : function (str) {
      var result = '(not found)'
      result = str.charCodeAt(0)
      return result
    },

    encoder : function (str) {
      var char_arr = []
      var result = ''
      char_arr = str.split('')
      for (let i = 0; i < char_arr.length; i++) {
        result += this.chartest(char_arr[i]).toString()
        result += (i === char_arr.length-1) ? '' : ' . '
      }
      return result
    },

    uploader : function () {
    },

    init_mode : function ( dom_obj, app_type, mode_str, mode_type) {
      var this_app = this
      console.log('init mode: ' + mode_type)
      this_app.app_mode = mode_type
      switch (mode_type) {

        case 'tester' :
        dom_obj.form_factor.style.opacity = 0
          dom_obj.go_button.addEventListener('click', function () {
            var value = this_app[mode_str](dom_obj.form_field.value)
            dom_obj.display_div.innerHTML = value
          })
          dom_obj.form_field.addEventListener('keypress', function () {
            if (event.keyCode === 13) {
              dom_obj.go_button.click()
            }
          })
        break
        case 'composer' :
        dom_obj.form_factor.style.opacity = 0
          dom_obj.form_field.addEventListener( 'keyup', function () {
            if (this_app.app_mode === 'composer') {
              var value = this_app[mode_str](this.value)
              dom_obj.display_div.innerHTML = value
            }
          })
          break
        case 'uploader' :
          dom_obj.form_factor.style.opacity = 1
          break
        default :
          console.log('app mode init error')
      }
    }
  }
}
