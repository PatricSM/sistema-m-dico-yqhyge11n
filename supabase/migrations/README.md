# Migrations do Supabase

Pasta de versionamento das migrations de banco deste projeto.

## Projeto Supabase
- **Nome:** medico
- **Ref:** `pybiltmkoleozmxvimkn`
- **URL:** https://pybiltmkoleozmxvimkn.supabase.co
- **Região:** sa-east-1

## Convenção
- Um arquivo `.sql` por migration, nomeado `AAAAMMDDHHMMSS_descricao.sql`
  (timestamp UTC + descrição em snake_case). Ex.: `20260604_180000_init_schema.sql`.
- Cada arquivo contém apenas o SQL "para frente" (idempotente quando possível:
  `create table if not exists`, etc.).
- A ordem de aplicação é a ordem alfabética/cronológica do nome.

## Fluxo
1. Escrever o `.sql` aqui (versionamento no Git/Skip).
2. **Aplicar no Supabase** projeto `medico` (`pybiltmkoleozmxvimkn`) — é onde o schema
   de fato vive. A aplicação registra no histórico de migrations do Supabase.
3. **Regenerar os tipos** em `src/lib/supabase/types.ts` para o frontend ficar tipado.

> O "aplicar" sempre acontece contra o projeto Supabase, não contra o Skip.
> Esta pasta é só o histórico versionado das migrations.
