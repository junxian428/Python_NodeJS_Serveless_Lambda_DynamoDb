const AWS = require("aws-sdk");
const dynamo = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event, context) => {
  let body;
  let statusCode = 200;
  const headers = {
    "Content-Type": "application/json"
  };

  try {
    
    console.info("event data: " + JSON.stringify(event))
    
    switch (event.httpMethod + " " + event.resource) {
      
      
      //Delete a single item by id
      case "DELETE /company/{id}":
        await dynamo
          .delete({
            TableName: "company",
            Key: {
              id: event.pathParameters.id
            }
          })
          .promise();
        body = `Deleted item ${event.pathParameters.id}`;
        break;
        
      //Get a single item by id  
      case "GET /company/{id}":
        body = await dynamo
          .get({
            TableName: "crud-demo",
            Key: {
              id: event.pathParameters.id
            }
          })
          .promise();
        break;
        
      //Put a single item in the table  
      case "PUT /company":
        let requestJSON = JSON.parse(event.body);
        await dynamo
          .put({
            TableName: "company",
            Item: {
              id: requestJSON.id,
              plc_station: requestJSON.plc_station,
              plc_status: requestJSON.plc_status,
              raspberry_mac_address: requestJSON.raspberry_mac_address,
              company_name : requestJSON.company_name,
              whatsapp_phone_1 : requestJSON.whatsapp_phone_1,
              whatsapp_phone_1_name : requestJSON.whatsapp_phone_1_name,
              whatsapp_phone_1_position : requestJSON.whatsapp_phone_1_position,
              whatsapp_phone_2 : requestJSON.whatsapp_phone_2,
              whatsapp_phone_2_name : requestJSON.whatsapp_phone_2_name,
              whatsapp_phone_2_position : requestJSON.whatsapp_phone_2_position,
              whatsapp_phone_3 : requestJSON.whatsapp_phone_3,
              whatsapp_phone_3_name : requestJSON.whatsapp_phone_3_name,
              whatsapp_phone_3_position : requestJSON.whatsapp_phone_3_position,
              whatsapp_phone_4 : requestJSON.whatsapp_phone_4,
              whatsapp_phone_4_name : requestJSON.whatsapp_phone_4_name,
              whatsapp_phone_4_position : requestJSON.whatsapp_phone_4_position,
              whatsapp_phone_5 : requestJSON.whatsapp_phone_5,
              whatsapp_phone_5_name : requestJSON.whatsapp_phone_5_name,
              whatsapp_phone_5_position : requestJSON.whatsapp_phone_5_position
            }
          })
          .promise();
        body = `Put item ${requestJSON.id}`;
        break;

      case "GET /company":
        body = await dynamo.scan({ TableName: "company" }).promise();
        break;
        
        
      //If no route found output message with all even   
      default:
        throw new Error(`Unsupported route: "${event.httpMethod + " " + event.resource + " - EVENT: " + JSON.stringify(event)}"`);
    }
  } catch (err) {
    statusCode = 400;
    body = err.message;
  } finally {
    body = JSON.stringify(body);
  }

  return {
    statusCode,
    body,
    headers
  };
};