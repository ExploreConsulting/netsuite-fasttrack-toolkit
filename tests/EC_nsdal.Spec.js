//noinspection ThisExpressionReferencesGlobalObjectJS
/**
 * Created by JetBrains WebStorm.
 * User: stalbert
 * Date: 1/31/12
 * Time: 6:50 AM
 * To change this template use File | Settings | File Templates.
 */


//  assign a name to the global object for clarity (netsuite api calls are on the global object)
var global = this;

describe('NSDAL', function () {
    describe('make object', function () {
        // using sinon.test() makes the stub restore itself after the test so other tests have a clean slate
        it("test create record has correct properties", sinon.test(function () {

            // have underlying nlapiCreateRecord() call return an empty nlobjRecord
            this.stub(global, 'nlapiCreateRecord').returns(getRecordStub());

            var o = nsdal.createObject('custrecord_license_key', ['id', 'foo', 'bar']);

            assert(o.hasOwnProperty('id'));
            assert(o.hasOwnProperty('foo'));
            assert(o.hasOwnProperty('bar'));
            assert(!o.hasOwnProperty('baz'));
        }));

        it("test created record property set calls setFieldValue()", sinon.test(function () {
            var nlobjStub = getRecordStub();
            this.stub(global, 'nlapiCreateRecord').returns(nlobjStub);
            // spy on calls to setFieldValue on the underlying nlobjRecord object
            this.spy(nlobjStub, "setFieldValue");

            var o = nsdal.createObject('custrecord_license_key', ['id', 'foo', 'bar']);


            // set all 3 properties
            o.id  = 123;
            o.foo = "myfoo";
            o.bar = null;

            // each assignment of properties above should have resulted in setFieldValue() being called
            console.log(nlobjStub.setFieldValue.calls);

            assert(nlobjStub.setFieldValue.calledThrice);
        }));

        it("test setting a property to undefined does nothing (NOP)", sinon.test(function () {
            //region setup
            var nlobjStub = getRecordStub();
            this.stub(global, 'nlapiCreateRecord').returns(nlobjStub);
            // stub only foo to be a checkbox field
            this.stub(nlobjStub, 'getField')
                .withArgs('foo').returns({type: 'checkbox'})
                .withArgs('id').returns({type: 'text'})
                .withArgs('bar').returns({type: 'datetime'})
                .withArgs('baz').returns({type: 'select'});
            // spy on calls to setFieldValue on the underlying nlobjRecord object
            this.spy(nlobjStub, "setFieldValue");
            //endregion

            var o = nsdal.createObject('custrecord_license_key', ['id', 'foo', 'bar', "baz"]);

            // setting all types of properties to undefined, expect all assignments to be ignored
            o.id  = undefined;
            o.foo = undefined;
            o.bar = undefined;
            o.baz = undefined;

            // none of the assignments above should have resulted in a call to netsuite
            assert(nlobjStub.setFieldValue.notCalled);
        }));

        it("test created record property GET calls getFieldValue()", sinon.test(function () {

            var nlobjStub = getRecordStub();
            this.stub(global, 'nlapiCreateRecord').returns(nlobjStub);

            // spy on calls to getFieldValue
            this.spy(nlobjStub, "getFieldValue");

            // read all 3 properties
            var o = nsdal.createObject('custrecord_license_key', ['id', 'foo', 'bar']);

            var tmp = o.id;
            tmp     = o.foo;
            tmp     = o.bar;

            // each assignment of properties above should have resulted in setFieldValue() being called
            assert(nlobjStub.getFieldValue.calledThrice);
        }));


        it("test body field that is not reflectable is treated as basic fields", sinon.test(function () {

            var nlobjStub = getRecordStub();
            this.stub(global, 'nlapiCreateRecord').returns(nlobjStub);
            // simulate a "phantom field" - one which can have getfield
            this.stub(nlobjStub, 'getField').withArgs('foo').returns(null);
            // spy on calls to getFieldValue
            this.spy(nlobjStub, "getFieldValue");

            var o = nsdal.createObject('custrecord_license_key', ['id', 'foo', 'bar']);
            // read all 3 properties
            var tmp = o.id;
            tmp     = o.foo;
            tmp     = o.bar;

            // each assignment of properties above should have resulted in setFieldValue() being called, including
            // the "phantom" field foo
            assert(nlobjStub.getFieldValue.calledThrice);
        }));

    });

    describe('load object', function () {
        // using sinon.test() makes the stub restore itself after the test so other tests have a clean slate
        it("test load record by id has correct id", sinon.test(function () {

            // mock a record returned from netsuite with an id
            var mockInternalId   = '1';
            var fakeLoadedRecord = getRecordStub();
            this.stub(global, 'nlapiLoadRecord').returns(fakeLoadedRecord);

            // mock our object's request to netsuite to retrieve the 'id' field value
            this.stub(fakeLoadedRecord, 'getFieldValue').withArgs('id').returns(mockInternalId);

            // exercise SUT
            var o = nsdal.loadObject('custrecord_license_key', mockInternalId, ['id', 'foo', 'bar']);
            o.id.should.equal(mockInternalId);
        }));

        it("test checkbox field works as a true boolean", sinon.test(function () {

            var fakeLoadedRecord = getRecordStub();
            this.stub(global, 'nlapiLoadRecord').returns(fakeLoadedRecord);
            // stub only foo to be a checkbox field
            this.stub(fakeLoadedRecord, 'getField')
                .withArgs('foo').returns({type: 'checkbox'})
                .withArgs('id').returns({type: 'text'})
                .withArgs('bar').returns({type: 'text'});
            // watch for calls to internal setFieldValue
            var spy = this.spy(fakeLoadedRecord, 'setFieldValue');


            // exercise SUT
            var o = nsdal.loadObject('custrecord_license_key', 'mockid', ['id', 'foo', 'bar']);
            o.foo = true;
            o.foo = false;

            // expect the foo property to be recognized as a boolean
            o.foo.should.be.a("Boolean");
            o.foo.should.be.false;

            // setting a boolean property to true or false should internally set the field value to 'T'/'F' as
            // netsuite expects
            assert(spy.withArgs('foo', 'T').calledOnce);
            assert(spy.withArgs('foo', 'F').calledOnce);
        }));

        it("test date netsuite field is a Momentjs instance", sinon.test(function () {

            var fakeLoadedRecord = getRecordStub();
            this.stub(global, 'nlapiLoadRecord').returns(fakeLoadedRecord);
            // stub only foo to be a date field
            this.stub(fakeLoadedRecord, 'getField')
                .withArgs('foo').returns({type: 'date'});

            // exercise SUT
            var o = nsdal.loadObject('custrecord_license_key', 'mockid', ['foo']);

            // expect the foo property to be recognized as a 'moment' instance
            assert(moment.isMoment(o.foo));
        }));

        it("test datetime netsuite field is a Momentjs instance", sinon.test(function () {

            var fakeLoadedRecord = getRecordStub();
            this.stub(global, 'nlapiLoadRecord').returns(fakeLoadedRecord);
            // stub only foo to be a date field
            this.stub(fakeLoadedRecord, 'getField')
                .withArgs('foo').returns({type: 'datetime'});

            // exercise SUT
            var o = nsdal.loadObject('x', 'mockid', ['foo']);

            // expect the foo property to be recognized as a 'moment' instance
            assert(moment.isMoment(o.foo));
        }));

        it("test date field handles ISO 8601 partial format", sinon.test(function () {

            var testDateFullISO = new Date("2013-05-31T23:59:00.000Z");
            // ISO string without milliseconds or timezone
            var testDatePartialISOString = "2013-05-31T23:59:00";

            //region test setup
            var fakeLoadedRecord = getRecordStub();
            this.stub(global, 'nlapiLoadRecord').returns(fakeLoadedRecord);
            // stub foo to be a date field
            this.stub(fakeLoadedRecord, 'getField')
                .withArgs('foo').returns({type: 'date'});
            this.stub(global, 'nlapiStringToDate').returns(testDateFullISO);
            //endregion

            // exercise SUT
            var o = nsdal.loadObject('x', 'mockid', ['foo']);

            // assign a partial ISO 8601 date
            o.foo = moment(testDatePartialISOString);

            console.log("moment: " + o.foo.toString());
            assert(o.foo.isSame(testDateFullISO));
        }));

        it("test set null date flows through to NetSuite", sinon.test(function () {

            //region test setup
            var fakeLoadedRecord = getRecordStub();
            this.stub(global, 'nlapiLoadRecord').returns(fakeLoadedRecord);
            // stub foo to be a date field
            this.stub(fakeLoadedRecord, 'getField')
                .withArgs('foo').returns({type: 'date'});
            var setLineValueSpy  = this.spy(fakeLoadedRecord, "setFieldValue");
            //endregion

            // exercise SUT
            var o = nsdal.loadObject('x', 'mockid', ['foo']);

            // attempt to assign null to date
            o.foo = null;
            // NS should have called setfield value with an actual null
            assert(setLineValueSpy.calledWith("foo", null));
        }));

        it("test set date undefined does nothing to netsuite (NOP)", sinon.test(function () {

            //region test setup
            var fakeLoadedRecord = getRecordStub();
            this.stub(global, 'nlapiLoadRecord').returns(fakeLoadedRecord);
            // stub foo to be a date field
            this.stub(fakeLoadedRecord, 'getField')
                .withArgs('foo').returns({type: 'date'});
            var setLineValueSpy  = this.spy(fakeLoadedRecord, "setFieldValue");
            //endregion

            // exercise SUT
            var o = nsdal.loadObject('x', 'mockid', ['foo']);

            // attempt to assign undefined to date
            o.foo = undefined;
            // NS should have called setfield value with an actual null
            assert(setLineValueSpy.notCalled);
        }));

        it("test empty multi-select field returns empty array", sinon.test(function () {

            var fakeLoadedRecord = getRecordStub();
            this.stub(global, 'nlapiLoadRecord').returns(fakeLoadedRecord);
            // stub only foo to be a checkbox field
            this.stub(fakeLoadedRecord, 'getField')
                .withArgs('foo').returns({type: 'multiselect'});

            // Client side SuiteScript will return an empty array, but server side will
            // return null for a multi-select field that has no values selected
            this.stub(fakeLoadedRecord, 'getFieldValues').withArgs('foo').returns(null);

            // exercise SUT
            var o = nsdal.loadObject('custrecord_license_key', 'mockid', ['foo']);

            // expect the foo property to be recognized as a boolean
            assert(_.isArray(o.foo));
            assert(_.isEmpty(o.foo));
        }));
    });

    /**
     * Encapsulates tests for sublist behavior, both for 'client side' usage and 'server side' NS
     * @param {boolean} clientside true if we should mock as a client side script
     */
    function sublistBehavior(clientside) {

        return function () {

            // simulate a client-side script
            nsdal.isClientScript = clientside;

            function addAddressBookSubrecord(parentObj) {
                // setup an addressbook subrecord mock
                var addressbookSubrecord = getRecordStub();
                sinon.stub(addressbookSubrecord, "getField").returns({type: "text"});
                sinon.stub(parentObj, "viewLineItemSubrecord").returns(addressbookSubrecord);
            }

            it("test get value on a addressbook line item field", sinon.test(function () {
                //region test setup
                var fake                 = getRecordStub();
                this.stub(global, 'nlapiLoadRecord').returns(fake);
                var getLineItemValueStub = this.stub(fake, "getLineItemValue").returns("avalue");
                this.stub(fake, "getLineItemCount").returns(2);
                this.stub(fake, 'getLineItemField').returns({type: 'text'});

                addAddressBookSubrecord(fake);
                //endregion
                var result = fake.viewCurrentLineItemSubrecord();

                dump('nsdal.isClientScript ' + nsdal.isClientScript);
                var o = nsdal.loadObject('customer', 'mockid', [/*no header fields needed*/])
                    .withSublist("addressbook", ["field1", "field2", "field3"]);

                // all three fields are mocked to return "avalue" from NetSuite
                assert.equal("avalue", o.addressbook[0].field1);
                assert.equal("avalue", o.addressbook[0].field2);
                assert.equal("avalue", o.addressbook[0].field3);

                // verify netsuite calls - the record's getLineItemValue should have been called as follows
                assert(getLineItemValueStub.calledWith("addressbook", "field1", 1));
                assert(getLineItemValueStub.calledWith("addressbook", "field2", 1));
                assert(getLineItemValueStub.calledWith("addressbook", "field3", 1));
            }));

            it("test adding new line item", sinon.test(function () {
                //region test setup
                var fake = getRecordStub();
                addAddressBookSubrecord(fake);
                this.stub(global, 'nlapiLoadRecord').returns(fake);
                this.stub(fake, "getLineItemValue").returns("avalue");
                this.stub(fake, "getLineItemCount").returns(2);
                this.stub(fake, 'getLineItemField').returns({type: 'text'});
                //endregion

                var o = nsdal.loadObject('customer', 'mockid', [/*no header fields needed*/])
                    .withSublist("addressbook", ["field1", "field2", "field3"]);

                // add a new line to the end of the current list - note you must use this method for adding lines,
                // cannot use .push() or direct indexing else you lose the netsuite magic.
                var newline = o.addressbook.addLine();
                o.addressbook.commitLine();

                assert(o.addressbook.length == 3);
                assert(newline.hasOwnProperty("field1"));
                assert(newline.hasOwnProperty("field2"));
                assert(newline.hasOwnProperty("field3"));
                assert.strictEqual(newline, o.addressbook[2]);
            }));


            it("test modify a line item", sinon.test(function () {
                //region test setup
                var fake        = getRecordStub();
                addAddressBookSubrecord(fake);
                this.stub(global, 'nlapiLoadRecord').returns(fake);
                this.stub(fake, "getLineItemCount").returns(2);
                this.stub(fake, 'getLineItemField').returns({type: 'text'});
                var setvalueSpy = this.spy(fake, "setLineItemValue");
                //endregion

                var o = nsdal.loadObject('customer', 'mockid', [/*no header fields needed*/])
                    .withSublist("addressbook", ["field1", "field2", "field3"]);

                // set a line item field value using array syntax
                o.addressbook[1].field2 = "test";
                // optional?
                o.addressbook.commitLine();

                // the line above should have called setLineItemValue for field2, line #2 (array index 1)
                assert(setvalueSpy.withArgs("addressbook", "field2", 2).calledOnce);
            }));

            it("test two sublists work independently", sinon.test(function () {
                //region test setup
                var fake                 = getRecordStub();
                addAddressBookSubrecord(fake);
                this.stub(global, 'nlapiLoadRecord').returns(fake);
                var getLineItemValueStub = this.stub(fake, "getLineItemValue").returns("avalue");
                this.stub(fake, "getLineItemCount").returns(2);
                this.stub(fake, 'getLineItemField').returns({type: 'text'});
                //endregion

                var o = nsdal.loadObject('customer', 'mockid', [/*no header fields needed*/])
                    .withSublist("addressbook", ["field1", "field2", "field3"])
                    .withSublist("sublist2", ["a", "b"]);


                // all three fields are mocked to return "avalue" from NetSuite
                assert.equal("avalue", o.addressbook[0].field1);
                assert.equal("avalue", o.addressbook[0].field2);
                assert.equal("avalue", o.addressbook[0].field3);

                // verify netsuite calls - the record's getLineItemValue should have been called as follows
                assert(getLineItemValueStub.calledWith("addressbook", "field1", 1));
                assert(getLineItemValueStub.calledWith("addressbook", "field2", 1));
                assert(getLineItemValueStub.calledWith("addressbook", "field3", 1));

                assert.equal("avalue", o.sublist2[1].a);
                assert(getLineItemValueStub.calledWith("sublist2", "a", 2));
                assert(getLineItemValueStub.neverCalledWith("sublist2", "a", 1));
            }));
        };
    }

    describe('sublist behavior', sublistBehavior(false));

    /**
     * Utility function manufactures a mock nlobjRecord for use in tests
     * @return {nlobjRecord}
     */
    function getRecordStub() {
        var fakeRecord = new nlobjRecord();
        // provide empty implementations for all netsuite object functions
        _.each(nsdal.functionsToPassThru, function (name) {
            fakeRecord[name] = function () {
            }
        });

        // default to making all calls to getField return a plain 'text' field type
        var fieldObj        = new nlobjField();
        fieldObj.type       = 'text';
        fakeRecord.getField = function () {
            return fieldObj;
        };
        return fakeRecord;
    }

    describe('client script usage',  function () {
        // this is to force simulation that this is a client side script (client side scripts don't have this function
        nlapiGetNewRecord = undefined;

        // client-side nsdal doesn't try to make rich field types such as boolean for checkbox. Everything is
        // plain fields using get/setFieldValue
        it("all fields are treated as basic fields", sinon.test(function () {
            global.nlapiGetContext().getExecutionContext.returns('userinterface');
            this.nlobjStub = getRecordStub();
            // can't call getField at all on client scripts!
            this.stub(this.nlobjStub, 'getField').throws("thou shalt not call getField SSS_NOT_YET_SUPPORTED");
            // spy on calls to getFieldValue
            this.spy(this.nlobjStub, "getFieldValue");

            this.stub(global, 'nlapiCreateRecord').returns(this.nlobjStub);

            var o = nsdal.createObject('custrecord_license_key', ['id', 'foo', 'bar']);
            // read all 3 properties
            var tmp = o.id;
            tmp     = o.foo;
            tmp     = o.bar;
            dump(this.nlobjStub.getFieldValue.callCount);
            // each read should have resulted in getFieldValue() being called
            assert(this.nlobjStub.getFieldValue.calledThrice);
        }));

    });

    describe('client side sublist behavior', sinon.test(sublistBehavior(true)))
});