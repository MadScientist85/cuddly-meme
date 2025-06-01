-- Enable the pg_embedding extension for vector operations
CREATE EXTENSION IF NOT EXISTS vector;

-- Create the reference_materials table (if not exists)
CREATE TABLE IF NOT EXISTS public.reference_materials (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  type text,
  content text,
  tags text[]
);

-- Create the document_chunks table for RAG
CREATE TABLE IF NOT EXISTS public.document_chunks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  document_id text NOT NULL,
  chunk_id int NOT NULL,
  content text NOT NULL,
  embedding vector(1536) NOT NULL, -- Use 1536 for OpenAI text-embedding-3-small
  created_at timestamp with time zone DEFAULT now()
);

-- Create an index for faster similarity search
CREATE INDEX IF NOT EXISTS document_chunks_embedding_idx 
ON public.document_chunks 
USING hnsw (embedding vector_cosine_ops);

-- Create the match_document_chunks function for similarity search
CREATE OR REPLACE FUNCTION match_document_chunks (
  query_embedding vector(1536),
  match_count int DEFAULT NULL,
  min_similarity float DEFAULT 0.75
)
RETURNS TABLE (
  id uuid,
  document_id text,
  chunk_id int,
  content text,
  similarity float
)
LANGUAGE plpgsql
AS $$
#variable_conflict use_column
BEGIN
  RETURN QUERY
  SELECT
    id,
    document_id,
    chunk_id,
    content,
    1 - (embedding <=> query_embedding) as similarity
  FROM public.document_chunks
  WHERE 1 - (embedding <=> query_embedding) > min_similarity
  ORDER BY similarity DESC
  LIMIT match_count;
END;
$$;

-- Insert some sample reference materials
INSERT INTO public.reference_materials (type, content, tags) VALUES
('statute', 'Oklahoma Survivors Act (SB1835) - 22 O.S. §§ 1090.1-1090.5 provides relief for survivors of domestic violence...', ARRAY['statutory', 'sb1835', 'ok_laws']),
('constitutional', 'Fourteenth Amendment Due Process Clause requires fair procedures before government action...', ARRAY['constitutional', 'due_process']),
('case_law', 'Mathews v. Eldridge established the framework for procedural due process analysis...', ARRAY['constitutional', 'due_process', 'hearing_request'])
ON CONFLICT DO NOTHING;
