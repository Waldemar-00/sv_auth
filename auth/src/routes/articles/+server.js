// @ts-nocheck
import { articleFileApi } from '$lib/server/api/file'
import { json } from '@sveltejs/kit'

export async function GET ()
{
    return json(await articleFileApi.getAllArticles(), { status: 200 })
}
export async function POST ({ request })
{
    const formData = await request.formData()
    const name = formData.get('name')
    const href = formData.get('href')
    await articleFileApi.addArticle({ name, href })
    return json({ success: true, name}, { status: 201 })
}
