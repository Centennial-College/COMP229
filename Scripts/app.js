// main JavaScript file
// Developed by: Kevin Ma
// Student #: 300867968
// Last Modified: May 24, 2016

(function () {

    // hides error divs on startup of page
    $(window).load(function () {
        $('.errormsg').hide();
        $('.lastmodstat').html('This webpage was last modified on ' + document.lastModified);
        $('#sentmsg').html('Your message has been sent.')
    });

    // the jquery .on() method attaches one or more event handlers for selected elements and child elements
    $('a[href^="#"]').on('click', function (event) {

        var target = $($(this).attr('href'));

        $('html, body').animate({ scrollTop: target.offset().top }, 750)
        event.preventDefault();

    });

    // binds the scroll event to event handler
    $(window).scroll(function () {
        // scrollTop returns current element vertical position of the scroll bar
        var currentScroll = $(this).scrollTop();

        // offset gives obj of a targets position relative to the document [left, top]
        var homeTop = $('#home').offset().top;
        var aboutTop = $('#aboutMe').offset().top;
        var contactTop = $('#contactMe').offset().top;
        var projectTop = $('#projects').offset().top;

        // resets all nav bar 
        $(".current").removeClass('current');

        // 4 sections, 4 ranges
        if (currentScroll >= homeTop && currentScroll < aboutTop - 100) {
            $('.navbar-collapse #homenav').addClass('current');
            // need to blur the navbar anchors because bootstrap had a bug with my code, always focused the a without unfocusing
            $('.navbar-collapse #homenav').blur();
        } else if (currentScroll >= aboutTop - 100 && currentScroll < contactTop - 100) {
            $('.navbar-collapse #aboutnav').addClass('current');
            $('.navbar-collapse #aboutnav').blur();
        } else if (currentScroll >= contactTop - 100 && currentScroll < projectTop - 100) {
            $('.navbar-collapse #contactnav').addClass('current');
            $('.navbar-collapse #contactnav').blur();
        } else {
            $('.navbar-collapse #projectnav').addClass('current');
            $('.navbar-collapse #projectnav').blur();
        }
    });

    var isValidForm = true;

    // check for NULL entries
    // .on() allows binding of multiple events to one function
    $('#contactname').on('keyup focus change keypress', function () {
        isNull($('#contactname'), $('#errname'), 'Please enter your name.')
        $('#sentmsg').hide();
    })
    $('#contactemail').on('keyup focus change keypress', function () {
        isNull($('#contactemail'), $('#erremail'), 'Please enter your email.')
        isValidEmail()
        $('#sentmsg').hide();
    })
    $('#contactsubject').on('keyup focus change keypress', function () {
        isNull($('#contactsubject'), $('#errsubject'), 'Please enter a subject.')
        $('#sentmsg').hide();
    })
    $('#message').on('keyup focus change keypress', function () {
        isNull($('#message'), $('#errmsg'), 'Please write a message.')
        $('#sentmsg').hide();
    })

    function isNull(element, errdiv, errmsg) {
        if ($(element).val()) {
            $(errdiv).hide();
            isValidForm = true;
        }
        else {
            $(errdiv).html(errmsg)
            $(errdiv).show();
            isValidForm = false;
        }
    };

    function isValidEmail() {
        var email = $('#contactemail').val();
        var regexPattern = /^[a-zA-Z0-9\\-]+(\.[\w\\-]+)*@[a-zA-Z0-9]+(\.[a-zA-Z0-9\\-]+)*(\.[a-z]{2,6})$/;
        if (email) {
            if (!regexPattern.test(email)) {
                $('#erremail').html('Email addreses must follow the proper format.<br>(jdoe53@gmail.com)')
                $('#erremail').show()
                isValidForm = false;
            } else {
                isValidForm = true;
                $('#erremail').hide();
            }
        } else {
            isValidForm = false;
        }
    }

    $('#submitbtn').click(function (e) {
        e.preventDefault();

        isValidEmail();
        if (isValidForm) {
            $('#contactForm').submit();
            $('#contactForm').trigger('reset');

            isValidForm = false;

            $('#sentmsg').show();
        }
    });

    $('#resetbtn').click(function (e) {
        $('.errormsg').hide()
    })
})();