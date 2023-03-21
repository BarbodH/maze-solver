import * as http from "node:http";
import * as path from "node:path";
import * as fileSystem from "node:fs";

const PORT = 8000;

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
  let filePath = "." + request.url;
  if (filePath == "./") filePath = "./index.html";
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
