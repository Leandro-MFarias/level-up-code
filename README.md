# 📘 Duolingo-Projeto - Documentação do Frontend

Este documento descreve todo o funcionamento do **frontend**, incluindo páginas do **Aluno** e do **Professor**, fluxo de navegação, progressão dos exercícios e funcionalidades já integradas ao backend.

---

## 🚀 Tecnologias e Dependências

O projeto utiliza:

- **React 19**
- **React Router v7**
- **React Hook Form + Zod** → formulários e validações
- **TailwindCSS**
- **Zustand** → estado global simples
- **React Icons**
- **Vite**
- **tw-animate-css** → animações

---

## 📍 Rotas da Aplicação

### 🔹 **Rotas do Aluno**

| Rota         | Componente       | Descrição |
|--------------|------------------|-----------|
| `/`          | `HomePage`       | Jornada de aprendizado + progressão linear. |
| `/login`     | `LoginPage`      | Autenticação. |
| `/register`  | `RegisterPage`   | Cadastro. |
| `/profile`   | `ProfilePage`    | Perfil do usuário com edição de foto e dados. |
| `/exercises` | `ExercisesPage`  | Página dos exercícios do grupo atual. |

---

### 🔹 **Rotas do Professor**

| Rota | Componente | Descrição |
|------|------------|-----------|
| `/professor` | `ProfessorHomePage` | Dashboard geral. |
| `/professor/lists` | `ExerciseListManagerPage` | Gerenciar listas de exercícios. |
| `/professor/lists/new` | `CreateExerciseListPage` | Criar nova lista. |
| `/professor/groups/new` | `CreateExerciseGroupPage` | Criar novo grupo (3 exercícios). |
| `/professor/exercises/new` | `CreateExercisePage` | Criar exercícios individualmente. |
| `/professor/users` | `UsersListPage` | Ver todos os alunos. |
| `/professor/users/:id` | `UserProgressPage` | Ver detalhes do progresso de um usuário. |

Todas já funcionando e integradas com o backend.

---

## 🧭 Estrutura de Navegação

### 🔹 NavBar (Aluno)
Aparece em todas as páginas exceto: Login, Registro e Exercícios.

- Jornada → `/`
- Perfil → `/profile`
- Sair → Logout

Gerenciada por Zustand (`useNavPage`).

---

### 🔹 Sidebar (Professor)
Exibe:

- Criar listas  
- Criar grupos  
- Criar exercícios  
- Usuários  
- Dashboard  

---

## 📝 Detalhes das Páginas

### 🔐 LoginPage (`/login`)
- E-mail  
- Senha  
- Lembre-me  
- Validação com Zod  
- Autenticação integrada ao backend  

---

### 🆕 RegisterPage (`/register`)
Cadastro com:

- Nome completo  
- E-mail  
- Senha  
- Confirmar Senha  

---

## 🏠 HomePage / Jornada (`/`)
Mostra a **progressão linear do usuário**:

- **Verde** → grupo concluído  
- **Roxo** → grupo atual (com botão **START**)  
- **Cinza** → bloqueado  

Ao clicar em um grupo desbloqueado → `/exercises`.

---

## 📚 ExercisesPage (`/exercises`)

Fluxo:

1. Usuário responde exercício.  
2. Se acertar → próximo.    
3. Próximo exercício é desbloqueado.  
4. Interface mostra:
   - Exercícios concluídos  
   - Exercício atual  
   - Bloqueados (com cor correspondente)

Status puxados do backend.

---

## 👤 ProfilePage (`/profile`)
- Trocar foto  
- Editar dados  
- Exibir estatísticas:
  - Total de exercícios concluídos  
  - Progresso atual  

---

# 📚 Funcionalidades do Professor

## 🎓 Dashboard do Professor
Mostra:

---

## 📝 Criar Listas (`/professor/lists/new`)
Professor cria uma lista com:

- Título  
- Descrição  

---

## 🧠 Criar Exercícios (`/professor/exercises/new`)
- Tipos:
  - múltipla escolha  
  - verdadeiro/falso  
  - preencher espaço  
- Define opções  
- Define resposta correta
- Qual Lista

---

## 👥 Ver Usuários (`/professor/users`)
- Lista todos os alunos  
- Abre progresso individual:
  - Exercício concluídos  
  - Exercício atual  
  - Exercícios respondidos  
  - Acertos e erros  

---

# 🔄 Fluxo do Usuário

1. Login  
2. Jornada → vê progresso  
3. Faz exercícios  
4. Avança para próximos grupos   
6. Edita perfil  
7. Logout  

---

# 🔄 Fluxo do Professor

1. Login  
2. Dashboard  
3. Criar listas  
4. Criar grupos  
5. Criar exercícios  
6. Acompanhar progresso dos alunos  

---

# 🗄️ Integração com Backend

Frontend já está integrado ao backend em:

- Login e registro  
- Atualização de perfil   
- Progresso completo dos exercícios  
- Criação de listas, grupos e exercícios  
- Dashboard do Professor  
- Progressão linear
- Resposta e feedback 
