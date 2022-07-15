class ParallaxContainer {

    constructor(item,id,wrapper) {
        var that = this;
        this.id = id;
        this.wrapper = wrapper;
        this.view = item;
        this.height = item.clientHeight;
        this.width = item.clientWidth;
        this.image = item.children[0];
        this.fulldistance = this.image.clientHeight - this.view.clientHeight;

        this.ismeasured = false;
        var posrect = this.view.getBoundingClientRect();
        this.image.addEventListener("load",function(){
            that.measure(item);
        });
    }

    measure(item){

        this.height = item.clientHeight;
        this.width = item.clientWidth;
        this.image = item.children[0];

        this.fulldistance = this.image.clientHeight - this.view.clientHeight;
        /*
        if(this.fulldistance < 0){
            console.log(this.fulldistance);
            this.view.style.height = this.wrapper.style.height = this.image.clientHeight + "px";
            this.image.style.backgroundColor = "red";
            this.ismeasured = false;

        } else {
            console.log(this.view.clientHeight,this.image.clientHeight);
            this.ismeasured = true;

            this.image.style.backgroundColor = "";
            this.update();
        }*/
        this.ismeasured = true;
        this.update();


    }

    update(){
        if(!this.ismeasured) return;

        var rect = this.view.getBoundingClientRect();
        //if(rect.top > window.innerHeight || rect.bottom < 0) return;

        var fullHeight = rect.height + window.innerHeight;

        var perc = ((fullHeight - rect.bottom) / fullHeight);
        var trans =  -this.fulldistance + Math.floor(this.fulldistance * perc) + "px";
        this.image.style.transform = "translate3d(-50%,"+trans+",0)";
    }
}



class ParallaxManager {
    constructor() {
        this.containers = [];
        this.pageHeight = 0;
        this.screenHeight = 0;
        this.pageY = 0;
        this.createContainers();
        this.initEvents();
        this.measure();
    }


    createContainers() {
        var that = this;
        var heroes = document.getElementsByClassName("hero");

        [].forEach.call(heroes, function (item,index) {
            var pcont = $(item).find(".bannerparallax");
            if(pcont.length != 1) return;

            that.containers.push(new ParallaxContainer(pcont[0],index,item));
        });
    }

    update() {
        this.containers.forEach(function(cont){cont.update()});
    }

    measure(){
        this.containers.forEach(function(cont){cont.measure(cont.view)});
    }

    initEvents() {
        var that = this;
        document.addEventListener("scroll", function (e) {
            if (typeof( window.pageYOffset ) == 'number') {
                that.pageY = window.pageYOffset;
            } else if (document.body && document.body.scrollTop) {
                that.pageY = document.body.scrollTop;
            }

            that.update();
        });

        window.addEventListener("resize", function (e) {
            that.measure();
        });
    }
}

$(document).ready(function () {
    new ParallaxManager();

});


