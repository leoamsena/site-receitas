# Tudo Delicioso
Site de receitas criado para disciplina de programação web.

# Codificação

O back-end da aplicação foi desenvolvido em Node.js, mais especficamente em express. 
O front-end da aplicação foi desenolvido em Vue.js.

# Pré-requisitos
Para executar os códigos é importante que os seguintes pré-requisitos estejam instalados na máquina:
* MongoDB rodando na porta 27017
* Node.js

# Execução do código fonte
Para executar o código do back-end os comandos abaixo devem ser digitados no terminal. O servidor deve inicar na porta 3000. 

```
cd back
npm i
npm start
```
Em ambiente Linux é possível substituir o terceiro comando pela linha abaixo, com o intuito de ver mensagens de debug no terminal.

```
DEBUG=back:* npm start
```


Para executar o código do front-end os seguintes comandos devem ser digitados no terminal:

```
cd front
npm i
npm run serve
```

# Testes

Para realizar testes no back:
```
cd front
npm run teste
```

Para realizar testes no front:
```
cd front
npm run test:unit
npm run test:e2e
```