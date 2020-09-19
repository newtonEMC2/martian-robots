const { coordinateVectors, robotTurns } = require("../utils/index")

const Robot = function (start, orientation) {

    var module = function () { }

    module.orientation = orientation
    module.vector = coordinateVectors(orientation)
    module.currentPosition = start

    module.getCurrentStatus = function () {
        return `${module.currentPosition.join(" ")} ${module.orientation}`
    }

    module.execInstruction = function (step) {
        // console.log(module.vector)
        if (step !== "F") {
            module.orientation = robotTurns(module.orientation, step)
            module.vector = coordinateVectors(module.orientation)
        }
        else module.currentPosition = [module.currentPosition[0] + module.vector[0], module.currentPosition[1] + module.vector[1]]
        // console.log(module.currentPosition)

    }





    return {
        getCurrentStatus: module.getCurrentStatus,
        execInstruction: module.execInstruction
    };
}

module.exports = Robot