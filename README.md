<h1 align="center"> LabeImage - backend </h1>

# Descrição do Projeto
<p> API Rest para a aplicação LabeImage </p>

# Tecnologias utilizadas
<h2 align="center">
    <a href="https://devcenter.heroku.com/articles/heroku-cli">Heroku -</a>
    <a href="https://expressjs.com/">Express -</a>
    <a href="https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS">Cors -</a>
    <a href="https://jestjs.io/"> Jest -</a>
    <a href="https://knexjs.org/"> Knex -</a>
    <a href="https://www.npmjs.com/package/dotenv"> Dotenv -</a>
    <a href="https://www.npmjs.com/package/jsonwebtoken"> JsonWebToken -</a>
    <a href="https://www.npmjs.com/package/bcrypt"> BcryptJs -</a>
    <a href="https://www.npmjs.com/package/uuid"> Uuid </a>
</h2>

# Endpoints
  ## User
<ul> 
   <li>Login: o usuário deve passar um email e uma senha já cadastrada para  realizar o login</li>
   <li>SignUp: passando um nome, nickname, email e senha, o usuário realiza seu cadastro</li>
   <li>GetUserById: retorna um usuário com um id específico</li>
</ul>

## Imagens
<ul> 
   <li>GetALlImages: esse endpoint retorna todas as imagens cadastradas no banco de dados</li>
   <li>GetImageById: retorna uma imagem com um id específico</li>
   <li>CreateImage: cria uma imagem, quando recebe como input o título, arquivo, as tags e a coleção da imagem a ser postada</li>
</ul>

# FrontEnd

<a> https://github.com/joaovitorcostaa/frontend-primeiro-projeto-fullstack </a>
