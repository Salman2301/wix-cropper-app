# wix-cropper-app
Cropper js to work with wix site using corvid

Demo [https://salman2301.github.io/wix-cropper-app/](https://salman2301.github.io/wix-cropper-app/)

how to embed in wix site
1. Add "Embed html" in wix page
2. add this url https://salman2301.github.io/wix-cropper-app/
3. Communicate with the app using window message method
    wix code document [link](https://www.wix.com/corvid/reference/$w.HtmlComponent.html) 

<hr>

## Post message allowed methods

### 1. to initialize setting of the cropper

send a message to the HTML with any or all the default setting. 

```js
let msg = {
    initSetting: true, // required, to change the app setting
    fillColor: "#000", // background color outside the image region
    imageHeight: 520, // output image height
    imageWidth : 240, // output image width
    aspectRatio : 5/7 // aspect ratio of the crop
    noAspectRatio: false // allow no aspect ratio
}
window.postmessage(msg);
```
This will be the default setting of the app
```js
{
    fillColor: "#000",
    imageHeight: 520,
    imageWidth : 240,
    aspectRatio : 5/7,
    noAspectRatio: false
}
```
### 2. to update Image URL
send the message to HTML if it's embed in wix site.
```js
let msg = {
    toUpdateImageURL: true, // requre to change the image
    updateImageURL: "<image URL here>" // require image URL
}
window.postmessage(msg);
```

<hr>

## On message

On message event trigger when the app is ready to or when the upload button is clicked, it will send the cropper image in Array buffer data type

on ready below message will be sent to parent component, in our case it's the wix site.
```js
    {
        isCropper: true, // default
        ready: true 
    }
```

when the image is uploaded, below message with the cropped image in Array buffer will be sent
```js
    {
        isCropper: true,// default
        imageData: ["<image buffer>"]
    }
```

### Note
App is still in developing stage 


### Credit

https://github.com/fengyuanchen/jquery-cropper