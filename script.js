const wppBtn = $('#wpp-btn');
const emailBtn = $('#email-btn');
let formWpp = $('#form-wpp');
let formEmail = $('#form-email');
let screenWidth = null;

$(window).resize(function(){ // Aplica a classe hidden no redimensionamento de tela
    formEmail.addClass('hidden');
    formWpp.addClass('hidden');
})

$(document).ready(()=>{
    $('#menu-mob').click(()=>{  // Menu mobile
        let menuMob = $('.menu-mobile ul');
        menuMob.fadeToggle();
    })

    $('.menu-desktop li a').hover(function(){ // Efeito no menu desktop
        $('nav ul li').removeClass('active');
        $(this).parent().addClass('active');
    })

    wppBtn.click(()=>{ // Botão whatsapp
        screenWidth = $(window).width() + 15;
        wppClass(screenWidth);
    })

    emailBtn.click(()=>{ // Botão Email
        screenWidth = $(window).width() + 15;
        emailClass(screenWidth);   
    })

    formEmail.submit(function(){ // Formulário de envio para email
        let emailValido = validateEmailForm();
        if(emailValido){
            return true;
        } else {
            return false;
        }
    })

    formWpp.submit(function(){ // Formulário de envio para whatsapp
        let wppValido = validateWpp();
        if(wppValido){
            enviarWpp();
        } else {
            return false;
        }
    })

    thankPage(); // Adiciona a url para redirecionamento da pagina de agradecimento
})

function wppClass(width){ // Coloca a classe respectiva ao dispositivo
    let input = $('#form-wpp .input');

    formWpp.toggleClass('hidden');
    formWpp.addClass('form-wpp');

    input.next().removeClass();

    if(width >= 1080){
        input.next().addClass('no-focus-desktop');
        input.focus(()=>{
            input.next().removeClass('no-focus-desktop');
            input.next().addClass('focusDesktop');
        })
        input.blur(()=>{
            let val = input.val();
            if(val != 0){
                input.next().fadeOut(1000);
            } else {
                input.next().fadeIn(1000);
                input.next().removeClass('focusDesktop');
                input.next().addClass('no-focus-desktop');
            }
        })
    } 
    if(width >= 768 && width < 1080){
        input.next().addClass('no-focus-tablet');
        input.focus(()=>{
            input.next().removeClass('no-focus-tablet');
            input.next().addClass('focusTablet');
        })
        input.blur(()=>{
            let val = input.val();
            if(val != 0){
                input.next().fadeOut(1000);
            } else {
                input.next().fadeIn(1000);
                input.next().removeClass('focusTablet');
                input.next().addClass('no-focus-tablet');
            }
        })
    } else if(width < 768){
        input.next().addClass('no-focus-mob');
        input.focus(()=>{
            input.next().removeClass('no-focus-mob');
            input.next().addClass('focusMob');
        })
        input.blur(()=>{
            let val = input.val();
            if(val != 0){
                input.next().fadeOut(1000);
            } else {
                input.next().fadeIn(1000);
                input.next().removeClass('focusMob');
                input.next().addClass('no-focus-mob');
            }
            
        })                
    }
    formEmail.addClass('hidden');
}

function emailClass(width){ // Coloca a classe respectiva ao dispositivo
    let input = $('#form-email .input');

    formEmail.toggleClass('hidden');
    formEmail.addClass('form-email');

    input.next().removeClass();

    if(width >= 1080){
        input.next().addClass('no-focus-desktop');
        input.each(function(){
            $(this).focus(()=>{
                $(this).next().removeClass('no-focus-desktop');
                $(this).next().addClass('focusDesktop');
            })
            $(this).blur(()=>{
                let val = $(this).val();
                if(val != 0){
                    $(this).next().fadeOut(1000);
                } else {
                    $(this).next().fadeIn(1000);
                    $(this).next().removeClass('focusDesktop');
                    $(this).next().addClass('no-focus-desktop');
                }
            })
        })
    }
    if(width >= 768 && width < 1080){
        input.next().addClass('no-focus-tablet');
        input.each(function(){
            $(this).focus(()=>{
                $(this).next().removeClass('no-focus-tablet');
                $(this).next().addClass('focusTablet');
            })
            $(this).blur(()=>{
                let val = $(this).val();
                if(val != 0){
                    $(this).next().fadeOut(1000);
                } else {
                    $(this).next().fadeIn(1000);
                    $(this).next().removeClass('focusTablet');
                    $(this).next().addClass('no-focus-tablet');
                }
            })
        })
    } else if(width < 768){
        input.next().addClass('no-focus-mob');
        input.each(function(){
            $(this).focus(()=>{
                $(this).next().removeClass('no-focus-mob');
                $(this).next().addClass('focusMob');
            })
            $(this).blur(()=>{
                let val = $(this).val();
                if(val != 0){
                    $(this).next().fadeOut(1000);
                } else {
                    $(this).next().fadeIn(1000);
                    $(this).next().removeClass('focusMob');
                    $(this).next().addClass('no-focus-mob');
                }
            })
        })
    }
    formWpp.addClass('hidden');
}

