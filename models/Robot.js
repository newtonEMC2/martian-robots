import { coordinateVectors, robotTurns } from "../utils/index"

const Robot = function (start, orientation) {
    this.orientation = orientation
    this.vector = coordinateVectors(orientation)
    this.currentPosition = start
    this.isLost = false
}

Robot.prototype.setLost = function () {
    this.isLost = true
}

Robot.prototype.getCurrentStatus = function () {
    return `${this.currentPosition.join(" ")} ${this.orientation} ${this.isLost ? "LOST" : ""}`
}

Robot.prototype.queryNextPosition = function (step) {
    if (step !== "F") return this.currentPosition
    else return [this.currentPosition[0] + this.vector[0], this.currentPosition[1] + this.vector[1]]
}

Robot.prototype.execInstruction = function (step) {
    if (step !== "F") {
        this.orientation = robotTurns(this.orientation, step)
        this.vector = coordinateVectors(this.orientation)
    }
    else this.currentPosition = [this.currentPosition[0] + this.vector[0], this.currentPosition[1] + this.vector[1]]
    return this.currentPosition
}

export default Robot