/**
 * FileName: app.js
 * 
 * @author Kevin Ma
 * @date June 3, 2016
 * 
 * Student #: 300867968
 * Website: 
 * 
 * @description This file is the main javascript file for the website
 */

(function () {

    // the jquery .on() method attaches one or more event handlers for selected elements and child elements
    $('a[href^="#"]').on('click', function (event) {
        event.preventDefault()
        var target = $($(this).attr('href'))
        $('html, body').animate({ scrollTop: target.offset().top }, 750)
    })

    // Code written here only executes for Home Page
    if ($('#home').length) {
        $('.lastmodstat').html('This webpage was last modified on ' + document.lastModified);

    }

    // Code written here only executes for Assignment 2 
    if ($('#registrationForm').length) {

        // Initially sets the selected index of the provinces to 0, upon document load complete
        clearForm()

        // All the fields are mandatory (cannot be left blank)
        $('input').on('keyup focus change keypress', function () {
            isNull('#' + this.id, '#' + this.id + 'Div', '#' + this.id + 'Ico')
        })
        // Province is one of AB, ON, QC, BC, NS, NB
        $('select').on('keyup focus change keypress', function () {
            isNull('#' + this.id, '#' + this.id + 'Div', '#' + this.id + 'Ico')
        })

        /**
         * Postal Code 
         *  -has to be 6 characters long
         *  -has to be in the format A0A0A0
         */
        $('#postcode').on('keyup focus change keypress', function () {
            if (!/^[a-zA-Z]\d[a-zA-Z]\d[a-zA-Z]\d$/.test($(this).val())) {
                isInvalidFormInput('#' + this.id + 'Div', '#' + this.id + 'Ico')
            }
        })

        // Age has to be at least 19 yrs. old
        $('#age').on('keyup focus change keypress', function () {
            if ($(this).val() < 19)
                isInvalidFormInput('#' + this.id + 'Div', '#' + this.id + 'Ico')
        })

        // The Email field must contain the @ and . characters
        $('#email').on('keyup focus change keypress', function () {
            isValidEmail(this)
        })

        // Passwords must have at least 6 characters and must contain at least one digit character.
        $('#passwrd').on('keyup focus change keypress', function () {
            if (!/^(?=.*\d).{6,}$/.test($(this).val())) {
                isInvalidFormInput('#' + this.id + 'Div', '#' + this.id + 'Ico')
                console.log('wrong pwd format')
            }
        })

        // The Confirm Password and Password fields should have identical input.
        $('#confirmpass').on('keyup focus change keypress', function () {
            if ($(this).val() != $('#passwrd').val())
                isInvalidFormInput('#' + this.id + 'Div', '#' + this.id + 'Ico')
        })

        $('#registrationForm').submit(function (event) {
            event.preventDefault()
            // if all the inputs are not validated, the form will not successfully submit
            if ($('.has-success').length != 10) {
                var tempStr = 'Fix the following errors and submit again!<br><br><li>Please fill out all fields.</li>'
                $('#submitModal h4').html('Registration Failed')
                if ($('#postcodeDiv').hasClass('has-error')) {
                    tempStr += '<li>The postal code must be 6 characters long and in a0a0a0 format.</li>'
                }
                if ($('#ageDiv').hasClass('has-error')) {
                    tempStr += '<li>The age must be at least 19 yrs old.</li>'
                }
                if ($('#passwrdDiv').hasClass('has-error')) {
                    tempStr += '<li>The password must be at least 6 characters and contain at least one digit.</li>'
                }
                if ($('#confirmpassDiv').hasClass('has-error')) {
                    tempStr += '<li>The confirm password and password fields must have identical input.</li>'
                }
                if ($('#emailDiv').hasClass('has-error')) {
                    tempStr += '<li>The email field must be in the format jdoe@gmail.com<br>(contain the @ and . characters).</li>'
                }
                $('#submitModal p').html(tempStr)
            }
            else {
                $('#submitModal h4').html('Registration Recieved')
                $('#submitModal p').html('Thanks for registering with our website, your customer record was saved successfully.')
                clearForm()
            }
        })

        // when user clicks 'Clear Form' link, clear all input/select fields, and remove 
        // all feedback indicators (color and icons)
        $('#resetRegForm').click(clearForm)

    }

    // NAMED FUNCTIONS +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    function clearForm() {
        $('input').each(function () {
            $(this).val('')
            $('#' + this.id + 'Div').removeClass('has-error has-success')
            $('#' + this.id + 'Ico').removeClass('fa-remove fa-check')
        })
        $('select').each(function () {
            $(this).val('')
            $('#' + this.id + 'Div').removeClass('has-error has-success')
            $('#' + this.id + 'Ico').removeClass('fa-remove fa-check')
        })
    }

    function isInvalidFormInput(formDiv, formIcon) {
        $(formDiv).removeClass('has-success')
        $(formDiv).addClass('has-error')
        $(formIcon).removeClass('fa-check')
        $(formIcon).addClass('fa-remove')
    }

    function isValidFormInput(formDiv, formIcon) {
        $(formDiv).removeClass('has-error')
        $(formDiv).addClass('has-success')
        $(formIcon).removeClass('fa-remove')
        $(formIcon).addClass('fa-check')
    }

    function isNull(element, formDiv, formIcon) {
        if ($(element).val()) {
            isValidFormInput(formDiv, formIcon)
        }
        else {
            isInvalidFormInput(formDiv, formIcon)
        }
    }

    function isValidEmail(element) {
        if (!/^[a-zA-Z0-9\\-]+(\.[\w\\-]+)*@[a-zA-Z0-9]+(\.[a-zA-Z0-9\\-]+)*(\.[a-z]{2,6})$/.test($(element).val())) {
            isInvalidFormInput('#' + element.id + 'Div', '#' + element.id + 'Ico')
        }
    }

})()