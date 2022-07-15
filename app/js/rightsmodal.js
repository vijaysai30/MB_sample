var ModalTabs = {
    data:{
        Modal:null,
        links:{},
        contents:{}
    },

    activate:function(isactive,Modal){

        this.data.Modal = Modal;

        this.getLinksAndContent();
    },

    getLinksAndContent:function(){

        $(this.data.Modal.data.innerview).find("a.mbc-meta-link").each(function(i,item){
            if(item.getAttribute("data-active") != "true") {
                item.setAttribute("data-active","false");
            }
            var id = item.getAttribute("data-id");
            ModalTabs.data.links[id] = item;
        });

        $("#mbc-meta-wrapper").find(".mbc-meta-box").each(function(i,item){

            if(item.getAttribute("data-active") != "true") {
                item.setAttribute("data-active","false");
            }
            var id = item.getAttribute("data-id");
            ModalTabs.data.contents[id] = item;

        });

        $(this.data.Modal.data.innerview).on("click","a.mbc-meta-link",function(e){
            e.preventDefault();
            e.stopPropagation();
            var id = this.getAttribute("data-id");

            for(var key in ModalTabs.data.contents){
                var visible = (key == id) ? "true" : "false";
                ModalTabs.data.contents[key].setAttribute("data-active",visible);
                ModalTabs.data.links[key].setAttribute("data-active",visible);

            }
        });
    }
}



var Modal = {
    data: {
        fullview: null,
        innerview: null,
        isOpen: false
    },
    init: function () {
        this.data.fullview = document.getElementById("rights-modal");
        this.data.innerview = document.getElementById("rights-modal-inner");

        $(this.data.innerview).find("a.close").click(function(e){
            e.preventDefault();
            e.stopPropagation();
            Modal.data.fullview.removeEventListener("click", Modal._resp,false);
            Modal.close();

        });

        document.getElementById("openmodalbtn").addEventListener("click", function (e) {
            e.preventDefault();
            Modal.open();
        });

        document.getElementById("openmodalbtn2").addEventListener("click", function (e) {
            e.preventDefault();
            Modal.open();
        });

        var callback_open_modal = function(e){
            e.preventDefault();
            e.stopPropagation();
            Modal.open();
            var classList = e.target.classList;

            setTimeout(function(){
                if(classList.contains("omprivacy")){
                    $("#mbc-modal-navigation").find("a[data-id='Datenschutz']").click();
                }
                if(classList.contains("omrecht")){
                    $("#mbc-modal-navigation").find("a[data-id='Rechtliche-Hinweise']").click();
                }
                if(classList.contains("anbieter")){
                    $("#mbc-modal-navigation").find("a[data-id='Anbieter']").click();
                }
            },300)

        };

        $("footer").on("click",".js-open-modal", function(e) {callback_open_modal(e)} );



        Modal.data.fullview.addEventListener("transitionend",function (e) {
            var src = e.srcElement || e.target;
            if(src.id !="rights-modal") return;
            if (e.propertyName == "visibility") {

                Modal.registerCloseClick(Modal.data.isOpen);
                ModalTabs.activate(Modal.data.isOpen,Modal);
            }
        });

    },

    _resp:function(e) {
        if (!Modal.data.innerview.contains(e.target)) {

            Modal.close();
        }
    },

    registerCloseClick: function (registerbool) {
        if(registerbool){
            Modal.data.fullview.addEventListener("click", Modal._resp,false);
        } else {
            Modal.data.fullview.removeEventListener("click", Modal._resp,false);
        }
    },

    open: function () {
        this.data.isOpen = true;
        this.data.fullview.setAttribute("data-open", "true");
        $("body").css({overflow:"hidden"});
    },

    close: function () {
        this.data.isOpen = false;
        this.data.fullview.setAttribute("data-open", "false");
        $("body").css({overflow:"auto"});
        window.location.hash = "";
    }

};

module.exports = Modal;

$(document).ready(function() {
    Modal.init();
});