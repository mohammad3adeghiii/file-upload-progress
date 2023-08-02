let fileInput = document.querySelector("#image-upload");
let forms = document.querySelector("form");
let progressArea = document.querySelector(".progress-area");

fileInput.addEventListener("change", (e) => {
    const files = e.target.files[0];
    let fileName = files.name;
    if(fileName.length >= 12) {
        let splitName = fileName.split('.');
        fileName = splitName[0].substring(0,12) + "..." + splitName[1];
    }
    uploadFile(fileName);
});

function uploadFile(name) {
    const xhr = new XMLHttpRequest();

    xhr.open("POST", "index.php");

    xhr.upload.addEventListener("progress", ({total,loaded}) => {
        let loadedFile = Math.floor((loaded/total)*100);
        let totalFile = Math.floor(total * 1000);

        progressArea.innerHTML = ""

        let fileSize; 
        (totalFile < 1024) ? fileSize = totalFile + "KB" : fileSize = (loaded / (1024 * 1024)).toFixed(2) + "MB";
        
        if (loadedFile == 100) {
            let uploadProgress = `<div class="progress-complate progress">
                                <div class="file-icons">
                                    <i class="fa fa-file"></i>
                                </div>
                                <div class="file-info">
                                    <div class="details">
                                        <h3>${name}</h3>
                                        <span>${fileSize}</span>
                                    </div>
                                </div>
                                <div class="progress-counter">
                                    <i class="fa fa-check"></i>
                                </div>
                            </div>`
            
            progressArea.innerHTML = uploadProgress;
        } else {
            let complateProgress = `<div class="progress-upload progress">
            <div class="file-icons">
                                        <i class="fa fa-file"></i>
                                        </div>
                                    <div class="file-info">
                                    <div class="details">
                                    <div class="top-section">
                                    <h3>${name}</h3>
                                    <p>${fileSize}</p>
                                    </div>
                                    <div class="bottom-section">
                                    <div class="progress-back">
                                    <div class="progress-front" style="width=${loadedFile}%"></div>
                                    </div>
                                    </div>
                                    </div>
                                    </div>
                                    <div class="progress-counter">
                                        <span class="count-percent">${loadedFile}%</span>
                                        </div>
                                        </div>`
                                        
            progressArea.innerHTML = complateProgress;
        }
        
    });
    const formData = new FormData(forms);
    xhr.send(formData);

}