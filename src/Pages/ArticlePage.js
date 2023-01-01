import React, { useEffect, useState } from 'react';
import articleContent from './article-content';
import ArticlesList from '../components/ArticlesList';
import NotFountPage from './NotFoundPage';
import CommentsList from '../components/CommentsList';
import UpvoteSection from '../components/UpvotesSection';
import AddCommentForm from '../components/AddCommentForm';

const ArticlePage = ({ match }) => {

    const name = match.params.name;
    const article = articleContent.find(article => article.name === name);

    const [articleInfo, setArticleInfo] = useState({ name: "", upvotes: 0, comments: [] });

    useEffect(() => {
        const fetchData = async () => {
            const result = await fetch(`/api/articles/${name}`);
            const body = await result.json();
            console.log(body);
            setArticleInfo(body);
        }
        fetchData();
    }, [name]);

    if(!article) return <NotFountPage />

    const otherArticles = articleContent.filter(article => article.name !== name);

    return(
        <>
        <h1>{ article.title }</h1>
        <UpvoteSection articleName={articleInfo.name} upvotes={articleInfo.upvotes} setArticleInfo={setArticleInfo} />
        {article.content.map((para, key) => (
            <p key ={ key }>{ para }</p>
        ))}
        <CommentsList comments = {articleInfo.comments} />
        <AddCommentForm articleName={articleInfo.name} setArticleInfo={setArticleInfo} />
        <h3>Other Articles</h3>
        <ArticlesList articles={otherArticles} />
        </>
    );
}

export default ArticlePage;