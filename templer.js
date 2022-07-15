var fs = require("fs");
var path = require("path");


var Templer = function () {

    this.basedir = null;
    this.indexfile = null;
    this.outpath = null;

    this.getArgs = function(){

        for (var i = 2; i < process.argv.length; i++) {
            var val = process.argv[i];
            if (val == "--directory") {
                this.basedir = process.argv[i + 1];
                ++i;
            }

            if (val == "--indexfile") {
                this.indexfile = process.argv[i + 1];
                ++i;
            }

            if (val == "--out") {
                this.outpath = process.argv[i + 1];
                ++i;
            }
        }

        if(this.basedir == null || this.indexfile == null || this.outpath == null){
            console.error("Please specify --indexfile indexfile and --directory path and --out path");
            return false;
        } else {
            console.log(`WILL RUN TEMPLER for ${this.indexfile} IN ${this.basedir}`);
            return true;
        }
    };

    this.scan = function(fullpath){

        var filecontent = fs.readFileSync(fullpath,'utf-8');
        var that = this;
        var out = filecontent.replace(/%\+(.*)%/g,function(m,key){
            var underpath = path.resolve(__dirname) + that.basedir + "/" + key;

            var loaded = (that.scan.bind(that))( underpath );


            var startdoc = "<!----------/// " + key + "///------------>\n";

            return startdoc + loaded;
        });

        return out;

    }

    this.init = function () {
        console.log("===== ! TEMPLER START! =====");
        var hasargs = this.getArgs();
        if(!hasargs) return;

        var filepath = this.basedir  + this.indexfile;
        var fullpath = path.resolve(__dirname) + filepath;

        var out = this.scan(fullpath);

        fs.writeFileSync(path.resolve(__dirname) + "/" + this.outpath,out);


        console.log("===== ! TEMPLER END! =====");

    };
}

var T = new Templer();
T.init();

