/*
  File name: newsletter.js
  Description: This script fetches new instances of PriosNewsLetterSubscription custom object.
  Creates a new file in the specified WebDAV path in case it doesn't exist.
  Writes all the instances of the custom object to the file in XML format and deletes the successfully exported instances from the object.
  Author name: Nagardona Radhika
  Start date: 12-Feb-2020
  Current date: 13-Feb-2020
*/

'use strict';

//Get required packages and classes
var File = require('dw/io/File');
var FileWriter = require('dw/io/FileWriter');
var XMLStreamWriter = require('dw/io/XMLStreamWriter');
var CustomObject = require('dw/object/CustomObject');
var CustomObjectMgr = require('dw/object/CustomObjectMgr');
var Transaction = require('dw/system/Transaction'); 
var Logger = require('dw/system/Logger');

//function to write email of each instance in the custom object to the specified file
function exportSubscribers(xsw,subscribers) {
	xsw.writeStartDocument();
	xsw.writeStartElement('subscribers');
	var subscriber = null;
	var subscriberEmail = null;
	for each (subscriber in subscribers) {		
		subscriberEmail = subscriber.custom.c_UserEmail;
		Transaction.wrap(function() {
			xsw.writeStartElement('subscriber');
			xsw.writeCharacters(subscriberEmail);
			xsw.writeEndElement();
			CustomObjectMgr.remove(subscriber);
		});		
	}
	xsw.writeEndElement();
	xsw.writeEndDocument();
	xsw.close();
	return xsw;
}


//function to export subscribers data to IMPEX folder in WebDAV server
exports.newsletterSubscribers = function (parameters, stepExecution) {
	var customObjectType = parameters.CustomObjectType;
	try {
		if (CustomObjectMgr.getAllCustomObjects(customObjectType).count === 0) {
			Logger.getLogger('prios','prios').warn('No instances in the specified CustomObject');
		}
		else {
			var subscribers = CustomObjectMgr.getAllCustomObjects(customObjectType);
			var folderName = parameters.FolderName;	
			var fileName = parameters.FileName;
			var currentDate = new Date(); //To fetch current dateTimeStamp
			var file : File= new File(File.IMPEX + File.SEPARATOR + folderName + File.SEPARATOR + fileName + '_' + currentDate);
			fileWriter = new FileWriter(file, 'UTF-8');
			var xsw : XMLStreamWriter = new XMLStreamWriter(fileWriter);

			if(xsw === null) {
				Logger.getLogger('prios','prios').error('Error while creating XML export file.');
			}
			else {
				var exportFile = exportSubscribers(xsw,subscribers);
				if (exportFile === null) {
					Logger.getLogger('prios','prios').error('Error while writing elements to the XML export file');
				}
			}
			fileWriter.close();		
		}
	} catch (exception) {
		Logger.getLogger('prios','prios').error	('Exception: ' + exception);
		Logger.getLogger('prios','prios').error	('Please check BM configurations.');
	}
	
}
