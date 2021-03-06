import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { Guid } from 'guid-typescript';

@Injectable({
    providedIn: 'root'
})
export class DatabaseService {

    constructor(
        private sqlite: SQLite
    ) { }

    public getDatabase() {
        return this.sqlite.create({
            name: 'oficina.db',
            location: 'default'
        });
    }

    private async createTables(db: SQLiteObject): Promise<boolean> {
        try {
            await db.sqlBatch([['CREATE TABLE IF NOT EXISTS clientes (clienteid TEXT primary key NOT NULL, ' +
                'nome TEXT NOT NULL, email TEXT NOT NULL, telefone TEXT NOT NULL, renda REAL NOT NULL, ' +
                'nascimento DATE NOT NULL)'],
            ['CREATE TABLE IF NOT EXISTS ordensdeservico (ordemdeservicoid TEXT primary key NOT NULL, ' +
                'clienteid TEXT NOT NULL, veiculo TEXT NOT NULL, dataehoraentrada DATETIME NOT NULL, ' +
                'dataehoratermino DATETIME, dataehoraentrega DATETIME, ' +
                'FOREIGN KEY (clienteid) REFERENCES clientes (clienteid) ON DELETE CASCADE ON UPDATE NO ACTION)']])
                .then(() => {
                    console.log('Criação de tabelas realizada com sucesso');
                    return true;
                });
        } catch (e) {
            console.error('Erro na criação das tabelas', e);
            return false;
        }
    }

    private async populateDatabase(db: SQLiteObject): Promise<boolean> {
        const clienteID = Guid.create().toString();

        try {
            await db.executeSql('select COUNT(ordemdeservicoid) as qtdeOS from ordensdeservico', [])
                .then(async (data) => {
                    if (data.rows.item(0).qtdeOS === 0) {
                        try {
                            const ordemDeServicoID = Guid.create().toString();

                            await db.sqlBatch([
                                ['insert into clientes ' +
                                    '(clienteid, nome, email, telefone, renda, nascimento) values ' +
                                    '(?, "Asbrusio", "asbrusio@cc.com", "999", 123.45, CURRENT_DATE)',
                                [clienteID]
                                ],
                                ['insert into ordensdeservico ' +
                                    '(ordemdeservicoid, clienteid, veiculo, dataehoraentrada) values(?, ?, ?, CURRENT_TIMESTAMP)',
                                [ordemDeServicoID, clienteID, 'ABC-1235']]
                            ])
                                .then(() => {
                                    console.log('Base de dados populada com sucesso');
                                    return true;
                                });
                        } catch (e) {
                            console.error('Falha ao popular base de dados',
                                e);
                            return false;
                        }
                    }
                });
        } catch (e) {
            console.error('Erro ao consultar a quantidade de registros já inseridos', e);
            return false;
        }
    }

    public async createDatabase(): Promise<boolean> {
        try {
            await this.getDatabase()
                .then(async (db: SQLiteObject) => {
                    await this.createTables(db)
                        .then(async () => await this.populateDatabase(db))
                        .then(() => true);
                });
        } catch (e) {
            console.error('Erro na criação da base de dados', e);
            return false;
        }
    }

}
