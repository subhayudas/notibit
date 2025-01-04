import React from 'react';
import { FileText, Download, Calendar } from 'lucide-react';
import { Note } from '@/types/note';

interface NoteCardProps {
  note: Note;
}

export const NoteCard: React.FC<NoteCardProps> = ({ note }) => {
  const formattedDate = new Date(note.created_at).toLocaleDateString();

  return (
    <div className="bg-white rounded-lg shadow-sm p-4 hover:shadow-md transition-all hover:scale-[1.02] border border-gray-100">
      <div className="flex items-start gap-3">
        <FileText className="h-5 w-5 text-green-600 flex-shrink-0 mt-1" />
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <h3 className="text-base font-medium text-gray-900 truncate">{note.title}</h3>
            <a
              href={note.file_url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center text-xs text-green-600 hover:text-green-700 flex-shrink-0"
            >
              <Download className="h-3 w-3 mr-1" />
              Download
            </a>
          </div>
          
          <p className="text-xs text-gray-500 mt-1 line-clamp-2">{note.description}</p>
          
          <div className="flex items-center mt-3 text-xs text-gray-500">
            <Calendar className="h-3 w-3 mr-1" />
            {formattedDate}
          </div>

          <div className="flex flex-wrap gap-1.5 mt-2">
            {note.subject && (
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium bg-blue-50 text-blue-700">
                {note.subject}
              </span>
            )}
            {note.institution && (
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium bg-green-50 text-green-700">
                {note.institution}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};