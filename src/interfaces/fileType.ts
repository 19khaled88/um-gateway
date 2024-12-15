import {UploadApiResponse} from 'cloudinary'
export type IUploadFile = {
    fieldname:string,
    originalname:string,
    encoding:string,
    mimetype:string,
    destination:string,
    filename:string,
    path:string,
    size:number
}

export type ICloudinaryResponse = {
    asset_id: string;
    public_id: string;
    version: number;
    version_id: string;
    signature: string;
    width: number;
    height: number;
    format: string;
    resource_type: string;
    created_at: string; // ISO 8601 format date string
    tags: string[]; // Array of tags (empty in this case)
    bytes: number; // Size in bytes
    type: string; // Type of upload (e.g., 'upload')
    etag: string; // Entity tag for cache validation
    placeholder: boolean; // Indicates if it's a placeholder
    url: string; // URL to access the asset
    secure_url: string; // Secure URL to access the asset
    folder: string; // Folder path (empty in this case)
    access_mode: string; // Access mode (e.g., 'public')
    original_filename: string; // Original filename without extension
    original_extension: string; // Original file extension
    api_key: string; // API key used for the upload
  }

  // Transformation function
export const transformToICloudinaryResponse=(result: UploadApiResponse): ICloudinaryResponse => {
    return {
        asset_id: result.asset_id,
        public_id: result.public_id,
        version: result.version,
        version_id: result.version_id,
        signature: result.signature,
        width: result.width,
        height: result.height,
        format: result.format,
        resource_type: result.resource_type,
        created_at: result.created_at,
        tags: result.tags || [], // Ensure tags is an array
        bytes: result.bytes,
        type: result.type,
        etag: result.etag,
        placeholder: result.placeholder || false, // Defaulting if undefined
        url: result.url,
        secure_url: result.secure_url,
        folder: result.folder || '', // Defaulting if undefined
        access_mode: result.access_mode || 'public', // Defaulting if undefined
        original_filename: result.original_filename || '', // Defaulting if undefined
        original_extension: result.original_extension || '', // Defaulting if undefined
        api_key: process.env.CLOUDINARY_API_KEY || '', // Ensure this is set appropriately
    };
}