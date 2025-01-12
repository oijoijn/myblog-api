import React, { useEffect, useState, Suspense } from 'react';
import { useParams } from 'react-router-dom';
import { getBlogDetail } from '../../config/endpoint.tsx';
import { BlogDetailResponse } from '../../config/interface.tsx';
import { Typography, Box, CircularProgress } from '@mui/material';

export const BlogDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [blog, setBlog] = useState<BlogDetailResponse | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [DynamicContent, setDynamicContent] = useState<React.ComponentType | null>(null);

    useEffect(() => {
        if (id) {
            getBlogDetail(parseInt(id, 10))
                .then((data) => setBlog(data))
                .catch((error) => setError(error.message))
                .finally(() => setLoading(false));
        }
    }, [id]);

    useEffect(() => {
        if (blog?.tsx_path) {
            import(/* @vite-ignore */ `/src/templates/${blog.tsx_path}`)
                .then((module) => {
                    setDynamicContent(() => module.default);
                })
                .catch((error) => {
                    console.error("Failed to load dynamic content:", error);
                    setError("Failed to load blog content.");
                });
        }
    }, [blog?.tsx_path]);

    if (loading) return <div>Loading blog detail...</div>;
    if (error) return <div>Error: {error}</div>;
    if (!blog) return <div>Blog not found.</div>;

    return (
        <Box padding={3}>
            <Typography variant="h2" gutterBottom align="center">
                {blog?.title}
            </Typography>
            <Typography variant="h6" gutterBottom align="center">
                作成日 : {blog?.created_at}
            </Typography>
            <img src={blog?.img_path} alt="表示できません" style={{ height: 'auto', marginBottom: '16px' }} />

            <Typography variant="h6" gutterBottom align="center">
                コメント:
            </Typography>

            {/* 動的に読み込んだコンポーネントをレンダリング */}
            {DynamicContent && (
                <Suspense fallback={<CircularProgress />}>
                    {React.createElement(DynamicContent)}
                </Suspense>
            )}

            {blog?.comments.map((comment) => (
                <Box key={comment.created_at} marginBottom={2} padding={2} border={1} borderColor="grey.500">
                    <Typography variant="subtitle2">投稿者: {comment.owner}</Typography>
                    <Typography variant="body1">{comment.comment}</Typography>
                    <Typography variant="caption">投稿日: {comment.created_at}</Typography>
                </Box>
            ))}
        </Box>
    );
};
