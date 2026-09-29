function goTranslate(id_elemento) {
    var arquivoAtual = window.location.pathname.substring(window.location.pathname.lastIndexOf('/') + 1).toLocaleLowerCase();
    if (arquivoAtual == "index.html" || arquivoAtual == "index.aspx" || arquivoAtual == "" || arquivoAtual == "home") {
        var menuMobile = document.getElementById('navbarToggleExternalContent');
        if (menuMobile) {
            var fecharMenu = function () {
                if (window.bootstrap && window.bootstrap.Collapse) {
                    window.bootstrap.Collapse.getOrCreateInstance(menuMobile).hide();
                } else {
                    menuMobile.classList.remove('show');
                    var botaoMenu = document.querySelector('.site-header-mobile .navbar-toggler');
                    if (botaoMenu) {
                        botaoMenu.classList.add('collapsed');
                        botaoMenu.setAttribute('aria-expanded', 'false');
                    }
                }
            };

            if (menuMobile.classList.contains('collapsing')) {
                menuMobile.addEventListener('shown.bs.collapse', fecharMenu, { once: true });
            } else if (menuMobile.classList.contains('show')) {
                fecharMenu();
            }
        }
        goToAnchor(id_elemento);
        $(".menu-mobile-button.aberto").click();
    }
    else {
        Cookies.set('anchor', id_elemento);
        if (location.href.indexOf(".aspx") >= 0) {
            window.location.href = location.href.replace(location.href.substring(location.href.lastIndexOf("/"), location.href.length), "") + "/index.aspx";
        }
        else if (location.href.indexOf(".html") >= 0) {
            window.location.href = location.href.replace(location.href.substring(location.href.lastIndexOf("/"), location.href.length), "") + "/index.html";
        }
        else {
            window.location.href = location.href.replace(location.href.substring(location.href.lastIndexOf("/"), location.href.length), "") + "/";
        }
    }
}

function goToAnchor(id_elemento) {
    var alvo = $(id_elemento);
    if (!alvo.length) return;

    var cabecalho = window.matchMedia('(max-width: 1199px)').matches
        ? $('.site-header-mobile > .container-fluid').outerHeight()
        : $('.site-header-desktop').outerHeight();
    var posicao = Math.max(0, alvo.offset().top - (cabecalho || 0) - 12);
    $('html,body').stop(true).animate({ scrollTop: posicao }, 'slow');
}
$(function () {
    // MENU DESKTOP
    $('.nav-item.dropdown').each(function () {
        $(this).hover(() => { $(this).find('> .dropdown-menu').show() })
        $(this).mouseleave(() => { $(this).find('> .dropdown-menu').hide() })
    });

    // MENU MOBILE
    $('#nbm-03 .nbm-03-menu').click(() => {
        $('.nav-side').toggleClass('open');
        $('.nbm-03-menu i').toggleClass('fa-bars fa-arrow-right');
        $('.nbm-03-menu').toggleClass('open');
    });
    /*$('.nav-side .nav-link').each(function () {
        $(this).click(function () {
            $(this).next('.submenu').toggle();
            $(this).toggleClass('active');
        });
    });*/
	$(".navbar-menu .nav-item").click(function(){
		$(this).find(".submenu").slideToggle();
	});
    $('#nbm-03 .nbm-03-options').click(() => {
        $('.nbm-03-options').toggleClass('open');
        $('.nbm-03-nav-options').toggleClass('open');
    })

    $('#nbm-02 .search-dropdown i').click(() => {
        window.location.href = 'Pesquisa.aspx?pesquisa=' + $('#nbm-02 .search-dropdown input').val();
    })

    $('#nbm-02 .search-dropdown input').keydown((e) => {
        if (e.keyCode == 13) {
            window.location.href = 'Pesquisa.aspx?pesquisa=' + $('#nbm-02 .search-dropdown input').val();
        }
    })

    $(window).scroll(function () {
        if (window.scrollY >= $('#nm-01').height() + 20) {
            if ($('#form-layer').length > 0) {
                $('#nm-01').css('margin-bottom', $('#nbm-02').height() + 'px')
            } else {
                $('#nm-01').css('margin-bottom', $('#nbm-02').height() + 24 + 'px')
            }
            $('#nbm-02').css('position', 'fixed')
        } else {
            $('#nm-01').css('margin-bottom', '0px')
            $('#nbm-02').css('position', 'relative')
        }
    })

})
