// PROPIO DE LA PAGINA
(function ($) {
    "use strict";
    
    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 200) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });
    
    
    // Sticky Navbar
    $(window).scroll(function () {
        if ($(this).scrollTop() > 0) {
            $('.navbar').addClass('nav-sticky');
        } else {
            $('.navbar').removeClass('nav-sticky');
        }
    });
    
    
    // Dropdown on mouse hover
    $(document).ready(function () {
        function toggleNavbarMethod() {
            if ($(window).width() > 992) {
                $('.navbar .dropdown').on('mouseover', function () {
                    $('.dropdown-toggle', this).trigger('click');
                }).on('mouseout', function () {
                    $('.dropdown-toggle', this).trigger('click').blur();
                });
            } else {
                $('.navbar .dropdown').off('mouseover').off('mouseout');
            }
        }
        toggleNavbarMethod();
        $(window).resize(toggleNavbarMethod);
    });

    
    // Main carousel
    $(".carousel .owl-carousel").owlCarousel({
        autoplay: true,
        animateOut: 'fadeOut',
        animateIn: 'fadeIn',
        items: 1,
        smartSpeed: 300,
        dots: false,
        loop: true,
        nav : false
    });
    
    // Modal Video
    $(document).ready(function () {
        var $videoSrc;
        $('.btn-play').click(function () {
            $videoSrc = $(this).data("src");
        });
        console.log($videoSrc);

        $('#videoModal').on('shown.bs.modal', function (e) {
            $("#video").attr('src', $videoSrc + "?autoplay=1&amp;modestbranding=1&amp;showinfo=0");
        })

        $('#videoModal').on('hide.bs.modal', function (e) {
            $("#video").attr('src', $videoSrc);
        })
    });
    
    
    // Date and time picker
    $('#date').datetimepicker({
        format: 'L'
    });
    $('#time').datetimepicker({
        format: 'LT'
    });


    // Testimonials carousel
    $(".testimonials-carousel").owlCarousel({
        center: true,
        autoplay: true,
        dots: true,
        loop: true,
        responsive: {
            0:{
                items:1
            },
            576:{
                items:1
            },
            768:{
                items:2
            },
            992:{
                items:3
            }
        }
    });
    
    
    // Related post carousel
    $(".related-slider").owlCarousel({
        autoplay: true,
        dots: false,
        loop: true,
        nav : true,
        navText : [
            '<i class="fa fa-angle-left" aria-hidden="true"></i>',
            '<i class="fa fa-angle-right" aria-hidden="true"></i>'
        ],
        responsive: {
            0:{
                items:1
            },
            576:{
                items:1
            },
            768:{
                items:2
            }
        }
    });
    
})(jQuery);

// JSON AGREGADO
async function obtenerMenu(){
    const response = await fetch("datos.json")
}

// FUNCIONES DE MENU AGREGADO - Quizas poner todas las funciones y demas dentro del segundo ".then" no es lo mejor
var entrada = 0
var principal = 1
var postre = 2
var bebida = 3

