jQuery( document ).ready( function( $ ) {

    var popup = {

        'elems':            {
            "rootEl":           null,   //  Popup main object.
            "closeEls":         null,   //  Close buttons.
            "openEls":          null,   //  Open buttons.
            "formEl":           null,   //  Form.
            "inputTextEl":      null,   //  Form input text search.
            "submitBtnEl":      null,   //  Main submit.
            "resultsEl":        null    //  Results div.
        },
        'isLocked':         false,

        /**
         * Initializes querying elements.
         *
         * @return void
         */
        initSelectors:              function() {

            popup.elems = {
                "rootEl":       $( '#tmc_bs_root' ),
                "closeEls":     $( '#tmc_bs_close' ),
                "openEls":      $( '[data-tmc_bs_open]' ),
                "formEl":       $( '#tmc_bs_form' ),
                "inputTextEl":  $( '#tmc_bs_input_text' ),
                "submitBtnEl":  $( '#tmc_bs_submit_button' ),
                "resultsEl":    $( '#tmc_bs_results' )
            }

        },

        /**
         * Initializes whole mechanism.
         *
         * @return void
         */
        initMethods:               function() {

            if( ! popup.elems.rootEl ){
                console.log( 'Search Popup TMC could not initialize elements.' );
                return;
            }

            popup.elems.openEls.click( function(event ) {
                event.preventDefault();
                popup.activatePopup();
            } );

            popup.elems.closeEls.click( function(event ) {
                event.preventDefault();
                popup.deactivatePopup();
            } );

            popup.elems.formEl.submit( function( event ) {
                event.preventDefault();

                if( ! popup.isLocked ){
                    popup.sendForm();
                }

            } );

            $( document ).keyup( function( event ) {

                if( event.keyCode === 27 && popup.elems.rootEl.hasClass( 'is-active' ) ){

                    popup.deactivatePopup();

                }

            } );

        },

        /**
         * @return void
         */
        activatePopup:      function() {

            popup.elems.rootEl.addClass( 'is-active' );
            $( 'body' ).addClass( 'noscroll' );

            setTimeout( function(){
                popup.elems.inputTextEl.focus();
            }, 500 );

        },

        /**
         * @return void
         */
        deactivatePopup:    function() {

            popup.elems.rootEl.removeClass( 'is-active' );
            $( 'body' ).removeClass( 'noscroll' );

        },

        /**
         * @return void
         */
        sendForm:           function() {

            popup.isLocked = true;

            popup.elems.resultsEl.empty();   //  Clear results.

            //  Save button value to variable.

            var buttonDefVal = popup.elems.submitBtnEl.val();

            popup.elems.submitBtnEl.prop( 'disabled', true ).val( popup.elems.submitBtnEl.attr( 'data-loadingText' ) );
            popup.elems.rootEl.removeClass( 'has-results' );

            //  Send Google analytics action

            if( typeof ga === 'function' ){ //  Is it loaded?
                ga( 'send', 'pageview', '?s=' + popup.elems.inputTextEl.val() );
            }

            //  Make request.

            var data = popup.elems.formEl.serializeArray(); //  Serialize form data as array and pass it to ajax query.

            setTimeout( function() {
                $.post( popup.elems.formEl.attr( 'action' ), data )
                    .done( function( result ) {

                        popup.elems.resultsEl.html( result );

                        popup.elems.rootEl.addClass( 'has-results' );

                    } )
                    .fail( function( result ) {

                        popup.elems.resultsEl.empty();

                    } )
                    .always( function( result ) {

                        popup.elems.submitBtnEl.prop( 'disabled', false ).val( buttonDefVal );

                        popup.isLocked = false;

                    } );
            }, 100 );

        }

    };

    popup.initSelectors();
    popup.initMethods();

} );