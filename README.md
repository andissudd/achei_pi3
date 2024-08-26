# Portfólio de Artista
Um portfólio online para exposição de trabalhos de um artista.

## Membros da equipe
Francisco Anderson Silva Lima, 538917, Design Digital
Letícia Maciel Silva, 535833, Design Digital

## O que vai ser
- Plataforma de Portfólio/Galeria digitais de um artista.

## Domínio da aplicação
- Site de exposição de trabalhos artísticos

## Papeis ou tipos de usuário da aplicação

- Usuário não registrado
- Usuário registrado
- Administrador
- Entidades ou tabelas do sistema
- Usuário
- Trabalhos
- Comentário
- Curtida
- Salvar

## Entidades ou tabelas do sistema
- Administrador
- Usuários
- Trabalho
- Comentários

## Principais funcionalidades da aplicação
**Sobre os usuários comuns**
- Usuário não registrado poderá ver os trabalhos e os comentários feitos por usuários registrados.
- Usuário registrado pode ver os trabalhos e os comentários de outros usuários. Adicionalmente, eles podem escrever comentários, curtir e salvar os trabalhos favoritos.
- Os usuários não registrados e registrados podem acessar os trabalhos no modo de visualização geral (todos os trabalhos), filtrar por datas, filtrar por categorias (tipos de mídias utilizadas).


**Sobre o administrador**
-  administrador (artista) da galeria pode adicionar, remover e editar os seus trabalhos, assim como apagar comentários.

**Sobre os trabalhos**
- O trabalho terá atribuições de curtidas,  e comentários categorizados dos mais recentes aos mais antigos.
- Os trabalhos podem ser imagens, vídeos, tabelas, visualizações 3D.


**Sobre as interações**
- O comentário poderá ser apagado pelo administrador e usuário registrado que fez o comentário.
- As curtidas podem ser dadas por usuários registrados e visualizadas por todos.
- Salvos serão vistos apenas pelo usuário e o administrador poderá ver somente a quantidade de salvos.

## Tecnologias e frameworks utilizados
**Frontend:**
- VueJS v3.0, Vue-Router e Pinia.
- Axios.
- Bootstrap

**Backend:**
- NodeJs
- Express
- ThreeJS.

## Operações implementadas para cada entidade da aplicação


| Entidade | Criação (C) | Leitura (R) | Atualização (U) | Remoção (D) |
| ------------- | ------------- | ------------- | ------------- | ------------- |
| Usuário  |  |  |  |  |
| Trabalho artistisco | X  | X  | X  | X  |
| Comentário | X  | X  | X  | X  |
| Salvar | X  | X  |   | X  |
| Curtidas | X  | X  |   | X  |



## Rotas da API REST utilizadas
|Método HTTP | URL |
| ------------- | ------------- |
| POST  | /auth/local |
| GET | /users/me |
| GET | /api/artworks |
| GET | /api/artworks/{id} |
| POST | /api/artworks |
| PUT | /api/artworks/{id} |
| PUT | /api/artworks/{id} |

