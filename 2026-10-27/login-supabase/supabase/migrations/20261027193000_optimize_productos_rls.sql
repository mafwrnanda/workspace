drop policy if exists "Los usuarios pueden ver sus propios productos" on public.productos;
drop policy if exists "Los usuarios pueden crear sus propios productos" on public.productos;
drop policy if exists "Los usuarios pueden editar sus propios productos" on public.productos;
drop policy if exists "Los usuarios pueden eliminar sus propios productos" on public.productos;

create policy "Los usuarios pueden ver sus propios productos"
on public.productos for select
to authenticated
using ((select auth.uid()) = user_id);

create policy "Los usuarios pueden crear sus propios productos"
on public.productos for insert
to authenticated
with check ((select auth.uid()) = user_id);

create policy "Los usuarios pueden editar sus propios productos"
on public.productos for update
to authenticated
using ((select auth.uid()) = user_id)
with check ((select auth.uid()) = user_id);

create policy "Los usuarios pueden eliminar sus propios productos"
on public.productos for delete
to authenticated
using ((select auth.uid()) = user_id);
