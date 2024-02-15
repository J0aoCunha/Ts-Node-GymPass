# App GymPass

## RF (requisitos funcionais)

- [x] deve ser possivel o usuario se cadastrar
- [x] deve ser possivel se autenticar
- [ ] deve ser possivel obter o perfil de um usuario logado
- [ ] deve ser possivel obter o numero de check-ins pelo usuario logado
- [ ] deve ser possivel o usuario obter o seu historico de check-ins
- [ ] deve ser possivel o usuario buscar academias proximas
- [ ] deve ser possivel o usuario buscar  academias pelo nome
- [ ] deve ser possivel o usuario realizar check-in em uma academia
- [ ] deve ser possivel validar o check-in de um usuario
- [ ] deve ser possivel cadastrar uma academia

## RNs (regras de negocio)

- [x] o usuario nao deve poder se cadastrar com um email duplicado
- [ ] o usuario nao pode fazer dois check-ins no mesmo dia
- [ ] o usuario nao pode fazer check-in se nao tiver perto (100m) da academia
- [ ] o check-in so poder ser validado ate 20 minutos apos ser criado
- [ ] o check-in so poder ser validado por admins
- [ ] a academia so pode ser cadastrada por admins

## RNFs (requisitos nao funcionais)

- [x] A senha do usuario precisa esta cryptografada
- [x] os dados da aplicacao precisao esta persistidos em um banco PostgreSql
- [ ] todas as listas de dados precisam estar paginadas com 20 itens por pagina
- [ ] o usuario precisa esta identificado por um JWT
