import * as http from "node:http";
import * as path from "node:path";
import * as fileSystem from "node:fs";

// allow user to specify port number within terminal (optional); default port is 8000
let arg;
if (process.argv.length > 3) {
  console.log("Error: too many command-line arguments! (max = 1)");
  process.exit();
} else if (process.argv.length == 3) {
  arg = Number(process.argv[2]);
  if (!Number.isInteger(arg)) {
    console.log("Error: command-line argument (port #) must be an integer!");
    process.exit();
  } else if (arg < 0 || arg > 65535) {
    console.log("Error: command-line argument (port #) must be within an appropriate range! [0, 65535]");
    process.exit();
  }
} else {
  arg = 8000;
}
const PORT = arg;

// media types (Multipurpose Internet Mail Extensions)
const MIME_TYPES = {
  default: "application/octet-stream",
  html: "text/html; charset=UTF-8",
  css: "text/css",
  js: "application/javascript",
  ico: "image/x-icon",
};

const server = http.createServer((request, response) => {
  // find file path & extension to indicate an appropriate content type
  let filePath = "";
  if (request.url === "/") filePath = "./src/html/index.html";
  else filePath = `./src${request.url}`;

  let extname = path.extname(filePath).substring(1); // omit '.' extension prefix
  try {
    response.writeHead(200, { "Content-Type": MIME_TYPES[extname] });
  } catch (error) {
    response.writeHead(200, { "Content-Type": MIME_TYPES["default"] });
    console.log(`${extname} is not defined in MIME_TYPES!`);
  }

  fileSystem.readFile(filePath, function(error, data) {
    if (error) {
      response.writeHead(404);
      response.write("Error: file not found");
    } else response.write(data);
    response.end();
  });
});

server.listen(PORT, (error) => {
  if (error) console.log("Something went wrong", error);
  else console.log(`Server running at http://127.0.0.1:${PORT}/`);
});
