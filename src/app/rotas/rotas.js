const LivroDao = require("../infra/livro-dao");
const db = require("../../config/database");

module.exports = (app) => {

    app.get("/", function(req, resp){
        resp.send(`
            <html>
                <head>
                    <meta charset="utf-8">
                </head>
                <body>
                    <h1> Casa do Código </h1>
                </body> 
            </html>
        `);
    }); //vai ser executado sempre que o cliente ficar request nessa rota

    app.get("/livros", function(req, resp){

        const livroDao = new LivroDao(db);

        livroDao.lista().then(livros => {
            resp.marko(
                require("../views/livros/lista/lista.marko"),
                {
                    livros: livros
                }
            );
        }).catch(erro => {console.log(erro);});

    }); 

    app.get("/livros/form", function(req, resp){
        resp.marko(
            require("../views/livros/form/form.marko"), { livro: {}}
        );
    });

    app.post("/livros",function(req,resp){

        const livroDao = new LivroDao(db);

        livroDao.adiciona(req.body)
            .then(resp.redirect("/livros"))
            .catch(erro => {console.log(erro);});
    });

    app.put("/livro", function(req,resp){

        const livroDao = new LivroDao(db);

        livroDao.editar(req.body)
            .then(resp.redirect("/livros"))
            .catch(erro => console.log(erro));
    });

    //: parametro
    app.delete("/livros/:id", function(req,resp){
        const livroDao = new LivroDao(db);

        livroDao.remove(req.params.id)
            .then(() => resp.status(200).end()) //retornando 200
            .catch(erro => console.log(erro));
    });

    app.get("/livros/form/:id", function(req, resp){
        const livroDao = new LivroDao(db);

        livroDao.buscarPorId(req.params.id)
            .then(livro => {
                resp.marko(
                    require("../views/livros/form/form.marko"),{ livro }
                );
            })
            .catch(erro => console.log(erro));
    })
};