import wixData from 'wix-data';

$w.onReady(async function () {
    $w('#startUploadButton').onClick(() => {
        if ($w("#uploadImage").value.length > 0) {
            $w("#uploadText").text = "Uploading " + $w("#uploadImage").value[0].name;
            $w("#uploadImage").uploadFiles()
                .then((uploadedFiles) => {
                    $w("#uploadText").text = "Upload successful";
                    $w("#image").src = uploadedFiles[0].fileUrl;
                })
                .catch((uploadError) => {
                    $w("#uploadText").text = "File upload error";
                    console.log("File upload error: " + uploadError.errorCode);
                    console.log(uploadError.errorDescription);
                });
        } else {
            $w("#uploadText").text = "Please choose a file to upload.";
        }
    })
    let newPost = {
        userId: "c58d9ecb-6aa4-4b39-a0b8-5c14cc342794",
        image: $w('#image').src
    }
    await wixData.insert('posts', newPost)
        .then(res => { console.log('succes add') })
        .catch(err => (console.log(err)))
});