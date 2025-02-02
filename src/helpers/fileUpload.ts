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
    return new Promise((resolve,reject)=>{
        if(!file){
            reject(new Error('No file provided'))
        }

        
        cloudinary.uploader.upload(
            file.path, 
            { ublic_id: file.originalname },
            ( error, result ) =>{
                
                try {
                    fs.unlinkSync(file.path);
                } catch (unlinkError) {
                    console.error(`Failed to delete file: ${file.path}`, unlinkError);
                }

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


const deleteFromCloudinary = async (
    public_ids: string | string[],
    type: 'single' | 'multiple'
): Promise<{ result: string }> => {
    return new Promise((resolve, reject) => {
        const sanitizePublicId = (id: string): string => {

            const parts = id.split('/');
            const fileNameWithExtension = parts[parts.length - 1]; // "m2kakulr0id0lgfxs64k.png"

            // Split by dot to remove the extension
            const publicId = fileNameWithExtension.split('.')[0]; // "m2kakulr0id0lgfxs64k"
            return publicId
        };

        
        try {
            if (type === 'single') {
                if (typeof public_ids !== 'string' || !public_ids.trim()) {
                    return reject(new Error('For single deletion, public_ids must be a non-empty string.'));
                }

                const sanitizedId = sanitizePublicId(public_ids);

                cloudinary.uploader.destroy(sanitizedId, (error, result) => {
                   
                    if (error) {
                        return reject(error);
                    }
                    if (result.result === 'not found') {
                        console.warn(`Resource with public_id "${public_ids}" not found in Cloudinary.`);
                    }
                    resolve(result);
                });
            } else if (type === 'multiple') {
                if (!Array.isArray(public_ids) || public_ids.length === 0) {
                    return reject(new Error('For multiple deletion, public_ids must be a non-empty array of strings.'));
                }

                const sanitizedIds = public_ids.map(sanitizePublicId)

                cloudinary.api.delete_resources(sanitizedIds, (error, result) => {
                    
                    if (error) {
                        return reject(error);
                    }
                    if (result.deleted) {
                        for (const [id, status] of Object.entries(result.deleted)) {
                            if (status === 'not_found') {
                                console.warn(`Resource with public_id "${id}" not found in Cloudinary.`);
                            }
                        }
                    }
                    resolve(result);
                });
            } else {
                return reject(new Error('Invalid type specified. Use "single" or "multiple".'));
            }
        } catch (err) {
            reject(err);
        }
    });
};


const unSyncFile = async(file:IUploadFile):Promise<any> =>{
    try {
       await fs.promises.unlink(file.path);
    } catch (unlinkError) {
        console.error(`Failed to delete file: ${file.path}`, unlinkError);
    }
}

const checkResourceExists = async (publicId: string): Promise<boolean> => {
    return new Promise((resolve) => {
        const sanitizePublicId = (id: string): string => {
            const sanitaized = id.replace(/\.[^/.]+$/, ''); //  remove file extension
            console.log(sanitaized)
            return sanitaized
        };
        const sanitizedId = sanitizePublicId(publicId);
        cloudinary.api.resource(sanitizedId, (error, result) => {
            if (error && error.http_code === 404) {
                resolve(false); // Resource not found
            }
            else if (error) {
                console.error('Error checking resource:', error);
                resolve(false); // Handle other errors as needed
            } else {
                resolve(true); // Resource exists
            }
        });
    });
};


export const FileUploadCloudinary = {
    uploadToCludinary,
    deleteFromCloudinary,
    upload,
    unSyncFile,
    checkResourceExists
}