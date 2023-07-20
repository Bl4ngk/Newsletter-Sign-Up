const template_1 = document.querySelector("#template_1");
const template_2 = document.querySelector("#template_2");
const mainPage = document.querySelector('main');
let input;
let mainForm;
let errorText;
let formSuccess;
let userEmail = '';


document.addEventListener("DOMContentLoaded", function(){
    swapContent(template_1,  'container-signup');
    input = document.querySelector('.form__text');
    mainForm = document.querySelector('.form--main');
    mainForm.addEventListener('submit', mailSubmit);
    input.addEventListener('click', formInputMain);
});


function mailSubmit(event){
    event.preventDefault();
    errorText = document.querySelector('.form__label-right');
    if(validateEmail(input.value)){
        console.log(input.value);
        userEmail = input.value;
        mainForm.removeEventListener('submit', mailSubmit);
        swapContent(template_2, 'container-success', 'container-signup');
        formSuccess = document.querySelector('.form--success');
        document.querySelector('.user-mail').textContent = userEmail;
        formSuccess.addEventListener('submit', mailSuccess);
    }
    else if(mainPage.classList.contains('container-signup')){
        errorText.classList.remove('form__label--error');
        input.classList.add('form__text--error');
    }
}


function mailSuccess(event){
    event.preventDefault();
    swapContent(template_1, 'container-signup', 'container-success');
    //Selecting the elemnts
    mainForm = document.querySelector('.form--main');
    input = document.querySelector('.form__text');
    //Attaching Events listners as previous elment get deleted
    mainForm.addEventListener('submit', mailSubmit);
    input.addEventListener('click', formInputMain);
}


function formInputMain(event){
    if(input.classList.contains('form__text--error')){
        input.classList.remove('form__text--error');
    }
}


//Email Validation
function validateEmail(email) {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
}


//Switching the contenet of the page
function swapContent(pageToShow, classAdd, ...classRemove) {
    let tempShow = pageToShow.content.cloneNode(true);
    let docFrag = document.createDocumentFragment();
    [...tempShow.children].forEach(element =>{
        docFrag.appendChild(element);
    });
    mainPage.innerHTML = '';
    mainPage.append(docFrag);
    Array.isArray(classRemove) ? mainPage.classList.remove(...classRemove) : mainPage.classList.remove(classRemove);
    Array.isArray(classAdd) ? mainPage.classList.add(...classAdd) : mainPage.classList.add(classAdd);
}