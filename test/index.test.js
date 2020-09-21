import { workOutput } from "../controller"
const assert = require('assert')

describe('creates the proper output', function () {

    it('returns output succesfully from proper imput', function () {
        const imput = `5 3\r\n1 1 E\r\nRFRFRFRF\r\n3 2 N\r\nFRRFLLFFRRFLL\r\n0 3 W\r\nLLFFFLFLFL`
        const expected = `1 1 E\r\n3 3 N LOST\r\n2 3 S\r\n`
        const output = workOutput(imput)
        assert.strictEqual(output, expected)
    })

    it('fails when robot start is out of the planet from the very beginning', function () {
        const imput = `5 1\r\n1 1 E\r\nRFFRLFF\r\n3 2 E\r\nFRRFLFF\r\n0 3 S\r\nLLFFFLFRRFL`
        assert.throws(() => workOutput(imput))
    })

    it('fails when planet sizes are 0 or negative', function () {
        const imput = `-1 -4 \r\n1 1 E\r\nRFFRLFFL`
        assert.throws(() => workOutput(imput))
    })

    it('fails when imput doesnt have proper format', function () {
        const imput = `-1 -4 1 1 E\r\nRFFRLFFL`
        assert.throws(() => workOutput(imput))
    })


})
