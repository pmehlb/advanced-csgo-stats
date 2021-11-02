function upload() {
    let files = $("input#upload-input");

    if (files.length > 0) {
        // create a FormData obj to be sent
        let formData = new FormData();

        // add all files to FormData obj
        for (let file of files) {
            formData.append("uploads[]", file, file.name);
        }

        // AJAX post request to upload
        $.ajax({
            url: "/api/upload",
            type: "POST",
            data: formData,
            processData: false,
            contentType: false,
            success: function(data) {
                // upload successful!
            },
            xhr: function() {
                let xhr = new XMLHttpRequest();
                // hook into "progress" event
                xhr.upload.addEventListener("progress", function(event) {
                    if (event.lengthComputable) {
                        // calculate the files' current uploaded percentage
                        let percentComplete = event.loaded / event.total;
                        percentComplete = Math.round(percentComplete * 100);

                        // update the progress bar's percentage here
                        if (percentComplete >= 100) {
                            // put the progress bar to DONE
                        }
                    }
                }, false);
                return xhr;
            }
        });
    } else {

    }
}