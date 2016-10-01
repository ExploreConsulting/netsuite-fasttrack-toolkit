/**
 * Spec tests for the last search functionality
 */

var global = this;

// stub out top level nlapi functionality
global.nlapiCreateSearch               = sinon.stub();
global.nlapiLoadSearch                  = sinon.stub();
global.nlapiSearchRecord               = sinon.stub();
nlobjSearchColumn.prototype.setFormula = function (formula) {
    ;
}


/**
 * Generates in memory search results with simple mocking of unique column values for each result object
 * @param [start] starting index (will be assigned to internal id) if omitted defaults to zero
 * @param end ending index, exclusive (will be assigned internalid)
 * @returns array of results where any column getValue() will return the argument passed concatenated with the index of
 * the specific result.
 *
 * @example
 *
 * var results = generateNSSearchResults(0,5);
 *
 * results[2].getValue("foobar"); // returns "foobar2"
 * results[2].getText("foobar"); // returns text-foobar2-text
 */
function generateNSSearchResults(start, end) {

    return Lazy.range(start, end).map(function (i) {
        var searchResult = new nlobjSearchResult();
        sinon.stub(searchResult, "getId").returns(i);
        sinon.stub(searchResult, "getValue", function (column) {
            var colname = _.isString(column) ? column : column.getName();
            return colname + i;
        });
        sinon.stub(searchResult, "getText", function (column) {
            var colname = _.isString(column) ? column : column.getName();
            return "text-" + colname + i + "-text";
        });
        return searchResult;
    }).toArray();

}

