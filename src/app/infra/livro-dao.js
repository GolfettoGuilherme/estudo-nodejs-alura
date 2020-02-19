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

    editar(livro){
        return new Promise((resolve, reject) => {
            this._db.run(`
                UPDATE livros SET 
                    titulo = ?,
                    preco = ?,
                    descricao = ?
                WHERE id = ?
            `,[
                livro.titulo,
                livro.preco,
                livro.descricao,
                livro.id
            ], err => {
                if(err){
                    console.log(err);
                    return reject("não foi possivel editar");
                }

                resolve();
            });
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

    buscarPorId(id){
        return new Promise((resolve, reject) => {
            this._db.get("SELECT * FROM livros WHERE id = ?", [id],
                (erro, livro) => {
                    if(erro)
                        return reject(erro);

                    return resolve(livro);
                }
            );
        });
    }

    remove(id){
        return new Promise((resolve, reject) => {
            this._db.get("DELETE FROM livros WHERE id = ?", [id],
                (erro, livro) => {
                    if(erro)
                        return reject(erro);

                    return resolve();
                }
            );
        });
    }
}

module.exports = LivroDao;