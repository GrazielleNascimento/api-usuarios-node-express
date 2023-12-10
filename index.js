/* "módulo", estamos nos referindo aos arquivos ou bibliotecas externas que são importados no código para fornecer funcionalidades específicas. 
*/

// Importação do módulo Express
const express = require('express') // defino que a aplicacao sera usada com express

//O body-parser é um middleware para o Express que facilita o processamento do corpo das requisições HTTP. Ele é usado aqui para fazer o parse de dados no formato JSON.
const bodyParser = require('body-parser')// faz um parse da requisicao q vmos receber

//// Importação do módulo que contém as rotas relacionadas aos usuários
const userRoute = require('./routes/userRoute.js') 

const app = express() // estou dizendo que vou criar o app pelo express
const port= 3000

//app.use(bodyParser.urlencoded({extended: false }))

// Configurando o body-parser para interpretar dados JSON
app.use(bodyParser.json());

userRoute(app) //passando como injecao de dependencia

app.get('/', (rec,res) => res.send('Olá mundo pelo express'))

app.listen(port, () => {
 console.log("API rodando na porta 3000")
})

