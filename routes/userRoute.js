
//IMPORTACAO  DO MODULO FS
const fs = require('fs')// lida com file system arquivos de sistema, FORNECE FUNCIONALIDADES Ao Sistema de arquivos


/*A desestruturação é uma maneira de extrair valores de objetos ou arrays em variáveis separadas.
*/ 
//DESESTRUTURAÇÃO DO JOIN  Esta linha está usando a desestruturação para extrair a função join do objeto 
const { join} = require('path') //está apenas extraindo a função join do módulo path para que você possa usá-la diretamente sem a necessidade de escrever fs.join

//caminho do arquivo
const filePath = join(__dirname, 'users.json') //nome do arq q tera os usuarios
/*Depois de desestruturar, você pode usar a função join diretamente como uma variável local.
Neste caso, join é usado para concatenar o caminho do diretório (__dirname) com o nome do arquivo (users.json), criando assim o caminho completo do arquivo.
*/

//metodos para buscar e salvar os usuarios

//para pegar / consultar os usuarios no bd
const getUsers = () => {       //filePath é o caminho onde esta o user.json
    const data = fs.existsSync(filePath)//verifica se o arquivo existe
    ? fs.readFileSync(filePath)  //se o arquivo existir a gente vai ler o arq
    : [] // se nao existir retorna um obj vazio

//para tratar erros
    try{
        return JSON.parse(data)// convertendo STRING(data) json em um obj javascript
    }catch (error){
        return []//se houver algum problema retorna um vazio
    }
}

//para salvar usuario  //a funcao ira receber usuarios      //escrever no arq
const saveUser = (users) => fs.writeFileSync(filePath, JSON.stringify(users, null, '\t'))
                                             //path -- caminho do arq
/* essa linha de código cria uma função chamada saveUser que aceita um array de usuários, converte esse array para uma string JSON formatada e, em seguida, escreve essa string JSON no arquivo especificado. Isso é útil para salvar dados de usuários em um formato persistente em um arquivo no sistema de arquivos.
*/

const userRoute = (app) => {//app como dependencia
 app.route('/users/:id?')// CRIACAO DA ROTA essa rota cuida de tds requisiçoes get, post, put, delete
    .get((req,res) => {//criando metodo http get
        const users = getUsers()// Obtém os usuários chamando a função getUsers

        res.send({ users })// retorna os usuarios como resposta à requisição. Os usuários são enviados como um objeto JSON.
    })
    .post((req, res) => { // Este trecho define o que acontecerá quando houver uma requisição HTTP POST para a rota /users/:id?.
        const users = getUsers()// Obtém os usuários chamando a função getUsers.

        users.push(req.body)//: Adiciona o corpo da requisição (presumivelmente um novo usuário) ao array de usuários.
        saveUser(users)//: Salva o array atualizado de usuários chamando a função saveUser.

        res.status(201).send('OK')//Retorna um status HTTP 201 (Created) como resposta à requisição POST e envia a mensagem 'OK'.

    })
    
}

module.exports = userRoute