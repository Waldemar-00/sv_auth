<script>
    let articles = $state()
async function getArticles()
{
    const response = await fetch('/articles')
    const data = await response.json()
    articles = data
}
$inspect(articles)
</script>
<h1>Articles</h1>
<ul>
    {#each articles as article, i (article.name + i)}
        <li>
            <p>
                {i + 1}.{article.name}
            </p>
            <a href={article.href}>Read article</a>
        </li>
    {/each}
</ul>
<button onclick={getArticles}>Get articles</button>
