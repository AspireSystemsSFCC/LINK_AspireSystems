/**
* Script file for adding the product image in the basketResponse when get Basket API is hit.
*/

exports.modifyGETResponse = function(basket, basketResponse){
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