const formidable = require("formidable");
const path = require("path");

export function uploadDemo(req, res, next) {
    let form = new formidable.IncomingForm();
    // allow user to upload multiple files per request
    form.multiples = true;
    // store uploads in /uploads dir
    form.uploadDir = path.join(__dirname, "/uploads");
    // when an upload finished, rename the temp name to the original file name
    form.on("file", (field, file) => {
        fs.rename(file.path, path.join(form.uploadDir, file.name));
    });
    // report any upload errors
    form.on("error", (err) => {
        console.log(`An error occurred:\n${err}`);
    });
    // once all the files have been uploaded, send a successful response to the client
    form.on("end", () => { res.end("success"); })
    form.parse(req);
}

export function deleteDemo(req, res, next) {

}