function validateWpp(){ // Verificação do formulário de whatsapp
    const nomeWpp = $('#nomeWpp');
    const txtWpp = $('#txtWpp');

    if(validateNome(nomeWpp.val())){
        nomeWpp.css('border-bottom', '1px solid #45A29E');
        nomeWpp.next('p').css('color', '#45A29E');
    }

    if(validateTxt(txtWpp.val())){
        txtWpp.css('border', '1px solid #45A29E');
        txtWpp.removeClass('err-msg');
    }

    if(validateNome(nomeWpp.val()) && validateTxt(txtWpp.val())){
        return true;
    }
    
    else {
        if(nomeWpp.val() == 0){
            nomeWpp.css('border-bottom', '1px solid red');
            nomeWpp.next('p').css('color', 'red');
        }
        if(txtWpp.val() == 0){
            txtWpp.css('border', '1px solid red');
            txtWpp.addClass('err-msg');
        }
        if(validateNome(nomeWpp.val()) == false){
            nomeWpp.css('border-bottom', '1px solid red');
            nomeWpp.next('p').css('color', 'red');
        }
        if(validateTxt(txtWpp.val()) == false){
            txtWpp.css('border', '1px solid red');
            txtWpp.addClass('err-msg');
        }

        return false;
    }
}

function validateEmailForm(){ // Verificação do formulário de email
    const nomeEmail = $('#nomeEmail');
    const email = $('#email');
    const txtEmail = $('#txtEmail');

    if(validateNome(nomeEmail.val())){
        nomeEmail.css('border-bottom', '1px solid #45A29E');
        nomeEmail.next('p').css('color', '#45A29E');
    }

    if(validateTxt(txtEmail.val())){
        txtEmail.css('border', '1px solid #45A29E');
        txtEmail.removeClass('err-msg');
    }

    if(validateEmail(email.val())){
        email.css('border-bottom', '1px solid #45A29E');
        email.next('p').css('color', '#45A29E');
    }

    if(validateNome(nomeEmail.val()) && validateTxt(txtEmail.val()) && validateEmail(email.val())){
        return true;
    }
    
    else {
        if(nomeEmail.val() == 0){
            nomeEmail.css('border-bottom', '1px solid red');
            nomeEmail.next('p').css('color', 'red');
        }
        if(email.val() == 0){
            email.css('border-bottom', '1px solid red');
            email.next('p').css('color', 'red');
        }
        if(txtEmail.val() == 0){
            txtEmail.css('border', '1px solid red');
            txtEmail.addClass('err-msg');
        }

        if(validateNome(nomeEmail.val()) == false){
            nomeEmail.css('border-bottom', '1px solid red');
            nomeEmail.next('p').css('color', 'red');
        }
        if(validateEmail(email.val()) == false){
            email.css('border-bottom', '1px solid red');
            email.next('p').css('color', 'red');
        }
        if(validateTxt(txtEmail.val()) == false){
            txtEmail.css('border', '1px solid red');
            txtEmail.addClass('err-msg');
        }

        return false;
    }
}

function validateNome(value){ // Verifica se o nome é válido
    const regexNome = /^[a-zA-Z\u00C0-\u00FF]+?\s?[a-zA-Z\u00C0-\u00FF]+$/g;
    if(regexNome.test(value)){
        return true;
    } else {
        return false;
    }
}

function validateTxt(value){ // Verifica a mensagem se é válida
    const regexTxt = /^[a-zA-Z0-9\u00C0-\u00FF\s_,\-\.]+$/g;
    if(regexTxt.test(value)){
        return true;
    } else {
        return false;
    }
}

function validateEmail(value){ // Verifica se o email é válido
    const regexEmail = /^[a-z0-9]+[@][a-z.]+$/g;
    const emailFormatado = value.toLowerCase();
    if(regexEmail.test(emailFormatado)){
        return true;
    } else {
        return false;
    }
}

function enviarWpp(){ // Envia para a página do whatsapp
    const nome = $('#nomeWpp').val();
    const texto = $('#txtWpp').val();

    const formatar = `Olá, me chamo ${nome}. ${texto}`;
    const formatado = encodeURIComponent(formatar);
    const url = 'https://wa.me/5519986108408?text=' + formatado;
    window.open(url, '_blank');
}

function thankPage(){ // Redireciona para a página de agradecimento
    const url = document.location.origin;
    const pageInp = $('#form-email [name="_next"]');
    let urlThanks = null;

    if(url == 'http://127.0.0.1:5500' || url == 'http://localhost:5500'){
        urlThanks = url + '/obrigado.html'
    } else {
        urlThanks = url + '/Portfolio/obrigado.html'
    }
    
    pageInp.attr('value', `${urlThanks}`);
}