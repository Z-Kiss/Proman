import {htmlFactory, htmlTemplates} from "../view/htmlFactory.js";
import {domManager} from "../view/domManager.js";
import {dataHandler} from "../data/dataHandler.js";

export let userManager = {
    registerButton: function () {
        domManager.addEventListener('#register',
            'click',
            register)
        domManager.addEventListener('#login',
        'click',
        login)
    }

}

 function register() {
    let regBuilder = htmlFactory(htmlTemplates.reg)
        let regForm = regBuilder()
        domManager.addChild('#root',regForm)
        closeButton()
        regButton ()
 }
function closeButton () {
    domManager.addEventListener('#close','click',() => {
      let element = document.querySelector('.reg-container')
        element.remove()
    })
}
function regButton () {
    domManager.addEventListener('#ok','click', (event) => {
        let input = document.querySelectorAll('input')
        dataHandler.registerUser(input)
        let regBox = document.querySelector('.reg-container')
        regBox.remove()
    })
}
function login() {
    let logBuilder = htmlFactory(htmlTemplates.log)
    let logForm = logBuilder()
    domManager.addChild('#root', logForm)
    closeButton()
    logButton()

}
function logButton () {
    domManager.addEventListener('#ok','click', (event) => {
        let input = document.querySelectorAll('input')
        dataHandler.loginUser(input)
        let logBox = document.querySelector('.reg-container')
        logBox.remove()
    })
}