import { decode } from 'base64-arraybuffer';
import * as FileSystem from 'expo-file-system'
import { supabase } from '../lib/supabase';
import { supabaseUrl } from '../constants';


export const getUserImageSrc = (imagePath: any) => {
    if(imagePath){
        return getSupabaseFileUrl(imagePath);
    }else{
        return require('../assets/images/defaultUser.png');
    }
}

export const getSupabaseFileUrl = (filePath: any) => {
    if(filePath){
        return{uri: `${supabaseUrl}/storage/v1/object/public/uploads/${filePath}`}
    }
    return null;
}

export const downloadFile = async (url: string)=>{
    try{
        const {uri} = await FileSystem.downloadAsync(url, getLocalFilePath(url));
        return uri;
    }catch(error){
        return null;
    }
}

export const getLocalFilePath = (filePath: string) =>{
    let fileName = filePath.split('/').pop();
    return `${FileSystem.documentDirectory}${fileName}`;
}

export const uploadFile = async(folderName: any, fileUri: string, isImage=true ) =>{
    try {
        let fileName = getFilePath(folderName, isImage);
        const fileBase64 = await FileSystem.readAsStringAsync(fileUri,{
            encoding: FileSystem.EncodingType.Base64
        });
        let imageData = decode(fileBase64);
        let {data, error} = await supabase
        .storage
        .from('uploads')
        .upload(fileName, imageData, {
            cacheControl: '3600',
            upsert: false,
            contentType: isImage? 'image/*': 'video/*'
        });
        if(error){
            console.log('file upload error: ', error);
            return {success: false, msg:'Could not upload media'};
        }

        return{success: true, data: data.path}
    }catch(error){
        console.log('file upload error: ', error)
        return {success: false, msg: 'Could not upload media'};
    }
}

export const getFilePath = (folderName: any, isImage: boolean) =>{
    return `/${folderName}/${(new Date()).getTime()}${isImage? '.png':'.mp4'}`;
}