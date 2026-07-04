-- Durcissement : les fonctions SECURITY DEFINER ne doivent pas être exposées via /rest/v1/rpc
-- Les fonctions trigger ne sont jamais appelées directement par un rôle API.
revoke execute on function public.handle_new_user() from public, anon, authenticated;
revoke execute on function public.sync_alpha_status() from public, anon, authenticated;

-- is_alpha_tester() est utilisée dans les policies RLS : le rôle authenticated
-- doit garder EXECUTE (les policies s'exécutent avec les droits de l'appelant).
revoke execute on function public.is_alpha_tester() from public, anon;
grant execute on function public.is_alpha_tester() to authenticated;
