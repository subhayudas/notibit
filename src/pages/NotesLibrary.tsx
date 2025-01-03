import React, { useState, useMemo } from 'react';
import { useNotes } from '@/hooks/useNotes';
import { NoteCard } from '@/components/NoteCard';
import { SearchBar } from '@/components/SearchBar';
import { Button } from '@/components/ui/Button';
import { Upload } from 'lucide-react';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';

const NotesLibrary: React.FC = () => {
  const { notes, loading, error } = useNotes();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredNotes = useMemo(() => {
    return notes.filter(note =>
      note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.subject?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.institution?.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [notes, searchQuery]);

  if (error) {
    toast.error('Failed to load notes');
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Notes Library</h1>
        <Link to="/upload">
          <Button>
            <Upload className="h-4 w-4 mr-2" />
            Upload
          </Button>
        </Link>
      </div>

      <SearchBar value={searchQuery} onChange={setSearchQuery} />

      {loading ? (
        <div className="mt-8 space-y-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-32 bg-gray-100 rounded-lg animate-pulse" />
          ))}
        </div>
      ) : (
        <div className="mt-8 space-y-4">
          {filteredNotes.length > 0 ? (
            filteredNotes.map(note => (
              <NoteCard key={note.id} note={note} />
            ))
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500">No notes found</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default NotesLibrary;