import { supabase } from '../lib/supabase';
import uploadImageToSupabase from './imageService'
import { formatDistanceToNow, parseISO, format } from 'date-fns';
import { isThisYear } from 'date-fns';


export const insertPost = async (
  userID: number, // userID là INT
  serviceID: number | null, // serviceID là INT
  content: string,
  imageUrl: string | null, // Đường dẫn hình ảnh (TEXT)
  object: string,
  
  //video: string | null, // Đường dẫn video (TEXT)
  //scope: string // Phạm vi bài viết (TEXT, ví dụ: 'Public', 'Private')
) => { 
  var image = imageUrl;
  if (imageUrl !== null) {
    image = await uploadImageToSupabase(imageUrl); 
  }
  const { data, error } = await supabase
    .from('posts')
    .insert([
      {
        userID,
        serviceID,
        content,
        image,
        object,
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




export const getPostsForNewFeeds = async (): Promise<any[]> => {
  const { data, error } = await supabase
    .from('posts')
    .select(`
      id,
      content,
      created_at,
      likeCount,
      commentCount,
      shareCount,
      image,
      object,
      userID,
      user(
        name,
        clusterid,
        cluster (name)
      ),
      serviceID,
      service(
        name
      ),
      isDelete, 
      isFeature,
      isModerate
    `)
    .eq('object', 'Mọi người')
    .eq('isDelete', false)
    .order('created_at', { ascending: false });

  if (error) {
    throw new Error(error.message); // Quản lý lỗi
  }

  const posts = data.map((post: any) => ({
    ...post,
    timeAgo: getTimeAgo(post.created_at),
  }));

  return posts
};



const getTimeAgo = (createdAt: string) => {
  const timeAgo = formatDistanceToNow(createdAt, { addSuffix: true });
  if (timeAgo.includes('less than a minute')) {
    return 'Vừa xong';
  }
  if (timeAgo.includes('minute')) {
    const splitArray = timeAgo.split(' ');
    const minute = splitArray[splitArray.length - 3];
    return `${minute}p`; 
  }
  

  if (timeAgo.includes('hour')) {
    const splitArray = timeAgo.split(' ');
    const hour = splitArray[splitArray.length - 3];
    return `${hour}h`; 
  }


  if (timeAgo.includes('day')) {
    const splitArray = timeAgo.split(' ');
    const day = splitArray[splitArray.length - 3];
    return `${day}d`; 
  }

  if (timeAgo.includes('month')) {
    const splitArray = timeAgo.split(' ');
    const month = splitArray[splitArray.length - 3];
    return `${month}m`; 
  }

  if (timeAgo.includes('year')) {
    const splitArray = timeAgo.split(' ');
    const year = splitArray[splitArray.length - 3];
    return `${year}y`; 
  }

};

export const updatePost = async (
  postId: number, 
  serviceID: number | null, // serviceID là INT
  content: string,
  imageUrl: string | null, // Đường dẫn hình ảnh (TEXT)
  object: string,) => {
    try {
      // Thực hiện cập nhật bài viết
      const { data, error } = await supabase
        .from('posts') // Tên bảng trong Supabase
        .update({
          serviceID: serviceID, // Cột service_id
          content: content,      // Cột content
          image: imageUrl,   // Cột image_url
          object: object         // Cột object
        })
        .eq('id', postId); // Điều kiện cập nhật
  
      if (error) {
        throw error;
      }
      return data;
    } catch (error) {
      throw error;
    }
}

export const removePost = async (
  postId: number, 
) => {
  try {
    // Thực hiện cập nhật bài viết
    const { data, error } = await supabase
      .from('posts') // Tên bảng trong Supabase
      .update({
        isDelete: true
      })
      .eq('id', postId); // Điều kiện cập nhật

    if (error) {
      throw error;
    }
    return data;
  } catch (error) {
    throw error;
  }
}


