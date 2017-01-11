/**
 * Company           Explore Consulting
 * Copyright         2017 Explore Consulting, LLC
 * Description       testing NFT-SS1 in a client script
 **/
function onInit(type) {
    var log = LogManager.DefaultLogger

    log.debug('debug!')
    log.warn('warning!')
    log.info('info')
    log.error('error')

    var other = LogManager.getLogger('other')
    other.setLevel(LogManager.logLevel.debug)
    other.warn('this is another logger')
}

function onSave() {

    return true;
}

function onValidateField(type, fld) {

    return true;
}

function onFieldChanged(type, fld) {

    return true;
}

function onPostSourcing(type, fld) {

}

function onLineSelect(type) {

}

function onValidateLine(type) {

    return true;
}

function onLineRecalc(type) {

}