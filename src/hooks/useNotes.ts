import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Note } from '@/types/note';
import { toast } from 'sonner';

export function useNotes() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchNotes = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('notes')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setNotes(data || []);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to fetch notes';
      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  return { notes, loading, error, refetch: fetchNotes };
}