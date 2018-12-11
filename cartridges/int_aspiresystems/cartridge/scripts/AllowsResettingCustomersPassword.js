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
exports.afterPOST =function(customer,resetToken){
	 var variables:Map = new dw.util.HashMap();
	 variables.put("Customer",customer);
	 variables.put("ResetPasswordToken",resetToken);
	 variables.put("MailSubject","Please Reset Your Password");
	 var template:Template = new dw.util.Template("mail/resetPasswordemail.isml");
	 var content:MimeEncodedText = template.render(variables);
	 //mail will be sent to the customer whose email id will be specified in the request body
	 var mail:Mail = new dw.net.Mail().setSubject("Password Reset").setContent(content).setFrom("noreply@demandware.com").addTo(customer.profile.email);
	 mail.send();
	 return new Status(Status.OK);	
}



