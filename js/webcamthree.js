/*
webcamthree
https://github.com/chazmatazz/webcamthree
JavaScript library for webcam output. Interfaces with Flash AS3. 
Includes black and white output, useful for tracking fiducials.

Copyright (c) 2011 Charles Dietrich http://www.charlesdietrich.com
Licensed under the MIT License
Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

PRIOR WORK

CamCanvas-API-
https://github.com/taboca/CamCanvas-API-
Copyright (c) 2009 Marcio S Galli, http://www.taboca.com/
Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/
webcamThree = function() {
    var DELAY = 500;
    var flash = null;
    var canvas_container = null;
    var canvas_context = null;
    var image_data =  null;
    var counter = 0;
    var width;
    var height;
    var mode;
    function init( options ) {
        flash_container = options.flash_container;
        canvas_container = options.canvas_container;
        width = options.width;
        height = options.height;
        mode = options.mode;
        canvas_container.style.width = width + "px";
        canvas_container.style.height = height + "px";
        canvas_container.width = width;
        canvas_container.height = height;
        canvas_context = canvas_container.getContext("2d");
        canvas_context.clearRect(0, 0, width, height);
        image_data = canvas_context.getImageData(0, 0, width, height);
    }
    
    function doRGBCapture() {
      flash_container.doRGBCapture();
    }
    function doBWCapture() {
      flash_container.doBWCapture();
    }
    function startCapture() {
        var f = null;
        if(mode == "rgb") {
            f = doRGBCapture;
        } else if (mode == "bw") {
            f = doBWCapture;
        }
        f();
        setInterval(f, DELAY);
    }

    function passRGBLine (stringPixels) {
        var coll = stringPixels.split("-");

        for(var i = 0; i < width; i++) {
            var intVal = parseInt(coll[i]);
            r = (intVal >> 16) & 0xff;
            g = (intVal >> 8) & 0xff;
            b = (intVal ) & 0xff;
            image_data.data[counter + 0] = r;
            image_data.data[counter + 1] = g;
            image_data.data[counter + 2] = b;
            image_data.data[counter + 3] = 255;
            counter += 4;
        }

        if(counter >= width*height*4) {
            counter = 0;
            canvas_context.putImageData(image_data, 0, 0);
            
        }
    }

    function passBWLine (stringPixels) {
        for(var i = 0; i < width; i++) {
            var val = 255 * stringPixels[i];
            image_data.data[counter + 0] = val;
            image_data.data[counter + 1] = val;
            image_data.data[counter + 2] = val;
            image_data.data[counter + 3] = 255;
            counter += 4;
        }

        if(counter >= width*height*4) {
            counter = 0;
            canvas_context.putImageData(image_data, 0, 0);
        }
    }

    function flash_notify(type, msg) {
        alert(msg);
    }

    return {
        init: init,
        startCapture: startCapture,
        passRGBLine: passRGBLine,
        passBWLine: passBWLine,
        flash_notify: flash_notify
    };
}();
