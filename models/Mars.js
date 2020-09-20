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

    module.width = width > 50 ? 50 : width
    module.height > 50 ? 50 : height
    module.offLimits = []

    module.setoffLimits = function (cell) {
        module.offLimits.push(cell)
    }

    module.isOffLimits = function () { }

    return {
        getX: module.getX
    };
}


module.exports = Mars