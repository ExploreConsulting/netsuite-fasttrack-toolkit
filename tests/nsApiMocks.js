/**
 * Created by stalbert on 6/17/15.
 */
// Sinon (mocked) representation of commonly used NetSuite functions/objects
// In general, constructors should return objects with methods stub()-ed and pure nlapi functions as spy()
var global = this;
(function closure(root) {
    var fakeContext     = {
        getRemainingUsage: sinon.stub(),
        getSetting: sinon.stub(),
        getExecutionContext: sinon.stub()
    };

    // default to starting the mock having 1000 units remaining
    fakeContext.getRemainingUsage.returns(1000);

    root.nlapiGetContext = sinon.stub().returns(fakeContext);

    root.nlapiLogExecution = sinon.spy();

    root.nlapiRequestURL = sinon.stub();
}(global));