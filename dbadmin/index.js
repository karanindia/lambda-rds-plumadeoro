var AWSXRay = require('aws-xray-sdk-core')
var captureMySQL = require('aws-xray-sdk-mysql')
var mysql = captureMySQL(require('mysql2/promise'))
const username = process.env.databaseUser
const password = process.env.databasePassword
const host = process.env.databaseHost

exports.handler = async (event) => {
    
    var action = event.action;
    var correo = event.correo;
    var passwordEncrypted = event.passwordEncrypted;
    
    var query = "";
    
    var connection = await mysql.createConnection({
      host     : host,
      user     : username,
      password : password,
      database : 'plumadeorodb'
    })
        
    switch (action) {
        case 'login':
            console.log("Action Login");
                query = "SELECT count(password) from usuario where correo = '" + correo +"' and password = '" + passwordEncrypted + "'";
            break;
        case 'insert':
            console.log("Action INSERT");
                query = "";
            break;
    }
    
 const [results, fields] = await connection.execute(query);
 
  const response = {
        statusCode: 200,
        body: results,
    }
            
  console.log("Results: "+ results);
  console.log("Fields: " + fields);
  
  return response;
  
}
