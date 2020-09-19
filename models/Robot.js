const { coordinateVectors, robotTurns } = require("../utils/index")

const Robot = function (start, orientation) {
    this.orientation = orientation
    this.vector = coordinateVectors(orientation)
    this.currentPosition = start
}

Robot.prototype.getCurrentStatus = function () {
    return `${this.currentPosition.join(" ")} ${this.orientation}`
}

Robot.prototype.execInstruction = function (step) {
    // console.log(module.vector)
    if (step !== "F") {
        this.orientation = robotTurns(this.orientation, step)
        this.vector = coordinateVectors(this.orientation)
    }
    else this.currentPosition = [this.currentPosition[0] + this.vector[0], this.currentPosition[1] + this.vector[1]]
    // console.log(module.currentPosition)
}

module.exports = Robot