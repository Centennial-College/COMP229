/**
 * FileName: app.js
 * 
 * @author Kevin Ma
 * @date June 5, 2016
 * 
 * Student #: 300867968
 * Website: http://studentweb.cencol.ca/kma45 
 * 
 * @description This file is the main javascript file for the website
 */

/**
 * This immediately invoked function expression (IIFE) contains all the code
 * which will run when the webpage loads the javascript file
 */
(function () {

    /**
     * This event handler smoothly scrolls the window to the target
     * location (target div).
     */
    $('a[href^="#"]').on('click', function (event) {
        // the jquery .on() method attaches one or more event handlers for selected elements and child elements

        event.preventDefault()
        var target = $($(this).attr('href'))
        $('html, body').animate({ scrollTop: target.offset().top }, 750)
    })

    // Code written here only executes for Home Page
    if ($('#home').length) {
        $('.lastmodstat').html('This webpage was last modified on ' + document.lastModified)

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
                
                // Adds the appropiate title to the Modal which pops up
                $('#submitModal h4').html('Registration Failed')
                
                // Appropiate messages are appended to the instructions based on what
                // caused the errors in validating the form
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
            // All inputs are validated in the form
            else {
                // Modal Title
                $('#submitModal h4').html('Registration Recieved')
                
                //Modal Body
                $('#submitModal p').html('Thanks for registering with our website, your customer record was saved successfully.')
                
                // Resets the form after the form is "submitted"
                clearForm()
            }
        })

        // when user clicks 'Clear Form' link, clear all input/select fields, and remove 
        // all feedback indicators (color and icons)
        $('#resetRegForm').click(clearForm)

    }

    // NAMED FUNCTIONS +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

    /**
     * This method removes all success/fail indicators from form fields and 
     * sets all form fields on the webpage to have a null value.
     * 
     * @method clearForm
     * @return {void}
     */
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

    /**
     * This method removes all success indicators from a form field and
     * adds error indicators to its related div and span.
     * 
     * @method isInvalidFormInput 
     * @return {void}
     * @param {HTML div} formDiv 
     * @param {HTML span} formIcon
     */
    function isInvalidFormInput(formDiv, formIcon) {
        $(formDiv).removeClass('has-success')
        $(formDiv).addClass('has-error')
        $(formIcon).removeClass('fa-check')
        $(formIcon).addClass('fa-remove')
    }

    /**
     * This method removes all error indicators from a form field and
     * adds success indicators to its related div and span.
     * 
     * @method isValidFormInput
     * @return {void}
     * @param {HTML div} formDiv
     * @param {HTML span} formIcon
     */
    function isValidFormInput(formDiv, formIcon) {
        $(formDiv).removeClass('has-error')
        $(formDiv).addClass('has-success')
        $(formIcon).removeClass('fa-remove')
        $(formIcon).addClass('fa-check')
    }

    /**
     * This method checks whether a given input field has a
     * value or whether it is null. If the field contains
     * a null value, error indicators are added to the field's
     * related div and span. If there is a non-null value in 
     * the field, success indicators are added to the field's 
     * related div and span.
     * 
     * @method isNull
     * @return {void}
     * @param {HTML input} element
     * @param {HTML div} formDiv
     * @param {HTML span} formIcon
     */
    function isNull(element, formDiv, formIcon) {
        if ($(element).val()) {
            isValidFormInput(formDiv, formIcon)
        }
        else {
            isInvalidFormInput(formDiv, formIcon)
        }
    }

    /**
     * This method checks whether the element has the appropiate
     * format to be a valid email. The proper syntax as a regular 
     * expression is denoted as
     * /^[a-zA-Z0-9\\-]+(\.[\w\\-]+)*@[a-zA-Z0-9]+(\.[a-zA-Z0-9\\-]+)*(\.[a-z]{2,6})$/
     * If the element contains an invalid email format, error
     * indciators are added to the element's related div and span.
     * 
     * @method isValidEmail
     * @return {void}
     * @param {HTML input} element
     */
    function isValidEmail(element) {
        if (!/^[a-zA-Z0-9\\-]+(\.[\w\\-]+)*@[a-zA-Z0-9]+(\.[a-zA-Z0-9\\-]+)*(\.[a-z]{2,6})$/.test($(element).val())) {
            isInvalidFormInput('#' + element.id + 'Div', '#' + element.id + 'Ico')
        }
    }

})()