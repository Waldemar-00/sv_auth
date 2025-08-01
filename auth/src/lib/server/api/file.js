import * as fsp from 'fs/promises'
import path from 'path'

class File
{
    // @ts-ignore
    constructor(dbPath)
    {
       this.dbPath = dbPath
    }
    async getDB()
    {
        const db = await fsp.readFile( dbPath, 'utf-8' )
        return await JSON.parse(db)
    }
    async getAllArticles ()
    {
        return await this.getDB()
    }
    // @ts-ignore
    async getArticleById(name)
    {
        const data = await this.getAllArticles()
        // @ts-ignore
        return data.find(article => article.name === name)
    }
    // @ts-ignore
    async addArticle(article)
    {
        const data = await this.getAllArticles()
        data.push(article)
        await fsp.writeFile(this.dbPath, JSON.stringify(data))
    }
    // @ts-ignore
    async deleteArticle ( name )
    {
        const articles = await this.getAllArticles()
        // @ts-ignore
        const index = articles.findIndex( article => article.name === name )
        if ( index === -1 ) throw new Error( "Article not found" )
        articles.splice( index, 1 )
        await fsp.writeFile(this.dbPath, JSON.stringify(articles))
    }
}
const dbPath = path.join( process.cwd(), 'src', 'lib', 'server', 'db', 'db.json' )
export const articleFileApi = new File(dbPath)