import { articleFileApi } from '$lib/server/api/file'
import { json } from '@sveltejs/kit'

export async function DELETE ({ params })
{
    const name = params.name
    await articleFileApi.deleteArticle(name)
    return json({ success: true })
}