const path = require("path")
const Mars = require("./models/Mars")
const Robot = require("./models/Robot")
const { readFile, writeFile, dataTransform } = require("./utils")

async function run() {
    const robots = []
    let output = ""
    let mars
    try {

        /**
         * Get imput data from imput.txt
         */
        const imputData = await readFile(path.resolve(process.cwd(), 'input.txt'))

        /**
         * Transform data into {gridSize:..., instructions: [{{start: Array, steps: Array}...}...]}
         */
        const { instructions, gridSize } = dataTransform(imputData)
        // console.log(instructions)

        /**
         * Create mars planet
         */
        mars = Mars(gridSize[0], gridSize[1])

        /**
         * Make robots run in a row
         */
        instructions.forEach(({ start, orientation, steps }, i) => {
            const robot = new Robot(start, orientation)
            if (mars.isOffLimit(start)) throw new Error(`robot ${i} never been in the planet`)
            for (let j = 0; j < steps.length; j++) {
                let step = steps[j]
                if (step == 'F') {
                    const nextPosition = robot.queryNextPosition(step) // next position to be for the robot
                    if (mars.checkOffLimitList(nextPosition)) continue; // is going out boundary and already scent, ignore
                    const isOffLimit = mars.isOffLimit(nextPosition) //check if stepped out of boundaries
                    if (!isOffLimit) robot.execInstruction(step) //if in the planet, carry on
                    else {
                        console.log('irrr')
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
        robots.forEach(robot => {
            output += robot.getCurrentStatus() + "\r\n"
        })

        /**
         * generate file
         */
        writeFile(path.resolve(process.cwd(), 'output.txt'), output)



    } catch (e) {
        console.log('Error', e.stack);

    }
}

run()




