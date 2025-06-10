$(document).ready(()=>{
    $('#menu-mob').click(()=>{
        let menuMob = $('.menu-mobile ul');
        menuMob.fadeToggle();
    })

    $('.menu-desktop li a').hover(function(){
        $('nav ul li').removeClass('active');
        $(this).parent().addClass('active');
    })
})