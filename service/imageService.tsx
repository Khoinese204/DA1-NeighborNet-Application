import { supabase } from '../lib/supabase';

const uploadImageToSupabase = async (localUri: string) => {
  try {
    console.log('Local URI:', localUri);
    
    // Fetch file and convert to ArrayBuffer
    const response = await fetch(localUri);
    const arrayBuffer = await response.arrayBuffer(); // Lấy ArrayBuffer thay vì Blob

    const fileName = localUri.split('/').pop(); 

    console.log('File name', fileName); // 8f877894-03cf-4a24-b3a6-52521b0b6b09.png
    
    // Tải ảnh lên Supabase storage dưới dạng ArrayBuffer
    const { data, error } = await supabase.storage
      .from('images') // Tên bucket
      .upload(`post-images/${fileName}`, arrayBuffer, {
        contentType: 'image/jpg', // Đảm bảo rằng contentType phù hợp
      });

    if (error) throw error;

    if (data?.path) {
      // Lấy URL công khai của ảnh
      const { data: publicUrlData } = supabase.storage.from('images').getPublicUrl(data.path);
      console.log("Public URL:", publicUrlData.publicUrl);
      return publicUrlData.publicUrl; // Trả về URL công khai
    } else {
      throw new Error('Upload thành công nhưng không nhận được đường dẫn file.');
    }
  } catch (error) {
    console.error('Error uploading image:', error);
    return null; // Trả về null nếu có lỗi
  }
};

export default uploadImageToSupabase;