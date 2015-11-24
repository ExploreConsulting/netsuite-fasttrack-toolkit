//  assign a name to the global object for clarity (netsuite api calls are on the global object)
var global = this;
var unitsRemaining = 1000;

describe('governance', function() {

    beforeEach( function (){
        nlapiGetContext().getRemainingUsage.returns(unitsRemaining);
    });

    it("test governance gets correct initial units", function () {
        var o = new Governance();
        assert.equal(o.initialUnits,unitsRemaining);
    });

    it("test governance remainingUsage initial unit and percentage accuracy", function () {

        var o = new Governance();
        assert.equal(1000, o.remainingUsage().units);
        assert.equal(100, o.remainingUsage().percent);
    });

    it("test governance percentage remaining is a whole number", function () {

        var o = new Governance();
        // fake some usage
        nlapiGetContext().getRemainingUsage.returns(485);

        var remains = o.remainingUsage();

        // percentage remains rounds to nearest whole point
        assert.equal(remains.percent, 49);

    });

    // Governance is a singleton rather than just an object literal so that
    // we can control WHEN/if it gets instantiated; at instantiation time is when it starts paying
    // attention to 'starting' governance units
    it("test governance acts as a singleton", function () {

        var a = new Governance();
        var b = new Governance();
        // reference equality
        assert.strictEqual(a,b,"not same instances");
    });

});

