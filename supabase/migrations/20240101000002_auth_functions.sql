-- Function to handle user registration
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.users (id, full_name, avatar_url)
  VALUES (
    NEW.id,
    NEW.raw_user_meta_data->>'full_name',
    NEW.raw_user_meta_data->>'avatar_url'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger for new user registration
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Function to share a chat
CREATE OR REPLACE FUNCTION public.share_chat(chat_uuid UUID)
RETURNS TABLE(share_token TEXT) AS $$
DECLARE
  token TEXT;
BEGIN
  -- Generate a unique share token
  token := encode(gen_random_bytes(16), 'base64');
  
  -- Insert or update the shared chat record
  INSERT INTO public.shared_chats (chat_id, share_token, expires_at)
  VALUES (chat_uuid, token, NOW() + INTERVAL '30 days')
  ON CONFLICT (chat_id) 
  DO UPDATE SET 
    share_token = EXCLUDED.share_token,
    expires_at = EXCLUDED.expires_at;
  
  RETURN QUERY SELECT token;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to get shared chat data
CREATE OR REPLACE FUNCTION public.get_shared_chat(token TEXT)
RETURNS TABLE(
  id UUID,
  title TEXT,
  messages JSONB
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    c.id,
    c.title,
    COALESCE(
      jsonb_agg(
        jsonb_build_object(
          'id', m.id,
          'role', m.role,
          'content', m.content,
          'created_at', m.created_at
        ) ORDER BY m.created_at
      ) FILTER (WHERE m.id IS NOT NULL),
      '[]'::jsonb
    ) as messages
  FROM public.chats c
  INNER JOIN public.shared_chats sc ON c.id = sc.chat_id
  LEFT JOIN public.messages m ON c.id = m.chat_id
  WHERE sc.share_token = token
    AND (sc.expires_at IS NULL OR sc.expires_at > NOW())
  GROUP BY c.id, c.title;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to increment template usage count
CREATE OR REPLACE FUNCTION public.increment_template_usage(template_uuid UUID)
RETURNS VOID AS $$
BEGIN
  UPDATE public.templates
  SET usage_count = usage_count + 1
  WHERE id = template_uuid;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to get template average rating
CREATE OR REPLACE FUNCTION public.get_template_rating(template_uuid UUID)
RETURNS TABLE(
  average_rating DECIMAL,
  total_ratings INTEGER
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    COALESCE(AVG(rating), 0)::DECIMAL as average_rating,
    COUNT(*)::INTEGER as total_ratings
  FROM public.template_ratings
  WHERE template_id = template_uuid;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to search templates
CREATE OR REPLACE FUNCTION public.search_templates(
  search_query TEXT,
  category_filter legal_category DEFAULT NULL,
  is_public_only BOOLEAN DEFAULT TRUE
)
RETURNS TABLE(
  id UUID,
  title TEXT,
  description TEXT,
  category legal_category,
  tags TEXT[],
  is_public BOOLEAN,
  usage_count INTEGER,
  created_at TIMESTAMP WITH TIME ZONE,
  average_rating DECIMAL,
  total_ratings INTEGER
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    t.id,
    t.title,
    t.description,
    t.category,
    t.tags,
    t.is_public,
    t.usage_count,
    t.created_at,
    COALESCE(AVG(tr.rating), 0)::DECIMAL as average_rating,
    COUNT(tr.rating)::INTEGER as total_ratings
  FROM public.templates t
  LEFT JOIN public.template_ratings tr ON t.id = tr.template_id
  WHERE 
    (NOT is_public_only OR t.is_public = TRUE)
    AND (category_filter IS NULL OR t.category = category_filter)
    AND (
      search_query IS NULL 
      OR search_query = ''
      OR t.title ILIKE '%' || search_query || '%'
      OR t.description ILIKE '%' || search_query || '%'
      OR EXISTS (
        SELECT 1 FROM unnest(t.tags) as tag 
        WHERE tag ILIKE '%' || search_query || '%'
      )
    )
  GROUP BY t.id, t.title, t.description, t.category, t.tags, t.is_public, t.usage_count, t.created_at
  ORDER BY t.usage_count DESC, t.created_at DESC;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
