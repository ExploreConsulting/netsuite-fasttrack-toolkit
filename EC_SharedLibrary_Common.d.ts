/**
 * TypeScript declarations for EC_SharedLibrary_Common.js (these are also used in pure JS for documentation
 * and code-assist in Webstorm
 */
declare namespace EC {

    /**
     * Represents a state in 3 different ways - full name, NS internal id or two-letter abbreviation
     */
    interface State {
        // state full name
        name: string,
        // netsuite internal id
        id: string,
        // two letter state abbreviation
        abbrev: string
    }

    /**
     *  Lookup US state data by one of 3 keys: internal id, abbreviation or state name. Providing any one
     *  of the three will exact match then return an object with all 3.
     *  @param query specify one of the three state keys to look up
     * @example
     * //get by full name
     * EC.getState({ name:"Alabama"});
     *  {name: "Alabama", id: 0, abbrev: "AL"}
     *
     * // get by abbreviation
     * EC.getState({ abbrev: "AL" } );
     *  {name: "Alabama", id: 0, abbrev: "AL"}
     *
     * // get by id
     * EC.getState( { id: '0' } );
     *  {name: "Alabama", id: 0, abbrev: "AL"}
     */
    function getState(query: { name?: string, id?: string, abbrev?: string }): State


    /**
     * Represents NetSuite internal and external IDs for all transaction types
     */
    interface TransactionType {
        // external string name for transaction, typically PascalCase
        external: string,
        // internal id string name, may or may not match the external name (hence the need for a mapping)
        internal: string
    }

    /**
     *  Lookup transaction type ID by one of 2 keys: internal id, external id. Providing any one
     *  of the two will exact match then return an object with both.
     * @param query specify one of the two keys, internal or external
     * @example
     *
     * //get by internal ID
     * EC.getTransactionType({ internal:"salesorder"});
     *  {external:"SalesOrd",internal:"salesorder"}
     * // get by external ID
     * EC.getTransactionType({ external: "SalesOrd" } );
     *  {external:"SalesOrd",internal:"salesorder"}
     */
    function getTransactionType(query: { internal?: string, external?: string }): TransactionType

    /**
     * True if the current script is running as a client script
     * @type {boolean} true if the current script is a client script, false otherwise
     */
    var isClientScript: boolean

    /**
     * Takes an exception of several types and parses details of the message into a friendly string
     * Handles some advanced cases like capturing a stack trace if available.
     * @param e the exception
     */
    function getExceptionDetail(e: Object | Error): string

    /**
     *  Represents NetSuite internal and external IDs for all item types. Maps from external id to internal id
     *  e.g. InvtPart -> 'inventoryitem'
     */
    enum ItemTypes {
        InvtPart,
        NonInvtPart,
        Group,
        Kit,
        Assembly,
        Service,
        Description,
        Discount,
        OthCharge,
        GiftCert,
        Markup,
        Payment,
        Subtotal
    }
}




