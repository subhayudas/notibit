import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { supabase } from '@/lib/supabase';
import { toast } from 'sonner';
import { useAuth } from '@/contexts/AuthContext';
import { subjects, institutions } from '@/lib/constants';
import Select from 'react-select';

const UploadNote: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [subject, setSubject] = useState<{ value: string; label: string } | null>(null);
  const [institution, setInstitution] = useState<{ value: string; label: string } | null>(null);

  const subjectOptions = subjects.map(sub => ({ value: sub, label: sub }));
  const institutionOptions = institutions.map(inst => ({ value: inst, label: inst }));

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      
      // Validate file type
      if (selectedFile.type !== 'application/pdf') {
        toast.error('Please upload a PDF file');
        return;
      }

      // Validate file size (50MB limit)
      if (selectedFile.size > 50 * 1024 * 1024) {
        toast.error('File size must be less than 50MB');
        return;
      }

      setFile(selectedFile);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!file) {
      toast.error('Please select a file');
      return;
    }

    if (!user) {
      toast.error('Please sign in to upload notes');
      navigate('/sign-in');
      return;
    }

    if (!title.trim()) {
      toast.error('Please enter a title');
      return;
    }

    if (!subject) {
      toast.error('Please select a subject');
      return;
    }

    if (!institution) {
      toast.error('Please select an institution');
      return;
    }

    setLoading(true);

    try {
      // Generate unique file name
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random().toString(36).substring(2)}_${Date.now()}.${fileExt}`;
      const filePath = `${user.id}/${fileName}`;

      // Upload to Supabase Storage
      const { error: uploadError } = await supabase.storage
        .from('pdf-storage')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false,
          contentType: 'application/pdf'
        });

      if (uploadError) {
        throw new Error(`Upload failed: ${uploadError.message}`);
      }

      // Get the public URL
      const { data: { publicUrl } } = supabase.storage
        .from('pdf-storage')
        .getPublicUrl(filePath);

      // Save note metadata to database
      const { error: dbError } = await supabase.from('notes').insert({
        title: title.trim(),
        description: description.trim(),
        file_url: publicUrl,
        file_path: filePath,
        user_id: user.id,
        created_at: new Date().toISOString(),
        subject: subject.value,
        institution: institution.value
      });

      if (dbError) {
        // If database insert fails, delete the uploaded file
        await supabase.storage
          .from('pdf-storage')
          .remove([filePath]);
        
        throw new Error(`Database error: ${dbError.message}`);
      }

      toast.success('Note uploaded successfully!');
      navigate('/library');
    } catch (error) {
      console.error('Upload error:', error);
      const message = error instanceof Error ? error.message : 'Error uploading note';
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center justify-center mb-6">
          <Upload className="h-8 w-8 text-green-600" />
        </div>
        <h2 className="text-2xl font-bold text-center mb-8">Upload Note</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">
              Title
            </label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
              required
              maxLength={100}
            />
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
              maxLength={500}
            />
          </div>

          <div>
            <label htmlFor="subject" className="block text-sm font-medium text-gray-700">
              Subject
            </label>
            <Select
              id="subject"
              value={subject}
              onChange={(option) => setSubject(option)}
              options={subjectOptions}
              className="mt-1"
              placeholder="Search or select a subject"
              isClearable
              required
            />
          </div>

          <div>
            <label htmlFor="institution" className="block text-sm font-medium text-gray-700">
              Institution
            </label>
            <Select
              id="institution"
              value={institution}
              onChange={(option) => setInstitution(option)}
              options={institutionOptions}
              className="mt-1"
              placeholder="Search or select an institution"
              isClearable
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              PDF File
            </label>
            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
              <div className="space-y-1 text-center">
                <Upload className="mx-auto h-12 w-12 text-gray-400" />
                <div className="flex text-sm text-gray-600">
                  <label htmlFor="file-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-green-600 hover:text-green-500">
                    <span>Upload a file</span>
                    <input
                      id="file-upload"
                      name="file-upload"
                      type="file"
                      accept=".pdf"
                      className="sr-only"
                      onChange={handleFileChange}
                      required
                    />
                  </label>
                  <p className="pl-1">or drag and drop</p>
                </div>
                <p className="text-xs text-gray-500">PDF up to 50MB</p>
                {file && (
                  <p className="text-sm text-gray-500 break-all">{file.name}</p>
                )}
              </div>
            </div>
          </div>

          <Button 
            type="submit" 
            className="w-full" 
            isLoading={loading}
            disabled={loading || !file}
          >
            {loading ? 'Uploading...' : 'Upload Note'}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default UploadNote;