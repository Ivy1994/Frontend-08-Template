const http = require('http');

http.createServer((request, response) => {
  let body = [];
  request.on('error', (err) => {
    console.log(err);
  }).on('data', (chunk) => {
    console.log("Data:", chunk);
    console.log(chunk.toString());
    body.push(chunk.toString());
  }).on('end', () => {
    //body = Buffer.concat(body).toString();
    console.log("body:", body);
    response.writeHead(200, {'Content-Type': 'text/html'});
    //response.end(' Hello World\n');
    response.end(
      `<html maaa=a >
<head>
<style>
body div #myid{
  width:100px;
  background-color: #ff5000;
}
body div img{
  width:30px;
  background-color: #ff1111;
}
</style>
</head>
<body>
  <div>
    <img id="myid"/>
  </div>
</body>
</html>`);
  });
}).listen(8080);

console.log("server started");
