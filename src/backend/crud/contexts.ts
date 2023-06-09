import type { SupabaseClient } from '@supabase/supabase-js';
import type { Response } from '@backend/Types';
import type { Context } from 'src/Types';

export const createContext = (supabase: SupabaseClient, project_id: string, name?: string): Response<Context> =>
  supabase
    .from('contexts')
    .insert({
      name, project_id
    })
    .select()
    .single()
    .then(({ error, data }) => 
      ({ error, data: data as Context }));

export const getContext = (supabase: SupabaseClient, contextId: string): Response<Context> => 
  supabase
    .from('contexts')
    .select()
    .eq('id', contextId)
    .single()
    .then(({ error, data}) => ({ error, data: data as Context }));

export const getContextsForProject = (supabase: SupabaseClient, project_id: string): Response<Context[]> => 
  supabase
    .from('contexts')
    .select(`
      id,
      project_id,
      created_at,  
      created_by,
      updated_at,
      updated_by,  
      name
    `)
    .eq('project_id', project_id)
    .then(({ error, data }) => ({ error, data: data as Context[] }));

export const deleteContext = (supabase: SupabaseClient, id: string) => 
  supabase
    .from('contexts')
    .delete()
    .match({ id })
    .select();

    