const path = require("path")
const Mars = require("./models/Mars")
const Robot = require("./models/Robot")
const { readFile, writeFile, dataTransform } = require("./utils")

async function run() {
    const robots = []
    let output = ""
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
        const mars = Mars(gridSize[0], gridSize[1])

        /**
         * Make robots run in a row
         */
        instructions.forEach(({ start, orientation, steps }) => {
            const robot = new Robot(start, orientation)
            // console.log(robot)
            steps.forEach(step => {
                robot.execInstruction(step)

            })
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




