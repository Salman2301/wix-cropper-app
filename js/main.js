// $(function () {

    const $image = $('#image');
    const $imageCropped = $('#img-cropped');
    const $uploadBtn = $('#upload-btn');
    const $cropBtn =  $('#crop-btn');

    let imageHeight = 520;
    let imageWidth = 240;

    cropperInit();

    function cropperInit() {
        $image.cropper({
        aspectRatio: 5 / 7,
        crop: function(event) {
                canvas = $image.cropper("getCroppedCanvas", {
                    fillColor: "#fff",
                    maxWidth:700
                });        
            }
        });
    }

    function cropperDestory() {
        $image.cropper("destroy"); 
    }

    $cropBtn.click(function(e){
        $("#img-cropped").empty();
        $imageCropped.append(canvas);
    });

    $uploadBtn.click(function(e) {
        // let canvasData = canvas.toDataURL();
        let ctx = canvas.getContext('2d');;
        var imageData = ctx.getImageData(0,0,imageWidth, imageHeight);
        var buffer = imageData.data.buffer;  
        console.log("uploading...");
        sendData({imageData: buffer})
    });


    function sendData(data) {
        let msg = {
            "isCropper" : true,
        }
        msg = {...msg, data};
        console.log("message : " , msg);
        window.parent.postMessage(msg, "*");
    }

    function updateCropperImage(url) {
        $image.attr("src" , url);
        cropperDestory();
        cropperInit();
    }

    window.onmessage = e => {
        let {data} = e;
        if(data.toUpdateImageURL) {
            let url = data.updateImageURL;
            updateCropperImage(url);
        }
    }
// });