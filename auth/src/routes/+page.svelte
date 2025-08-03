<script>
// @ts-nocheck
	import { enhance } from '$app/forms';
    // @ts-ignore
    let articles = $state([])
    let isFormSuccess = $state(false)
    async function getArticles()
    {
        const response = await fetch('/articles')
        const data = await response.json()
        articles = data
    }
    $inspect(articles)
</script>
<h1>Articles</h1>
<section>
    <div>
        <ul>
            {#each articles as article, i (article.name + i)}
                <li>
                    <p>
                        {i + 1}. {article.name}
                        <a href={article.href}>read more</a>
                    </p>
                </li>
            {/each}
        </ul>
        {#if articles.length === 0}
            <button onclick={getArticles}>archive article list</button>
        {/if}
    </div>
    <div>
        <form
            id="addArticleForm"
            action="/articles"
            method="post"
            use:enhance={() => {
                isFormSuccess = false
                return async ({update, result}) => {
                    await update()
                if(result.success){
                    isFormSuccess = result.success
                }
            }
            }}
            onreset={() => {
                isFormSuccess = false
            }}>
            <input type="text" name="name">
            <input type="text" name="href">
            <button>Submit</button>
        </form>
        {#if isFormSuccess}
            <p>Article added successfully</p>
            <button type="reset" form="addArticleForm">Reset</button>
        {/if}
    </div>
</section>
<style>
    section {
        display: flex;
        gap: 2rem;
    }
    ul {
        width: 20vw;
    }
</style>