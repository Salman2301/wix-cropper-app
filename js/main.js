// $(function () {

    const $image = $('#image');
    const $imageCropped = $('#img-cropped');
    const $uploadBtn = $('#upload-btn');
    const $cropBtn =  $('#crop-btn');

    //default setting
    let imageHeight = 520;
    let imageWidth = 240;
    let aspectRatio = 5 / 7;
    let fillColor = "#fff";

    cropperInit();

    function cropperInit() {
        $image.cropper({
        aspectRatio: aspectRatio,
        crop: function(event) {
                canvas = $image.cropper("getCroppedCanvas", {
                    fillColor: fillColor,
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
        const base64 = canvas.toDataURL();
        const ctx = canvas.getContext('2d');
        const imageData = ctx.getImageData(0,0,imageWidth, imageHeight);
        const buffer = imageData.data.buffer;  
        // console.log("uploading...");
        // console.log({canvasData, buffer, imageData});
         // sending both base64 and buffer we can only send one type
        sendData({buffer, base64});
    });


    function sendData(data) {
        let msg = {
            "isCropper" : true,
        }
        msg = {...msg, ...data};
        console.log("message : " , msg);
        window.parent.postMessage(msg, "*");
    }

    function updateCropperImage(url) {
        $image.attr("src" , url);
        refreshCropper();
    }

    function refreshCropper() {
        cropperDestory();
        cropperInit();
    }

    window.onmessage = e => {
        let {data} = e;
        if(data.toUpdateImageURL) {
            let url = data.updateImageURL;
            updateCropperImage(url);
        }  else if(data.initSetting) {
            let {aspectRatio:asptRatio , fillColor: backgroundColor,
                imageHeight:imgH, imageWidth:imgW, noAspectRatio} = data.setting;
            if(asptRatio) aspectRatio = asptRatio;
            if(backgroundColor) fillColor = backgroundColor;
            if(noAspectRatio) aspectRatio = NaN;
            if(imgH) imageHeight = imgH;
            if(imgW) imageWidth = imgW;
            refreshCropper();
        }
    }

    sendData({ready: true});
// });