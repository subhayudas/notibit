import { useState } from 'react';
import { supabase } from '@/lib/supabase';

export function useFileUpload() {
  const [uploading, setUploading] = useState(false);

  const uploadFile = async (file: File) => {
    try {
      setUploading(true);
      
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError, data } = await supabase.storage
        .from('notes')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('notes')
        .getPublicUrl(filePath);

      return publicUrl;
    } finally {
      setUploading(false);
    }
  };

  return { uploadFile, uploading };
}