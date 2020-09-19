// const Mars = (function (width, height) {

//     var _width = width > 50 ? 50 : width
//     var _height = height > 50 ? 50 : height

//     getWidth = function () {
//         return _width
//     }

//     setWidth = function (width) {
//         return _width = width
//     }


//     return {
//         getWidth,
//         setWidth
//     }
// })();

const Mars = function (width, height) {

    var module = function () { }

    module.prototype.width = width > 50 ? 50 : width
    module.prototype.height > 50 ? 50 : height

    module.prototype.getX = function () {
        return width;
    }

    return {
        getX: module.prototype.getX
    };
}


module.exports = Mars