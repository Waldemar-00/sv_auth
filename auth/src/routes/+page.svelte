<script>
// @ts-nocheck
	import { enhance } from '$app/forms';
    // @ts-ignore
    let articles = $state([])
    let articleName = $state('')
    let isFormSuccess = $state(false)
    let deleting = $state(false)
    async function getArticles()
    {
        const response = await fetch('/articles')
        const data = await response.json()
        articles = data
        return articles
    }
    async function deleteArticle(name)
    {
        const response = await fetch(`/articles/${name}`, { method: 'DELETE' })
        const data = await response.json()
        articles = await getArticles()
    }
</script>
<h1>Articles</h1>
<section>
    <div>
        {#if !deleting}
        <ul>
            {#each articles as article, i (article.name + i)}
                <li>
                    <p>
                        {i + 1}. {article.name}
                        <a href={article.href}>more here</a>
                        <button onclick={async() => {
                            deleting = true
                            await deleteArticle(article.name)
                            articleName = article.name
                            setTimeout(() => {
                                deleting = false
                                articleName = ''
                            }, 700)

                        }}>delete</button>
                    </p>
                </li>
            {/each}
        </ul>
        {:else}
            <h2>deleting... <span>{articleName}</span></h2>
        {/if}
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
                    articleName = result.name
                    articles = await getArticles()
                }
            }
            }}
            onreset={() => {
                isFormSuccess = false
                articleName = ''
            }}>
            <div class="form-group">
                <label for="articleName">Article Name</label>
                <input type="text" id="articleName" name="name" placeholder="Enter article name" required>
            </div>
            <div class="form-group">
                <label for="articleHref">Article URL</label>
                <input type="text" id="articleHref" name="href" placeholder="https://example.com/article" required>
            </div>
            <button type="submit" class="submit-btn">Add Article</button>
        </form>
        {#if isFormSuccess}
            <p>Article <span>{articleName}</span> added successfully </p>
            <button type="reset" form="addArticleForm">Reset</button>
        {/if}
    </div>
</section>
<style>
    :global(body) {
        margin: 0;
        padding: 0;
        font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        min-height: 100vh;
        color: #2d3748;
        line-height: 1.6;
    }

    :global(h1) {
        text-align: center;
        color: white;
        font-size: 2.5rem;
        font-weight: 700;
        margin: 2rem 0;
        text-shadow: 0 2px 4px rgba(0,0,0,0.3);
    }
    h2 {
        color: #667eea;
    }
    h2 span {
        color: #ff6b6b;
    }
    section {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 2rem;
        max-width: 1200px;
        padding: 0 1rem;
        margin: 0 auto;
        margin: 0 auto;
        padding: 0 1rem;
    }

    /* Articles List Styles */
    section > div:first-child {
        background: white;
        border-radius: 16px;
        padding: 2rem;
        box-shadow: 0 10px 25px rgba(0,0,0,0.1);
        border: 1px solid rgba(255,255,255,0.2);
    }

    ul {
        list-style: none;
        padding: 0;
        margin: 0;
    }

    li {
        background: linear-gradient(135deg, #ff6b6b, #ffa726);
        margin-bottom: 1rem;
        border-radius: 12px;
        padding: 1.5rem;
        color: white;
        box-shadow: 0 4px 12px rgba(255,107,107,0.3);
        transition: all 0.3s ease;
    }

    li:hover {
        transform: translateY(-2px);
        box-shadow: 0 8px 20px rgba(255,107,107,0.4);
    }

    li p {
        margin: 0;
        font-weight: 600;
        font-size: 1.1rem;
    }

    li a {
        color: #ff6b6b;
        text-decoration: none;
        font-weight: 400;
        font-style: italic;
        margin-left: 0.5rem;
        padding: 0.1rem 0.3rem 0.2rem 0.3rem;
        background: none;
        border-radius: 4px;
        transition: all 0.3s ease;
        display: inline;
        margin-top: 0;
        box-shadow: none;
        border: none;
        text-transform: none;
        font-size: 0.8rem;
        letter-spacing: 0;
        position: relative;
        z-index: 1;
    }

    li a::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(255,255,255,0.9);
        border-radius: 12px;
        z-index: -1;
        transform: scale(0.1);
        opacity: 0;
        transition: all 0.3s ease;
    }

    li a:hover {
        color: #ff4757;
        padding: 0.25rem 0.75rem;
        margin-left: 0.5rem;
    }

    li a:hover::before {
        transform: scale(1);
        opacity: 1;
        box-shadow: 0 2px 8px rgba(0,0,0,0.2);
        border: 2px solid rgba(255,255,255,0.3);
    }

    /* Form Styles */
    section > div:last-child {
        background: white;
        border-radius: 16px;
        padding: 2rem;
        box-shadow: 0 10px 25px rgba(0,0,0,0.1);
        border: 1px solid rgba(255,255,255,0.2);
    }

    form {
        display: flex;
        flex-direction: column;
        gap: 1.5rem;
    }

    input[type="text"] {
        padding: 1rem;
        border: 2px solid #e2e8f0;
        border-radius: 12px;
        font-size: 1rem;
        transition: all 0.3s ease;
        background: #f8fafc;
    }

    input[type="text"]:focus {
        outline: none;
        border-color: #667eea;
        background: white;
        box-shadow: 0 0 0 3px rgba(102,126,234,0.1);
    }

    input[type="text"]::placeholder {
        color: #a0aec0;
    }

    button {
        padding: 1rem 2rem;
        background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
        color: white;
        border: none;
        border-radius: 12px;
        font-size: 1rem;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.3s ease;
        box-shadow: 0 4px 12px rgba(79,172,254,0.3);
    }

    button:hover {
        transform: translateY(-2px);
        box-shadow: 0 8px 20px rgba(79,172,254,0.4);
    }

    button:active {
        transform: translateY(0);
    }

    button[type="reset"] {
        background: linear-gradient(135deg, #ff6b6b 0%, #ffa726 100%);
        box-shadow: 0 4px 12px rgba(255,107,107,0.3);
    }

    button[type="reset"]:hover {
        box-shadow: 0 8px 20px rgba(255,107,107,0.4);
    }

    /* Success Message */
    p {
        color: #38a169;
        font-weight: 600;
        padding: 1rem;
        background: #f0fff4;
        border: 2px solid #9ae6b4;
        border-radius: 12px;
        margin: 1rem 0;
        text-align: center;
    }
    p span {
        color: #667eea;
    }

    /* Archive Button */
    section > div:first-child button {
        background: linear-gradient(135deg, #9f7aea 0%, #667eea 100%);
        width: 100%;
        margin-top: 1rem;
    }

    /* Responsive Design */
    .form-group {
        margin-bottom: 1.5rem;
    }

    label {
        display: block;
        margin-bottom: 0.5rem;
        font-weight: 600;
        color: #4c51bf; /* Более тёмный оттенок из градиента для лучшей читаемости */
    }

    input[type="text"] {
        width: 100%;
        padding: 0.75rem;
        border: 2px solid #e2e8f0;
        border-radius: 0.375rem;
        font-size: 1rem;
        transition: border-color 0.2s;
    }

    input[type="text"]:focus {
        outline: none;
        border-color: #667eea;
        box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.2);
    }

    .submit-btn {
        background-color: #4f46e5;
        color: white;
        padding: 0.75rem 1.5rem;
        border: none;
        border-radius: 0.375rem;
        font-weight: 500;
        cursor: pointer;
        transition: background-color 0.2s;
    }

    .submit-btn:hover {
        background-color: #4338ca;
    }

    @media (max-width: 768px) {
        :global(h1) {
            font-size: 2rem;
            margin: 1rem 0;
        }

        section {
            grid-template-columns: 1fr;
            gap: 1.5rem;
            padding: 0 0.5rem;
        }

        section > div {
            padding: 1.5rem;
        }

        li {
            padding: 1rem;
        }

        li p {
            font-size: 1rem;
        }

        li a {
            margin-left: 0;
            margin-top: 0.75rem;
            display: block;
            text-align: center;
        }
    }

    @media (max-width: 480px) {
        :global(h1) {
            font-size: 1.75rem;
        }

        section > div {
            padding: 1rem;
        }

        input[type="text"], button {
            padding: 0.875rem;
        }
    }

    /* Accessibility Improvements */
    @media (prefers-reduced-motion: reduce) {
        * {
            transition: none !important;
            animation: none !important;
        }
    }

    /* High contrast mode support */
    @media (prefers-contrast: high) {
        li {
            border: 2px solid #000;
        }

        button {
            border: 2px solid #000;
        }

        input[type="text"] {
            border: 2px solid #000;
        }
    }

    /* Focus indicators for keyboard navigation */
    button:focus-visible,
    input:focus-visible,
    a:focus-visible {
        outline: 3px solid #667eea;
        outline-offset: 2px;
    }
</style>