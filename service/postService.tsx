import { supabase } from '../lib/supabase';

export const insertPost = async (
  id: number, // userID là INT
  service: number, // serviceID là INT
  content: string,
  image: string | null, // Đường dẫn hình ảnh (TEXT)
  //video: string | null, // Đường dẫn video (TEXT)
  //scope: string // Phạm vi bài viết (TEXT, ví dụ: 'Public', 'Private')
) => {
  const { data, error } = await supabase
    .from('posts')
    .insert([
      {
        id,
        service,
        content,
        image,
        //video,
        //scope,
        //commentCount: 0, // Mặc định là 0
        //reaction: {}, // Mặc định là đối tượng JSON rỗng
        created_at: new Date().toISOString(), // Dùng định dạng ISO
      },
    ]);

  if (error) {
    throw new Error(error.message); // Quản lý lỗi
  }

  return data;
};
