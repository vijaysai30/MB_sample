window.$ = require('jquery');
require("./js/mobilenav");
require("./js/tabnav");
require("./js/coolscrolla");
require("./js/parallax");

var fl = require("./js/filelist");
//callback because filelist is generated async;
fl(function () {
    require("./js/accordions");
});

const Modal = require("./js/rightsmodal");

// copied from "transporter-training"

require("./js/overlay");

//require("parallax-imagescroll");


// MBAPPS-732
// use vendor script "routie" as hash router to allow
// hash routes: #impressum, #datenschutz, #cookie
// to open modal tabs on URL's with hash a route
const routie = require("./vendors/routie/routie");

Modal.init();

// helper function to open Modal with tab
const openModalTab = function (tab) {
    Modal.open();
    setTimeout(function () {
        switch (tab) {
            case 'datenschutz':
                $("#mbc-modal-navigation").find("a[data-id='Datenschutz']").click();
                break;
            default:
                $("#mbc-modal-navigation").find("a[data-id='Anbieter']").click();
                break;
        }
    }, 500);
}
// define hash routes for routie
routie({
    'cookies': function () {
        setTimeout(function () {
            window.usercentrics.updateConsentInfoModalIsVisible(true);
        }, 700);
    },
    'datenschutz': function () {
        openModalTab('datenschutz')
    },
    'impressum': function () {
        openModalTab('impressum')
    }
});

setTimeout(() => {
    var css = document.createElement('style');
    css.appendChild(document.createTextNode(`.usercentrics-button #uc-banner-modal .uc-banner-wrapper {transform: unset;}`));
    document.getElementsByTagName("body")[0].appendChild(css);
}, 1000);
