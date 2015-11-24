/**
 * Created with JetBrains WebStorm.
 * User: stalbert
 * Date: 11/9/12
 * Time: 9:09 AM
 * Unit tests for the utility functions
 */


/**
 * Unit tests for the state lookup function
 */
describe('geographic states', function() {

    it("test find state id by name", function () {

        var result = EC.getState({ name:"Washington"});

        expect(result.id).toBe(48);

    });

    it("test find state id by abbreviation", function () {

        var result = EC.getState( { abbrev:"WA"} );

        expect(result.id).toBe(48);
    });

    it("test find state name by internal id", function () {

        var result = EC.getState( { id:48 } );

        expect(result.name).toEqual("Washington");
    });

    it("test find state requires exact match operation", function () {

        var result = EC.getState( { abbrev:"wa"} );

        // "wa" was an exact search - getState() returns 'undefined' if not found
        expect(result).toBeUndefined();

        // if you want looser semantics do so first, for example states are all defined as uppercase abbreviations:
        result = EC.getState({ abbrev: "wa".toUpperCase() });
        expect(result).not.toBeUndefined();
    });

    it("test if state not found", function () {

        // expect undefined if you try searching for a state property that doesn't exist in our list
        var result = EC.getState({ name:"South Explore"});

        expect(result).toBeUndefined(result);
    });

    it("test cannot get state by internalid string due to === matching", function () {

        var result = EC.getState( { id:"48" } );

        expect(result).toBeUndefined();

        // internal ids are strongly typed as integers
        result = EC.getState( { id: parseInt("48") });
        expect(result.name).toEqual("Washington");
    });
});

/**
 * Unit tests for the transaction type conversion function
 */
describe('Transaction type IDs', function() {

    it("test transaction by internal ID", function () {

        var result = EC.getTransactionType({ internal:"salesorder"});

        expect(result.external).toBe("SalesOrd");
    });

    it("test transaction by external ID", function () {

        var result = EC.getTransactionType( { external:"SalesOrd"} );

        expect(result.internal).toBe("salesorder");
    });

   it("test invalid ID returns undefined", function () {

        var result = EC.getTransactionType( { external:"foobar"} );

        expect(result).toBeUndefined();

        result = EC.getTransactionType({ internal:"batbaz" });
        expect(result).toBeUndefined();
    });
});