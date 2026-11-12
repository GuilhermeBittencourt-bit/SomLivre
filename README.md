# SomLivre – Plataforma de Streaming de Música (simulação)

Projeto da disciplina **Teste de Software I – UNIVILLE (2026-2)**.

Simulação de um aplicativo de streaming de música: cadastro, login, catálogo e busca de músicas.
Todos os artistas, álbuns e músicas são fictícios e não há arquivos de áudio reais.

**Versão atual:** v0.1

## O que a v0.1 já faz

- Cadastro de usuário com nome, e-mail, senha e confirmação de senha (RF01)
- Login e logout, com a sessão salva no navegador (RF02)
- Busca de músicas por título, artista ou álbum, sem diferenciar maiúsculas nem acentos (RF03)
- Barra do player só com o visual, mostrando a música clicada (RF04, parcial)
- E-mail único por usuário (RN01)
- Senha com no mínimo 8 caracteres, letras e números (RN02)
- Senhas guardadas com hash SHA-256 (RNF02)
- Layout responsivo: a sidebar some no celular (RNF03)
- 18 testes unitários com Vitest

## Como rodar

Pré-requisito: [Node.js](https://nodejs.org) 20 ou superior.

```bash
npm install        # instala as dependências (só na primeira vez)
npm run dev        # abre o site em http://localhost:5173
npm test           # roda os testes unitários
npm run coverage   # roda os testes e mostra a cobertura
```

## Tecnologias

- React + Vite (JavaScript)
- Vitest e @vitest/coverage-v8 (testes e cobertura)
- localStorage (persistência, sem back-end)
- CSS puro

## Estrutura

```
src/
  logic/        regras de negócio (funções puras, testáveis)
  data/         catálogo fictício e acesso ao localStorage
  components/   partes visuais (Sidebar, Header, PlayerBar, CardMusica)
  pages/        telas (Login, Cadastro, Home)
tests/unit/     testes Vitest
```

## Equipe

- Guilherme Alves Bittencourt
- Lucas da Rosa Meireles

## Próximos passos (Aula 04)

- RF04 – Reprodução simulada: tocar, pausar, avançar e voltar (barra de progresso com timer)
- RF05 – Criar, renomear e excluir playlists
- RF06 – Adicionar e remover músicas de uma playlist
- RF07 – Curtir músicas ("Músicas Curtidas")
- RF08 – Histórico de reprodução recente
- RF09 – Administrador cadastra artistas, álbuns e músicas
- RF10 – Volume e modo aleatório/repetir
- RN03 a RN06 – Regras de playlists e de administrador
- Testes unitários de `auth.js`, para atingir a meta de 60% de cobertura (RNF05)
