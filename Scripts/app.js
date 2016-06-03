/**
 * This is the main JavaScript file.
 * Developed by: Kevin Ma
 * Student #: 300867968
 * Date Created: June 2, 2016
 * Last Modified: June 3, 2016
 */

(function () {

    // Code written in this section only executes on the home page
    if ($('#home')) {
        // the jquery .on() method attaches one or more event handlers for selected elements and child elements
        $('a[href^="#"]').on('click', function (event) {
            event.preventDefault()
            var target = $($(this).attr('href'));
            $('html, body').animate({ scrollTop: target.offset().top }, 750)
        })
    }

    // Code written here only executes for Assignment 2 
    if ($('#registrationForm')) {
        
    }

    // NAMED FUNCTIONS +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    function isNull(element) {
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

})()