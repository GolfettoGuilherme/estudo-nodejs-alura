class LivroDao{

    constructor(db) {
        this._db = db;
    }

    adiciona(livro){
        return new Promise((resolve, reject) => {
            this._db.run(`
                INSERT INTO livros (
                    titulo,
                    preco,
                    descricao
                ) VALUES (?,?,?)
            `,[
                livro.titulo,
                livro.preco,
                livro.descricao
            ],function (err) {
                if(err){
                    console.log(err);
                    return reject("não foi possivel adicionar");
                }

                resolve();
            })
        });
    }

    lista(){
        //promise do ECMAScript 6
        return new Promise((resolve, reject) => {
            this._db.all("SELECT * FROM livros", (erro, resultados) => {
                    if(erro) 
                        return reject("não foi possivel lista");

                    return resolve(resultados);
                }
            )
        });
    }
}

module.exports = LivroDao;