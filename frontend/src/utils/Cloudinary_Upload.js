const {cloudinary_upload_preset} = require('./config');
const {cloud_name} = require('./config');

const uploadImgToCloudinary = async(file)=>{
    const uploadData=new FormData();

    uploadData.append("file", file);
    uploadData.append("upload_preset", cloudinary_upload_preset);
    uploadData.append("cloud_name", cloud_name);

    const res=await fetch(
        `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`,
        {
            method: "post",
            body: uploadData
        }
    );

    const data=await res.json();
    return data;
}

export default uploadImgToCloudinary;