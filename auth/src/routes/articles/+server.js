import { articleFileApi } from '$lib/server/api/file'
import { json } from '@sveltejs/kit'

export async function GET ()
{
    return json(await articleFileApi.getAllArticles())
}