const router = require('express').Router();
var request = require('request');

function getAuthenticationToken() {
    let key = "2lqvsitd0m91mtu7g7ac9pdejd";
    let secret = "ldaqet3dou7j4i8qmauihteluluulamioull6nm0cvsn7udrigd"
    let promise = new Promise(function(resolve, reject) {
        request({
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            },
            uri: 'https://salesforce-watchdog.auth.ap-southeast-2.amazoncognito.com/oauth2/token',
            body: 'grant_type=client_credentials&client_id=' + key + '&client_secret=' + secret,
            method: 'POST'
          }, function (err, response, body) {
            resolve(JSON.parse(body))
          });
    });
    return promise;
  };

router.get('/getLogFromAWS', async (req, res) => {
    getAuthenticationToken()
    .then(function(result) {
        if("token_type" in result){
            let token = result.token_type + ' ' + result.access_token
            request({
                uri: 'https://wvqi7zkj70.execute-api.ap-southeast-2.amazonaws.com/Test',
                headers: {
                        "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept",
                        "Access-Control-Allow-Origin": "*",
                        'Authorization': token,
                        'Content-Type': 'application/x-www-form-urlencoded'
                },
              }, function (err, response, body) {
                  let data = JSON.parse(body)
                  res.json(data)
              });
        }else{
            res.send({});
        }
    }) 
});

router.get('/getAuthenticationToken', (req, res) => {
    let token = getAuthenticationToken();
    res.send(token);
});

router.get('/', (req, res) => {
    res.send("Server is running you check the api's");
});

router.post('/fetchParsedLogFromS3',(req,res)=>{
    const logId = req.body.logId;
    if(logId != ""){
    getAuthenticationToken()
    .then(function(result) {
        if("token_type" in result){
            let token = result.token_type + ' ' + result.access_token
            request({
                uri: 'https://2pefcaa592.execute-api.ap-southeast-2.amazonaws.com/Test/fetchParsedLogFromS3?logId='+logId,
                headers: {
                        "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept",
                        "Access-Control-Allow-Origin": "*",
                        'Authorization': token,
                        'Content-Type': 'application/x-www-form-urlencoded'
                },
              }, function (err, response, body) {
                  let data = JSON.parse(body)
                  res.json(data)
              });
        }else{
            res.send({});
        }
    })  
}else{
    res.send({});
}
});

router.post('/downloadFile',(req,res)=>{
    const logId = req.body.logId;
    if(logId != ""){
    getAuthenticationToken()
    .then(function(result) {
        if("token_type" in result){
            let token = result.token_type + ' ' + result.access_token
            request({
                uri: 'https://0aadx8kwk7.execute-api.ap-southeast-2.amazonaws.com/Test/salesforce-log/'+logId,
                headers: {
                        "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept",
                        "Access-Control-Allow-Origin": "*",
                        'Authorization': token,
                        'Content-Type': 'application/x-www-form-urlencoded'
                },
              }, function (err, response, body) {
                  console.log(body)
                  res.send(body)
              });
        }else{
            res.send({});
        }
    })  
}else{
    res.send({});
}
});

router.get('/salesForceAuthentication',(req,res)=>{
    res.writeHead(200,{Location: 'http://w3docs.com'});
    res.end();
});

module.exports = router;