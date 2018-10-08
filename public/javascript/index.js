'use strict';

var link = document.getElementById('resetLink');
var signIn = document.getElementById('signIn');
var forgotPassword = document.getElementById('forgotPassword');
var back = document.getElementById('back');
var chooseProject = document.getElementById('chooseProject');

/**
 * onclick for reset password
 */

link.onclick = function () {
    signIn.style.display = 'none';
    forgotPassword.style.display = 'block';
};

/**
 * onclick for back arrow on forgot password page
 */

back.onclick = function () {
    forgotPassword.style.display = 'none';
    signIn.style.display = 'block';
};

/**
 * function for validation
 */
var email = document.getElementById('email');
var emailReg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
var pass = document.getElementById('password');

/**
 * function initiate error messages
 * @param elem
 * @param message
 */

function initError(elem, message) {
    clearErrors(elem);
    var res = document.createElement('p');
    res.className = 'error';
    res.innerHTML = message;
    elem.closest("div").appendChild(res);
}

/**
 * function cleared errore messages
 * @param elem
 */

function clearErrors(elem) {
    var item = elem.closest("div").querySelectorAll('p.error');
    if (item.length !== 0) {
        item[0].remove();
    }
}

/**
 * validation for email input
 */

email.onchange = function emailCheck() {
    if (email.value.match(emailReg)) {
        email.classList.remove("invalid");
        email.classList.add("valid");
        clearErrors(email);
    } else {
        email.classList.remove("valid");
        email.classList.add("invalid");
        initError(email, 'Oops! You entered an invalid email');
    }
};

/**
 * validation for password input
 */

pass.onchange = function checkPass() {
    if (pass.value.length < 8) {
        pass.classList.add("invalid");
        pass.classList.remove("valid");
        initError(pass, ' Passwords must be at least 8 characters');
    } else {
        pass.classList.remove("invalid");
        pass.classList.add("valid");
        clearErrors(pass);
    }
};

/**
 * onclick and validate on submit button function
 * @type {HTMLElement | null}
 */

var submit = document.getElementById('submitLogin');

submit.onclick = function validate() {
    if (email.classList.contains('invalid')) {
        initError(email, 'Oops! You entered an invalid email');
    } else if (pass.classList.contains('invalid')) {
        initError(pass, ' Passwords must be at least 8 characters');
    } else if (email.classList.contains('invalid') && pass.classList.contains('invalid')) {
        initError(email, 'Oops! You entered an invalid email');
        initError(pass, ' Passwords must be at least 8 characters');
    } else if (email.classList.contains('valid') && pass.classList.contains('valid')) {
        signIn.style.display = 'none';
        chooseProject.style.display = 'block';
    } else if (email.value.length === 0 && pass.value.length !== 0) {
        email.classList.add("invalid");
        initError(email, 'Field email is required!');
    } else if (pass.value.length === 0 && email.value.length !== 0) {
        pass.classList.add("invalid");
        initError(pass, 'Field password is required!');
    } else if (email.value.length === 0 && pass.value.length === 0) {
        email.classList.add("invalid");
        pass.classList.add("invalid");
        initError(email, 'Field email is required!');
        initError(pass, 'Field password is required!');
    }
};

/**
 * custom scrollbar
 */

var scrolling = document.getElementById.bind(document),
    container = scrolling('content'),
    content = scrolling('controls'),
    scroll = scrolling('scrollbar');

content.addEventListener('scroll', function (e) {
    scroll.style.height = container.clientHeight * content.clientHeight / content.scrollHeight + "px";
    scroll.style.top = container.clientHeight * content.scrollTop / content.scrollHeight + "px";
});
var event = new Event('scroll');

window.addEventListener('resize', content.dispatchEvent.bind(content, event));
content.dispatchEvent(event);

scroll.addEventListener('mousedown', function (start) {
    start.preventDefault();
    var y = scroll.offsetTop;
    var onMove = function onMove(end) {
        var delta = end.pageY - start.pageY;
        scroll.style.top = Math.min(container.clientHeight - scroll.clientHeight, Math.max(0, y + delta)) + 'px';
        content.scrollTop = content.scrollHeight * scroll.offsetTop / container.clientHeight;
    };
    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseup', function () {
        document.removeEventListener('mousemove', onMove);
    });
});