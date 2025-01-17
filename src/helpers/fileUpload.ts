import { v2 as cloudinary } from 'cloudinary';
import multer from 'multer';
import * as fs from 'fs';
import { ICloudinaryResponse, IUploadFile, transformToICloudinaryResponse } from '../interfaces/fileType';

// (async function() {

//     // Configuration
//     cloudinary.config({ 
//         cloud_name: 'be-fresh-ltd', 
//         api_key: '128215362951182', 
//         api_secret: 'WbNw7UjHKSAm3axm7bJCCnAhSr8', // Click 'View API Keys' above to copy your API secret
//     });
    
//     // Upload an image
//      const uploadResult = await cloudinary.uploader
//        .upload(
//            'https://res.cloudinary.com/demo/image/upload/getting-started/shoes.jpg', {
//                public_id: 'shoes',
//            }
//        )
//        .catch((error) => {
//            console.log(error);
//        });
    
//     console.log(uploadResult);
    
//     // Optimize delivery by resizing and applying auto-format and auto-quality
//     const optimizeUrl = cloudinary.url('shoes', {
//         fetch_format: 'auto',
//         quality: 'auto'
//     });
    
//     console.log(optimizeUrl);
    
//     // Transform the image: auto-crop to square aspect_ratio
//     const autoCropUrl = cloudinary.url('shoes', {
//         crop: 'auto',
//         gravity: 'auto',
//         width: 500,
//         height: 500,
//     });
    
//     console.log(autoCropUrl);    
// })();


 // Configuration
cloudinary.config({ 
    cloud_name: 'be-fresh-ltd', 
    api_key: '128215362951182', 
    api_secret: 'WbNw7UjHKSAm3axm7bJCCnAhSr8', // Click 'View API Keys' above to copy your API secret
});

// upload by multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null,'uploads/')
    },
    filename: function(req,file, cb){
        cb(null,file.originalname)
    }
})

const upload = multer({storage:storage})

//Upload an image
const uploadToCludinary = async(file:IUploadFile):Promise<ICloudinaryResponse>=>{
    // const uploadResult = await cloudinary.uploader
    // .upload(
    //     'https://res.cloudinary.com/demo/image/upload/getting-started/shoes.jpg', {
    //         public_id: 'shoes',
    //     }
    // )
    // .catch((error) => {
    //     console.log(error);
    // });
    

    return new Promise((resolve,reject)=>{
        cloudinary.uploader.upload(
                file.path, {
                    public_id: file.originalname,
                },
                (error,result) =>{
                    fs.unlinkSync(file.path);
                    if(error){
                        reject(error)
                    }else if(result) {
                        const response = transformToICloudinaryResponse(result)
                        resolve(response)
                    }else {
                        reject(new Error('Uploas result is undefined'))
                    }
                }
            )
    })
}


const deleteFromCloudinary = async (public_ids: string | string[], type: 'single' | 'multiple'): Promise<void> => {
    return new Promise((resolve, reject) => {
        try {
            if (type === 'single') {
                // Ensure public_ids is a string for single deletion
                if (typeof public_ids !== 'string') {
                    return reject(new Error('For single deletion, public_ids must be a string.'));
                }

                // For single file delete
                cloudinary.uploader.destroy(public_ids, (error, result) => {
                    if (error) {
                        return reject(error); // Reject the promise on error
                    }
                    
                    resolve(result); // Resolve the promise with the result
                });
            } else if (type === 'multiple') {
                // Ensure public_ids is an array for multiple deletion
                if (!Array.isArray(public_ids)) {
                    return reject(new Error('For multiple deletion, public_ids must be an array of strings.'));
                }

                // For multiple file delete
                cloudinary.api.delete_resources(public_ids, (error, result) => {
                    if (error) {
                        return reject(error); // Reject the promise on error
                    }
                    
                    resolve(result); // Resolve the promise with the result
                });
            } else {
                return reject(new Error('Invalid type specified. Use "single" or "multiple".'));
            }
        } catch (err) {
            reject(err); // Catch any synchronous errors and reject the promise
        }
    });
};



export const FileUploadCloudinary = {
    uploadToCludinary,
    deleteFromCloudinary,
    upload
}