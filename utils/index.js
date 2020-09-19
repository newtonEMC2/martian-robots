const fs = require('fs');

const readFile = async function (path) {
    try {
        imputData = await fs.readFileSync(path, 'utf8')
        return imputData
    } catch (e) {
        console.log('Error Accessing the imput file:', e.stack)
    }
}

/**
 * 
 * @param {*} imput 
 */
const writeFile = function (path, content) {
    fs.writeFile(path, content, e => {
        if (e) {
            console.error(e)
            return
        }
        console.log("file has been generated")
    })
}

/**
 * 
 * @param {Array} imput 
 */
const dataTransform = function (imput) {
    imput = imput.split(/\r?\n/)
    const data = { instructions: [] }
    data.gridSize = imput.shift().split(" ")
    imput.forEach((chunk, i) => {
        if (i % 2 !== 0) {
            const obj = {}
            obj.start = imput[i - 1].split(" ")
            obj.orientation = obj.start.pop()
            obj.start = obj.start.map(Number)
            obj.steps = chunk.split("")
            data.instructions.push(obj)
        }
    });

    return data
}

/**
 * 
 */
const coordinateVectors = function (orientation) {
    try {
        switch (orientation) {
            case "N":
                return [0, 1]
            case "E":
                return [1, 0]
            case "S":
                return [0, - 1]
            case "W":
                return [-1, 0]
            default:
                throw Error(`${orientation} is not allowed as a cardinal point`)
        }
    } catch (e) {
        throw Error(e)
    }
}

const robotTurns = function (currentOrientation, step) {
    const cardinalPoints = "NESW"
    try {
        let indx = cardinalPoints.indexOf(currentOrientation)
        if (step === "R") indx += 1
        else if (step === "L") indx -= 1
        else throw Error("just R or L allowed")

        if (indx < 0) indx = cardinalPoints.length - 1
        return cardinalPoints[indx % 4]

    } catch (e) {
        throw Error("just R, L, N, S, E, O, allowed")

    }
}


module.exports = { readFile, writeFile, dataTransform, coordinateVectors, robotTurns }