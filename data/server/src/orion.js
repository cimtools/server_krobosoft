//API GUIDE https://fiware-orion.readthedocs.io/en/master/user/walkthrough_apiv2/index.html

const http = require('http');
const querystring = require('querystring');
const orion_ip = 'orion'
const orion_port = 1026

//Health check
var options = {
    host: orion_ip,
    port: orion_port,
    path: '/version',
    method: 'GET'
};

http.request(options, function(res) {
    console.log("========================================================================")
    console.log('STATUS: ' + res.statusCode);
    console.log('HEADERS: ' + JSON.stringify(res.headers));
    res.setEncoding('utf8');
    res.on('data', function (chunk) {
        console.log('BODY: ' + chunk);
    });
    console.log("========================================================================")
}).end();

//Create entity
function create(entity_name, entity_type){
    const postData = JSON.stringify({
        "id": entity_name,
        "type": entity_type,

        "string_attr"   :{"value": "a", "type": "string"},
        "int_attr"      :{"value": 0, "type": "Integer"},
        "float_attr"    :{"value": 0.0, "type": "Float"}
    });

    const options = {
        hostname: orion_ip,
        port: orion_port,
        path: '/v2/entities/',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': Buffer.byteLength(postData)
        }
    };

    const req = http.request(options, (res) => {
        console.log("========================================================================")
        console.log(`STATUS: ${res.statusCode}`);
        console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
        res.setEncoding('utf8');
        res.on('data', (chunk) => {
            console.log(`BODY: ${chunk}`);
        });
        res.on('end', () => {
            console.log('No more data in response.');
        });
        console.log("========================================================================")
    });
      
    req.on('error', (e) => {
    console.error(`problem with request: ${e.message}`);
    });
      
    // Write data to request body
    req.write(postData);
    req.end();
}

//List entities
function list() {
    var options = {
        host: orion_ip,
        port: orion_port,
        path: '/v2/entities/',
        method: 'GET'
    };
    
    http.request(options, function(res) {
        console.log("========================================================================")
        console.log('STATUS: ' + res.statusCode);
        console.log('HEADERS: ' + JSON.stringify(res.headers));
        res.setEncoding('utf8');
        res.on('data', function (chunk) {
            console.log('BODY: ' + chunk);
        });
        console.log("========================================================================")
    }).end();
}

//Update entity
function update(entity_name, attr, value) {
    // curl orion:1026/v2/entities/robot/attrs/string_attr/value -s -S -H 'Content-Type: text/plain' -X PUT -d 28.5

    const putData = value

    var options = {
        host: orion_ip,
        port: orion_port,
        path: '/v2/entities/' + entity_name + '/attrs/'+ attr + '/value',
        method: 'PUT',
        headers: {
            'Content-Type': 'text/plain',
            'Content-Length': Buffer.byteLength(putData)
        }
    };
    
    const req = http.request(options, function(res) {
        console.log("========================================================================")
        console.log(putData);
        console.log(Buffer.byteLength(putData));
        console.log("Update attrt");
        console.log('STATUS: ' + res.statusCode);
        console.log('HEADERS: ' + JSON.stringify(res.headers));
        res.setEncoding('utf8');
        res.on('data', function (chunk) {
            console.log('BODY: ' + chunk);
        });
        console.log("========================================================================")
    });

    req.write(putData);
    req.end();
}

// Execute demo
console.log('Orion demosntration');
list();
// create('thing', 'robot');
update('thing', 'string_attr', '"A"');
list();

