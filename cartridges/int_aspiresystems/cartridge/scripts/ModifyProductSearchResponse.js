/**
* Script file for adding custom attribute i.e. c_brand in the response.
* This script will execute when user searches for any product in the search box or clicks on a subcategory thus rendering the products.
*/

/* API Includes */
var Status = require('dw/system/Status');
var ProductMgr = require('dw/catalog/ProductMgr');

exports.modifyGETResponse = function (ProductSearchResult) {
	var productLength = ProductSearchResult.hits.length;
	//looping through all the products that are rendered by this search
	for(var i = 0; i<productLength; i++){
		var productID = ProductSearchResult.hits[i].productId;
		var product = ProductMgr.getProduct(productID);
		if(!empty(product)){
			//Adding Custom Attribute to show the brand in the response.
		    ProductSearchResult.hits[i].c_brand = product.getBrand();
		}
	}
    return new Status(Status.OK);
};
