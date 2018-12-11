/**
* Script file for use in the Script pipelet node.
* To define input and output parameters, create entries of the form:
*
* @<paramUsageType> <paramName> : <paramDataType> [<paramComment>]
*
* where
*   <paramUsageType> can be either 'input' or 'output'
*   <paramName> can be any valid parameter name
*   <paramDataType> identifies the type of the parameter
*   <paramComment> is an optional comment
*
* For example:
*
*-   @input ExampleIn : String This is a sample comment.
*-   @output ExampleOut : Number
*
*/
/* API Includes */
var Status = require('dw/system/Status');
exports.beforePOST = function(passwordReset){
	var customerEmailID= passwordReset.identification;
	var customer = dw.customer.CustomerMgr.getCustomerByLogin(customerEmailID);
	if(customer!=null){
	return new Status(Status.OK)	
	}else{
		return new Status(Status.ERROR)
     }
}

