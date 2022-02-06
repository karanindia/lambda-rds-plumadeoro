var AWSXRay = require('aws-xray-sdk-core')
var captureMySQL = require('aws-xray-sdk-mysql')
var mysql = captureMySQL(require('mysql2/promise'))
const username = process.env.databaseUser
const password = process.env.databasePassword
const host = process.env.databaseHost

exports.handler = async (event) => {
    
    var action = event.action;
    
    var query = "";
    
    var connection = await mysql.createConnection({
      host     : host,
      user     : username,
      password : password,
      database : 'plumadeorodb'
    })
        
    switch (action) {
        case 'getUserById':
            console.log("getUserById");
            var userId = event.userId;
                query = "SELECT * FROM usuario WHERE id_usuario=" + userId;
            break;
        case 'login':
            console.log("Action Login");
            var correo = event.correo;
            var passwordEncrypted = event.passwordEncrypted;            
                query = "SELECT count(password) as result from usuario where correo = '" + correo +"' and password = '" + passwordEncrypted + "'";
            break;
        case 'register':
            console.log("Action INSERT");
            var nombre = event.nombre;
            var apellido = event.appelido;
            var correo = event.correo;
            var passwordEncrypted = event.passwordEncrypted; 
            
            query = "INSERT INTO `plumadeorodb`.`usuario` (`id_usuario`, `nombre`, `apellido_paterno`,`correo`,`password`)" +
                     " VALUES (0, '"+ nombre +"', '" + apellido + "','" + correo + "','" + passwordEncrypted +"')";
                          
            break;
    }
    
 const [results, ] = await connection.execute(query);
 
  const response = {
        statusCode: 200,
        body: results,
    }
            
  
  return response;
  
}
