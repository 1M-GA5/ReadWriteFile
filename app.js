const http = require('http');

let username = '';

const server = http.createServer((req, res) => {
  const url = req.url;
  if (url === '/') {
    res.setHeader('Content-Type', 'text/html');
    res.write('<html>');
    res.write(
      `<body><form action="/create-user" method="POST"><input type="text" name="username"><button type="submit">Send</button></form>`
    );

    if (username) {
      res.write(`<p>Username: ${username}</p>`);
    }
    
    res.write('</body></html>');
    return res.end();
  }
  if (url === '/users') {
    res.setHeader('Content-Type', 'text/html');
    res.write('<html>');
    res.write('<body><ul><li>User 1</li><li>User 2</li></ul></body>');
    res.write('</html>');
    return res.end();
  }
  if (url === '/create-user') {
    const body = [];
    req.on('data', chunk => {
      body.push(chunk);
    });
    req.on('end', () => {
      const parsedBody = Buffer.concat(body).toString();
      username = parsedBody.split('=')[1];
      console.log(username);
      res.statusCode = 302;
      res.setHeader('Location', '/');
      res.end();
    });
  }
});

server.listen(3000, () => {
  console.log('Server is running on port 3000');
});
