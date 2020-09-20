import workOutput from "../controller"
const assert = require('assert')

describe('creates the proper output', function () {

    it('returns output succesfully from first imput', function () {
        const imput = `
        5 3
        1 1 E
        RFRFRFRF
        3 2 N
        FRRFLLFFRRFLL
        0 3 W
        LLFFFLFLFL
        `
        const output = workOutput(imput)
        console.log(output)
        // assert.equal(uuidcreated.length, 20)
    })
    it('generates uuid with 4 leading 0s', function () {
        uuidcreated = uuid('5')
        assert.equal(uuidcreated.substring(0, 4), '0000')
        assert.equal(uuidcreated.length, 20)
    })
    it('throws error when idPV param passed on length is 0', function () {
        assert.throws(() => uuid(''))
    })
    it('throws error when idPV param passed is greater than 5', function () {
        assert.throws(() => uuid('5tg65445'))
    })
    it('throws when idPV param passed on is not string', function () {
        assert.throws(() => uuid(8))
    })


})
