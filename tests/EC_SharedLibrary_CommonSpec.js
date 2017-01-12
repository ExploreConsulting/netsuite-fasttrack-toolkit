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

/**
 * Unit tests for the country lookup function
 */
describe('geographic countries', function() {

    it("test find country id by name", function () {

        var result = EC.getCountry({ name:"United States"});

        expect(result.id).toBe(230);

    });

    it("test find country id by abbreviation", function () {

        var result = EC.getCountry( { abbrev:"US"} );

        expect(result.id).toBe(230);
    });

    it("test find country name by internal id", function () {

        var result = EC.getCountry( { id:230 } );

        expect(result.name).toEqual("United States");
    });

    it("test find country requires exact match operation", function () {

        var result = EC.getCountry( { abbrev:"usa"} );

        // "usa" was an exact search - getState() returns 'undefined' if not found
        expect(result).toBeUndefined();

        // if you want looser semantics do so first, for example countries are all defined as uppercase abbreviations:
        result = EC.getCountry({ abbrev: "us".toUpperCase() });
        expect(result).not.toBeUndefined();
    });

    it("test if country not found", function () {

        // expect undefined if you try searching for a country property that doesn't exist in our list
        var result = EC.getCountry({ name:"South Explore"});

        expect(result).toBeUndefined(result);
    });

    it("test cannot get country by internalid string due to === matching", function () {

        var result = EC.getCountry( { id:"230" } );

        expect(result).toBeUndefined();

        // internal ids are strongly typed as integers
        result = EC.getCountry( { id: parseInt("230") });
        expect(result.name).toEqual("United States");
    });
});

/**
 * Unit tests for the item type lookup function
 */
describe('item type lookup', function() {

    it("test find valid item type for Non Inventory Part", function () {

        var result = EC.ItemTypes.NonInvtPart;
        expect(result).toBe("noninventoryitem");

    });
    it("test find valid item type for Inventory Part", function () {

        var result = EC.ItemTypes.InvtPart;
        expect(result).toBe("inventoryitem");

    });
    it("test find valid item type for Group Item", function () {

        var result = EC.ItemTypes.Group;
        expect(result).toBe("itemgroup");

    });
    it("test find valid item type for Kit Item", function () {

        var result = EC.ItemTypes.Kit;
        expect(result).toBe("kititem");

    });
    it("test find valid item type for Assembly Item", function () {

        var result = EC.ItemTypes.Assembly;
        expect(result).toBe("assemblyitem");

    });
    it("test find valid item type for Service Item", function () {

        var result = EC.ItemTypes.Service;
        expect(result).toBe("serviceitem");

    });
    it("test find valid item type for Description Item", function () {

        var result = EC.ItemTypes.Description;
        expect(result).toBe("descriptionitem");

    });
    it("test find valid item type for Discount Item", function () {

        var result = EC.ItemTypes.Discount;
        expect(result).toBe("discountitem");

    });
    it("test find valid item type for Other Charge Item", function () {

        var result = EC.ItemTypes.OthCharge;
        expect(result).toBe("otherchargeitem");

    });
    it("test find valid item type for Gift Certificate Item", function () {

        var result = EC.ItemTypes.GiftCert;
        expect(result).toBe("giftcertificateitem");

    });
    it("test find valid item type for Markup Item", function () {

        var result = EC.ItemTypes.Markup;
        expect(result).toBe("markupitem");

    });
    it("test find valid item type for Payment Item", function () {

        var result = EC.ItemTypes.Payment;
        expect(result).toBe("paymentitem");

    });
    it("test find valid item type for Subtotal Item", function () {

        var result = EC.ItemTypes.Subtotal;
        expect(result).toBe("subtotalitem");

    });

    it("test find invalid item type", function () {

        var result = EC.ItemTypes.NonInvPart;
        expect(result).toBeUndefined();

    });

    // Should be 13 item types defined in object
    it("test number of item types defined", function () {

        var result = Object.keys(EC.ItemTypes).length;
        expect(result).toBe(13);

    });

});


describe('getExceptionDetail', function () {

    it('should handle native javascript Error objects', function () {
        var error = new Error("error message","123");
        var result = EC.getExceptionDetail(error);

        result.should.contain("error message");
        // an Error object should include a stack trace
        result.should.contain("at");
    });

    it('should handle plain string exception', function () {

        var result = EC.getExceptionDetail("some plain string exception");

        result.should.contain("some plain string exception");
        // a plain string should not include a stack trace
        result.should.contain("no stack trace");

    });

    it('should handle NS nlobjError objects', function () {

        var error = new nlobjError();

        sinon.stub(error, 'getStackTrace').returns(["at some line in the stack trace"]);
        sinon.stub(error, 'toString').returns("some netsuite error object");

        var result = EC.getExceptionDetail(error);
        result.should.contain("some netsuite error object");
        // an nlobjError object should include a stack trace
        result.should.contain("at");
    });

    it('should handle other native javascript objects', function () {
        var error = new TypeError();
        error.message = "invalid syntax";
        var result = EC.getExceptionDetail(error);

        result.should.contain("invalid syntax");
        // this sort of error should include a stack trace
        result.should.contain("at");
    });
});