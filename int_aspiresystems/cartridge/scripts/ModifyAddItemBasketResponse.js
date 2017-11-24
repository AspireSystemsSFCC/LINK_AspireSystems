/**
* Script file for adding the product image in the basketResponse when new products are added in the cart.
*/

exports.modifyPOSTResponse = function(basket, basketResponse, items){
    var pliLength = basket.productLineItems.length;
    //looping through all the productLineItems in the basket
    for (var i = 0; i < pliLength; i++) {
    	if(!empty(basket.productLineItems[i].product.getImage('small',0))){
    		var productImageUrl : dw.web.URL = basket.productLineItems[i].product.getImage('small',0).getAbsURL();
	    	//populating image URL in the basketResponse
	    	basketResponse.productItems[i].c_productImageUrl = productImageUrl.toString();
    	}
    }
    
}