let slideIndex = 0;
let slideIndex2 = 0;
let slideIndex3 = 0;
let slideIndex4 = 0;
fetch('https://run.mocky.io/v3/2ab15c91-c1ca-4ed9-862b-46988b5cb5e2')
.then( res => res.text() )
.then( datos => {
    menu = JSON.parse(datos)

    categoriasMenu = Object.getOwnPropertyNames(menu) // Array con las categorias del menu: "entrada", "principal", "postre", "bebida"
    
    for(opcion in categoriasMenu) {
        var categoriaPlato = categoriasMenu[opcion]
        var numeroPlato = 1 // Contador para poner "1. nombrePlatoRico"
        var itemCategoria = 'item-' + categoriaPlato
        var slideCategoria = 'slide-' + categoriaPlato
        var menuItem = document.getElementById(itemCategoria)
        var slideMenu = document.getElementById(slideCategoria)
        for(plato in menu[categoriaPlato]) {
            insertarPlato(menu[categoriaPlato][plato], numeroPlato)
            insertarFotosMenu(menu[categoriaPlato][plato], numeroPlato)
            numeroPlato = numeroPlato + 1
        }
    }
    mostrarFotosMenu()
    mostrarFotosMenu2()
    mostrarFotosMenu3()
    mostrarFotosMenu4()
    
    function insertarPlato(plato, numero) {
        menuItem.insertAdjacentHTML('beforebegin', `
            <div class="menu-item">
                <div class="menu-img">
                    <img src="img/menu/${categoriaPlato}/${numero}.jpg" alt="Image">
                </div>
                <div class="menu-text">
                    <h3><span>${numero}. ${plato.nombre}</span> <strong>$${plato.precio}</strong></h3>
                    <p>${plato.descripcion}</p>
                </div>
            </div>`)
    }
    
    function insertarFotosMenu(plato, numero) {
        var slideCategoria = 'slide-' + categoriaPlato
        var fotoMenu = 'fotoMenu-' + categoriaPlato
        slideMenu.insertAdjacentHTML('beforeend', `
            <div class="mySlides fade ${fotoMenu} ${slideCategoria}">
                <img src="img/menu/${categoriaPlato}/${numero}.jpg" style="width:100%">
                <div class="text-align-center">${numero}. ${plato.nombre}</div>
            </div>`)
    }
    
    /* arreglar esta parte de los "mostrarFotoMenu - CORECCION PARA SACARLO RAPIDO ANDANDO */
    function mostrarFotosMenu() {        
        let i;
        let slides = document.getElementsByClassName("slide-entrada"); // Aca ver de armar slidesCategoria asi toma slides.length
        let dots = document.getElementsByClassName("fotoMenu-entrada");
        
        for (i = 0; i < slides.length; i++) {
            slides[i].style.display = "none";  
        }
        slideIndex++;
        if (slideIndex > slides.length) {slideIndex = 1}    
        for (i = 0; i < dots.length; i++) {
            dots[i].className = dots[i].className.replace(" active", "");
        }
        slides[slideIndex-1].style.display = "block";  
        dots[slideIndex-1].className += " active";
        setTimeout(mostrarFotosMenu, 2000); // Change image every 2 seconds
    }
    function mostrarFotosMenu2() {
        let i;
        let slides = document.getElementsByClassName("slide-principal"); // Aca ver de armar slidesCategoria asi toma slides.length
        let dots = document.getElementsByClassName("fotoMenu-principal");
        
        for (i = 0; i < slides.length; i++) {
            slides[i].style.display = "none";  
        }
        slideIndex2++;
        if (slideIndex2 > slides.length) {slideIndex2 = 1}    
        for (i = 0; i < dots.length; i++) {
            dots[i].className = dots[i].className.replace(" active", "");
        }
        slides[slideIndex2-1].style.display = "block";  
        dots[slideIndex2-1].className += " active";
        setTimeout(mostrarFotosMenu2, 2000); // Change image every 2 seconds
    }
    function mostrarFotosMenu3() {
        let i;
        let slides = document.getElementsByClassName("slide-postre"); // Aca ver de armar slidesCategoria asi toma slides.length
        let dots = document.getElementsByClassName("fotoMenu-postre");
        
        for (i = 0; i < slides.length; i++) {
            slides[i].style.display = "none";  
        }
        slideIndex3++;
        if (slideIndex3 > slides.length) {slideIndex3 = 1}    
        for (i = 0; i < dots.length; i++) {
            dots[i].className = dots[i].className.replace(" active", "");
        }
        slides[slideIndex3-1].style.display = "block";  
        dots[slideIndex3-1].className += " active";
        setTimeout(mostrarFotosMenu3, 2000); // Change image every 2 seconds
    }
    function mostrarFotosMenu4() {
        let i;
        let slides = document.getElementsByClassName("slide-bebida"); // Aca ver de armar slidesCategoria asi toma slides.length
        let dots = document.getElementsByClassName("fotoMenu-bebida");
        
        for (i = 0; i < slides.length; i++) {
            slides[i].style.display = "none";  
        }
        slideIndex4++;
        if (slideIndex4 > slides.length) {slideIndex4 = 1}    
        for (i = 0; i < dots.length; i++) {
            dots[i].className = dots[i].className.replace(" active", "");
        }
        slides[slideIndex4-1].style.display = "block";  
        dots[slideIndex4-1].className += " active";
        setTimeout(mostrarFotosMenu4, 2000); // Change image every 2 seconds
    }
})