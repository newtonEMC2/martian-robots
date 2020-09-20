const Mars = function (width, height) {

    var module = function () { }

    module.width = width > 50 ? 50 : width
    module.height = height > 50 ? 50 : height
    module.offLimitsList = []

    module.setoffLimits = function (position) {
        module.offLimitsList.push(position.join(""))
    }

    module.isOffLimit = function (position) {
        if (position[0] < 0 || position[0] > module.width) return true //x coordinate
        else if (position[1] > module.height || position[1] < 0) return true //y coordinate
        else return false
    }

    module.checkOffLimitList = function (position) {
        return module.offLimitsList.includes(position.join(""))
    }

    return {
        setoffLimits: module.setoffLimits,
        isOffLimit: module.isOffLimit,
        checkOffLimitList: module.checkOffLimitList
    };
}


export default Mars