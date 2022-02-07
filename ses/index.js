// Copyright 2019 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

var aws = require("aws-sdk");
var ses = new aws.SES({ region: "us-west-1" });
exports.handler = async function (event) {
  
  var action = event.action;
  var correo = event.correo;
  var nombreUsuario = event.nombre;
   
  var params = {
          Source: "registro@plumadeoro.com",
          Destination: {
            ToAddresses: [correo],
          },
          Template: "RegistroTemplate",
          TemplateData: '{ \"nombre\":\"'+ nombreUsuario +'\" }'
  };
 
  return ses.sendTemplatedEmail(params).promise()
};