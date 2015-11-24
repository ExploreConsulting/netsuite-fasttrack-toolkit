/**
 * This file contains workarounds for any 3rd party libraries that don't play nice in NetSuite.
 */



//lazyjs needs this defined (blew up without it). Node and the Browser do have this method.
function clearTimeout() {}

