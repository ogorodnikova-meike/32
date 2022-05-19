jQuery( document ).ready( function( $ ) {

    var popup = {

        'elems':            {
            "rootEl":           null,   //  Popup main object.
            "closeEls":         null,   //  Close buttons.
            "openEls":          null,   //  Open buttons.
            "formEl":           null,   //  Form.
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
                "rootEl":       $( '#tmc_mp_root' ),
                "closeEls":     $( '[data-tmc_mp_close]' ),
                "openEls":      $( '[data-tmc_mp_open]' )
            }

        },

        /**
         * Initializes whole mechanism.
         *
         * @return void
         */
        initMethods:               function() {

            if( ! popup.elems.rootEl ){
                console.log( 'Menu Popup TMC could not initialize elements.' );
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

        },

        /**
         * @return void
         */
        deactivatePopup:    function() {

            popup.elems.rootEl.removeClass( 'is-active' );
            $( 'body' ).removeClass( 'noscroll' );

        }

    };

    popup.initSelectors();
    popup.initMethods();

} );