describe("Lazy Search", function () {

    describe("The Test Fixture", function () {

        it("can generate 5 fake NS search results", function () {

            var result = generateNSSearchResults(0, 5);

            expect(result.length).toBe(5);

            expect(result[2].getId()).toBe(2);
            expect(result[2].getValue("baz")).toBe("baz2");
        });

        it("can generate 5000 fake NS search results", function () {

            var result = generateNSSearchResults(5000, 6000);

            expect(result.length).toBe(1000);

            expect(result[2].getId()).toBe(5002);
            expect(result[2].getValue("baz")).toBe("baz5002");
        });
    });

    it("can create custom sequence containing native netsuite search results", function () {
        //region test setup
        // mocking createSearch -> nlobjSearch.runSearch() ->  nlobjSearchResultSet -> getResults()
        var nSearch          = sinon.stub();
        var nSearchResultSet = sinon.stub();
        nSearch.runSearch    = sinon.stub().returns(nSearchResultSet);

        var generatedResults = generateNSSearchResults(0, 5);

        nSearchResultSet.getResults = sinon.stub().returns(generatedResults);

        nlapiCreateSearch.returns(nSearch);
        //endregion

        EC.enableLazySearch(); // required to bing the search functions into scope on the EC object

        var s = EC.createSearch("transaction", [
            ["amount", "greaterthan", "0"]
        ], [
            ["internalid"],
            ["amount"]
        ]).map(function (r) {
            return {
                id: r.getId(),
                foo: r.getValue("foo"),
                bar: r.getValue("bar")
            }
        });

        s.each(function (f) {
            console.log(JSON.stringify(f));
        });


        expect(s.toArray()[3]).toEqual({
            id: 3,
            foo: "foo3",
            bar: "bar3"
        })
    });

    it("createSearch() can JSON.stringify()", function () {
        //region test setup
        // mocking createSearch -> nlobjSearch.runSearch() ->  nlobjSearchResultSet -> getResults()
        var nSearch          = sinon.stub();
        var nSearchResultSet = sinon.stub();
        nSearch.runSearch    = sinon.stub().returns(nSearchResultSet);
        nSearch.getSearchType = sinon.stub().returns('foo');
        nSearch.getFilterExpression = sinon.stub().returns([['somefake','filter', 'expression']]);


        var generatedResults = generateNSSearchResults(0, 5);

        nSearchResultSet.getResults = sinon.stub().returns(generatedResults);

        nlapiCreateSearch.returns(nSearch);
        //endregion

        EC.enableLazySearch(); // required to bing the search functions into scope on the EC object

        var s = EC.createSearch("ignored", [[]]
            , [
            ["internalid"],
            ["amount"]
        ]);

        var stringified = JSON.stringify(s);
      //  dump(stringified);
        expect(stringified).toEqual('{"recordType":"foo","filters":[["somefake","filter","expression"]]}')
    });

    it("loadSearch() can JSON.stringify()", function () {
        //region test setup
        // mocking createSearch -> nlobjSearch.runSearch() ->  nlobjSearchResultSet -> getResults()
        var nSearch          = sinon.stub();
        var nSearchResultSet = sinon.stub();
        nSearch.runSearch    = sinon.stub().returns(nSearchResultSet);
        nSearch.getSearchType = sinon.stub().returns('foo');
        nSearch.getFilterExpression = sinon.stub().returns([['somefake','filter', 'expression']]);


        var generatedResults = generateNSSearchResults(0, 5);

        nSearchResultSet.getResults = sinon.stub().returns(generatedResults);

        nlapiLoadSearch.returns(nSearch);
        //endregion

        EC.enableLazySearch(); // required to bing the search functions into scope on the EC object

        var s = EC.loadSearch("ignored", 123);

        var stringified = JSON.stringify(s);
      //  dump(stringified);
        expect(stringified).toEqual('{"recordType":"foo","filters":[["somefake","filter","expression"]]}')
    });

    it("fromSearch() can JSON.stringify()", function () {
        //region test setup
        // mocking createSearch -> nlobjSearch.runSearch() ->  nlobjSearchResultSet -> getResults()
        var nSearch          = sinon.stub();
        var nSearchResultSet = sinon.stub();
        nSearch.runSearch    = sinon.stub().returns(nSearchResultSet);
        nSearch.getSearchType = sinon.stub().returns('foo');
        nSearch.getFilterExpression = sinon.stub().returns([['somefake','filter', 'expression']]);

        var generatedResults = generateNSSearchResults(0, 5);

        nSearchResultSet.getResults = sinon.stub().returns(generatedResults);

        //endregion

        EC.enableLazySearch(); // required to bing the search functions into scope on the EC object

        var s = EC.fromSearch(nSearch);

        var stringified = JSON.stringify(s);
      //  dump(stringified);
        expect(stringified).toEqual('{"recordType":"foo","filters":[["somefake","filter","expression"]]}')
    });

    function fakeColumn(name, label, join, summary) {
        var c        = new nlobjColumn();
        c.getLabel   = sinon.stub().returns(label);
        c.getName    = sinon.stub().returns(name);
        c.getJoin    = sinon.stub().returns(join);
        c.getSummary = sinon.stub().returns(summary);
        return c;
    }

    describe('nsSearchResult2obj', function() {
        it("can automatically turn NS search results into javascript objects", function () {
            //region test setup
            // mocking createSearch -> nlobjSearch.runSearch() ->  nlobjSearchResultSet -> getResults()
            var nSearch = sinon.stub();
            var nSearchResultSet = sinon.stub();
            nSearch.runSearch = sinon.stub().returns(nSearchResultSet);

            var generatedResults = generateNSSearchResults(0, 5);

            nSearchResultSet.getResults = sinon.stub().returns(generatedResults);
            nSearchResultSet.getColumns = sinon.stub().returns([fakeColumn("foo")]);
            nlapiCreateSearch.returns(nSearch);
            //endregion

            EC.enableLazySearch(); // required to bing the search functions into scope on the EC object

            var s = EC.createSearch("transaction", [
                ["amount", "greaterthan", "0"]
            ], [
                ["notused"] // the fakecolumn mapping above overrides what is passed here
            ]).nsSearchResult2obj(); // convert netsuite results to javascript objects

            s.each(function (f) {
                console.log(JSON.stringify(f));
            });

            // due to primitive mocking (just a single column "foo"), we get the following result.
            // the value is an object because it uses result.getValue(nlobjColumn) rather than getValue("colname")
            expect(s.toArray()[3]).toEqual({ id: 3, foo: 'foo3'});
        });

        it("always returns an 'id' property for the internal id", function () {
            //region test setup
            // mocking createSearch -> nlobjSearch.runSearch() ->  nlobjSearchResultSet -> getResults()
            var nSearch = sinon.stub();
            var nSearchResultSet = sinon.stub();
            nSearch.runSearch = sinon.stub().returns(nSearchResultSet);

            var generatedResults = generateNSSearchResults(0, 5);

            nSearchResultSet.getResults = sinon.stub().returns(generatedResults);
            nSearchResultSet.getColumns = sinon.stub().returns([fakeColumn("foo")]);
            nlapiCreateSearch.returns(nSearch);
            //endregion

            EC.enableLazySearch(); // required to bing the search functions into scope on the EC object

            var s = EC.createSearch("transaction", [
                ["amount", "greaterthan", "0"]
            ], [
                ["notused"] // the fakecolumn mapping above overrides what is passed here
            ]).nsSearchResult2obj(); // convert netsuite results to javascript objects

            // all results should have an id
            s.each(function (f) {
                console.log(JSON.stringify(f));
            })

            // since result generated assigns the fake internal id == index of the result, we can
            // expect the id to equal the index
            expect(s.every(function(f, index){ return f.id == index })).toBe(true)
            // due to primitive mocking (just a single column "foo"), we get the following result.
            // the value is an object because it uses result.getValue(nlobjColumn) rather than getValue("colname")
            expect(s.toArray()[3]).toEqual({id: 3, foo: 'foo3'});
        });

        it("column labels take precedence for prop names, even for join columns", function () {
            //region test setup
            // mocking createSearch -> nlobjSearch.runSearch() ->  nlobjSearchResultSet -> getResults()
            var nSearch = sinon.stub();
            var nSearchResultSet = sinon.stub();
            nSearch.runSearch = sinon.stub().returns(nSearchResultSet);

            var generatedResults = generateNSSearchResults(0, 5);

            nSearchResultSet.getResults = sinon.stub().returns(generatedResults);
            nSearchResultSet.getColumns = sinon.stub().returns([
                //standard column, name only
                fakeColumn("foo"),
                // a column with a label
                fakeColumn('bar','thelabel1'),
                // no name and join but no label
                fakeColumn('baz',null,'thejoin'),
                // has all of label, join and name
                fakeColumn('bog','thelabel2','thejoin')
            ]);
            nlapiCreateSearch.returns(nSearch);
            //endregion

            EC.enableLazySearch(); // required to bing the search functions into scope on the EC object

            var s = EC.createSearch("transaction", [
                ["amount", "greaterthan", "0"]
            ], [
                ["notused"] // the fakecolumn mapping above overrides what is passed here
            ]).nsSearchResult2obj(); // convert netsuite results to javascript objects

            s.each(function (f) {
                console.log(JSON.stringify(f));
            });

            // we expect the rendered javascript object to obey the following property names
            expect(s.toArray()[3]).toEqual({
                // internal id
                id : 3,
                // standard column should get named after the field name
                foo : 'foo3',
                // label take precedence over field name
                thelabel1 : 'bar3',
                // join name is concatenated with field name
                thejoinbaz : 'baz3',
                // again label takes precedence, even if there is a join. This means your labels need to be unique
                thelabel2 : 'bog3'
            });
        });

        it("can optionally return result column text in addition to values as javascript objects", function () {
            //region test setup
            // mocking createSearch -> nlobjSearch.runSearch() ->  nlobjSearchResultSet -> getResults()
            var nSearch = sinon.stub();
            var nSearchResultSet = sinon.stub();
            nSearch.runSearch = sinon.stub().returns(nSearchResultSet);

            var generatedResults = generateNSSearchResults(0, 5);

            nSearchResultSet.getResults = sinon.stub().returns(generatedResults);
            nSearchResultSet.getColumns = sinon.stub().returns([fakeColumn("foo")]);
            nlapiCreateSearch.returns(nSearch);
            //endregion

            EC.enableLazySearch(); // required to bing the search functions into scope on the EC object

            var s = EC.createSearch("transaction", [
                ["amount", "greaterthan", "0"]
            ], [
                ["notused"] // the fakecolumn mapping above overrides what is passed here
            ]).nsSearchResult2obj(true); // convert netsuite results to javascript objects with xxxText props

            s.each(function (f) {
                console.log(JSON.stringify(f));
            });

            // due to primitive mocking (just a single column "foo"), we get the following result.
            // the value is an object because it uses result.getValue(nlobjColumn) rather than getValue("colname")
            expect(s.toArray()[3]).toEqual({ id: 3, foo: 'foo3', fooText: "text-foo3-text"});

        });
    });

    describe("Preliminary Record Count", function () {
        it("can get the count of rows for a search", function () {
            //region test setup

            // return a single result that returns a single value (the row count)
            var searchResult = new nlobjSearchResult();
            sinon.stub(searchResult, "getId").returns(1);
            sinon.stub(searchResult, "getValue").returns(5);
            nlapiSearchRecord.returns([searchResult]);
            //endregion

            EC.enableLazySearch();
            var resultCount  = EC.getTotalRecordCount('recordtype', [['some', 'filter', 'expression']]);

            resultCount.should.be.a('number');
            resultCount.should.equal(5);
            searchResult.getValue.should.have.been.calledOnce;
        });

        it("returns null if we can't determine # of rows in a search", sinon.test(function () {
            //region test setup
            // simulate what nlapiSearchRecord returns if there are no results
            nlapiSearchRecord.returns(null);
            //endregion

            EC.enableLazySearch();
            var resultCount = EC.getTotalRecordCount('recordtype', [['some', 'filter', 'expression']]);

            // expect null - this is less disrupting than throwing an exception. The idea is failure to get the
            // count of records may not be a truly exceptional condition and for some use cases record count
            // is just a "nice to have" for use with something like nlapiGetContext().setPercentComplete(..)
            assert.isNull(resultCount);
        }));

        it("returns zero rows if the underlying result is NaN", sinon.test(function () {
            //region test setup
            // simulate what nlapiSearchRecord returns for a SUM column for which there are no
            // results (NaN)
            var searchResult = new nlobjSearchResult();
            sinon.stub(searchResult, "getId").returns(1);
            sinon.stub(searchResult, "getValue").returns(NaN);
            nlapiSearchRecord.returns([searchResult]);
            //endregion

            EC.enableLazySearch();
            var resultCount = EC.getTotalRecordCount('recordtype', [['some', 'filter', 'expression']]);

            resultCount.should.be.a('number');
            // NaN returned by the underlying search should should be coerced to zero rows, which is true.
            resultCount.should.equal(0);
            searchResult.getValue.should.have.been.calledOnce;
        }));
    });
});

