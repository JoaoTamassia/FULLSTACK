# Dog CEO — Projeto 1 (Programação Web Fullstack)

SPA em React que consome a API pública **Dog CEO** para buscar uma foto aleatória por raça.

## O que a proposta pede (ES47B / Projeto 1)

Conforme o documento da disciplina, o trabalho consiste em desenvolver o **frontend** de uma aplicação web:

- **SPA** (uma página HTML, sem trocar de rota para atualizar a interface).
- **Consumo de uma API JSON aberta**, com busca enviando **parâmetros** para o servidor.
- **Validação de campos obrigatórios** e **mensagens de erro** antes do envio e após a resposta da API.
- **Context API** (ou Redux) para estado/compartilhamento entre componentes.
- **Um recurso React à escolha** entre outros (ex.: `useReducer`, `useMemo`, …).
- **Uma biblioteca externa** compatível com React (ex.: react-hook-form).
- Estrutura com pastas `src/components` e `src/contexts`, ferramenta de build acordada (**Vite**).

Critérios adicionais da avaliação incluem **pacote de deploy em servidor web**, **histórico Git** e uso de **API aprovada pelo professor** (sem repetir API entre grupos).

## O que foi implementado com a Dog CEO

| Objetivo da proposta | Implementação |
|---------------------|----------------|
| API JSON + parâmetros na busca | `GET https://dog.ceo/api/breed/{raça}/images/random` — a raça vai no caminho da URL (slug em inglês; sub-raças como `terrier/yorkshire`). |
| Lista / domínio das raças | `GET https://dog.ceo/api/breeds/list/all` — montagem da lista usada nas sugestões do campo (datalist). |
| Context API | `DogProvider` / `useDogContext` centralizam estado da busca e da lista de raças. |
| `useReducer` | Reducer único para imagem (loading / sucesso / erro) e para carregar raças (`BREEDS_*`). |
| Biblioteca externa | **react-hook-form** no formulário da raça. |
| Validação e erros | Regras no formulário; mensagens da API e de rede tratadas no contexto e exibidas na interface. |

## Tecnologias

React 19, Vite, react-hook-form, PropTypes.

## Como rodar

```bash
npm install
npm run dev
```

Build de produção: `npm run build` (saída em `dist/`).
