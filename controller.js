import { throws } from "assert"
import path from "path"
import Mars from "./models/Mars"
import Robot from "./models/Robot"
import { readFile, writeFile, dataTransform } from "./utils"


/**
 * Make robots run in a row
 */
const workOutput = (imputData) => {
    try {
        let mars
        const robots = []
        let output

        /**
         * Transform data into {gridSize:..., instructions: [{{start: Array, steps: Array}...}...]}
         */
        const { instructions, gridSize } = dataTransform(imputData)

        /**
         * Create mars planet
         */
        mars = Mars(gridSize[0], gridSize[1])
        instructions.forEach(({ start, orientation, steps }, i) => {
            const robot = new Robot(start, orientation)
            if (mars.isOffLimit(start)) throw new Error(`robot ${i + 1} never been in the planet`)
            for (let j = 0; j < steps.length; j++) {
                let step = steps[j]
                if (step == 'F') {
                    const nextPosition = robot.queryNextPosition(step) // next position to be for the robot
                    if (mars.checkOffLimitList(nextPosition)) continue; // is going out boundary and already scent, ignore
                    const isOffLimit = mars.isOffLimit(nextPosition) //check if stepped out of boundaries
                    if (!isOffLimit) robot.execInstruction(step) //if in the planet, carry on
                    else {
                        robot.setLost()
                        mars.setoffLimits(nextPosition)
                        break
                    }
                }
                else robot.execInstruction(step)
            }
            robots.push(robot)
        })

        /**
         * Generate content for output file
         */
        output = robots.map(robot => robot.getCurrentStatus().trim() + "\r\n")
        return output.join('')
    } catch (e) {
        throw new Error(e)
    }


}

async function run() {

    try {

        /**
         * Get imput data from imput.txt
         */
        const imputData = await readFile(path.resolve(process.cwd(), 'input.txt'))
        /**
         * gets output as a string
         */
        const output = await workOutput(imputData)

        /**
         * generate file
         */
        writeFile(path.resolve(process.cwd(), 'output.txt'), output)


    } catch (e) {
        throw new Error(e)
    }
}


export { workOutput, run }


