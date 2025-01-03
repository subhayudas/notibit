import React from 'react';
import { FileText, Download, Calendar } from 'lucide-react';
import { Note } from '@/types/note';

interface NoteCardProps {
  note: Note;
}

export const NoteCard: React.FC<NoteCardProps> = ({ note }) => {
  const formattedDate = new Date(note.created_at).toLocaleDateString();

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between">
        <div className="flex items-center space-x-3">
          <FileText className="h-6 w-6 text-green-600" />
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{note.title}</h3>
            <p className="text-sm text-gray-500 mt-1">{note.description}</p>
          </div>
        </div>
        <a
          href={note.file_url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center text-sm text-green-600 hover:text-green-700"
        >
          <Download className="h-4 w-4 mr-1" />
          Download
        </a>
      </div>
      <div className="flex items-center mt-4 text-sm text-gray-500">
        <Calendar className="h-4 w-4 mr-1" />
        {formattedDate}
      </div>
    </div>
  );
};