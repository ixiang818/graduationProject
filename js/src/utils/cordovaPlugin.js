function cameraTakePicture() {
   navigator.camera.getPicture(onSuccess, onFail, {
      quality: 50,
      destinationType: Camera.DestinationType.DATA_URL
   });

   function onSuccess(imageData) {
      var image = document.getElementById('myImage');
      image.src = "data:image/jpeg;base64," + imageData;
   }

   function onFail(message) {
      alert('Failed because: ' + message);
   }
}


function albumGetPicture() {
   navigator.camera.getPicture(onSuccess, onFail, {
      quality: 50,
      destinationType: Camera.DestinationType.DATA_URL,
      sourceType:Camera.PictureSourceType.SAVEDPHOTOALBUM
   });

   function onSuccess(imageData) {
      var image = document.getElementById('myImage');
      image.src = "data:image/jpeg;base64," + imageData;
   }

   function onFail(message) {
      alert('Failed because: ' + message);
   }
}

function getPicture(options){
   navigator.imagePicker.getPictures(options)
}


export {
   cameraTakePicture,
   albumGetPicture,
}