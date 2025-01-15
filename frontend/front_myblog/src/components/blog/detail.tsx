import { Suspense } from 'react';
import { Typography, Box, CircularProgress } from '@mui/material';
import { useDetail } from '../hooks/useDetail';
import React from 'react';

export const BlogDetail: React.FC = () => {
    const { blog, loading, error, DynamicContent } = useDetail(); // カスタムフックを呼び出し、値を受け取る

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
                <CircularProgress />
            </Box>
        );
    }

    if (error) {
        return (
            <Box padding={3}>
                <Typography color="error">Error: {error}</Typography>
            </Box>
        );
    }

    if (!blog) {
        return (
            <Box padding={3}>
                <Typography>Blog not found.</Typography>
            </Box>
        );
    }

    return (
        <Box padding={3}>
            <Typography variant="h2" gutterBottom align="center">
                {blog.title}
            </Typography>
            <Typography variant="h6" gutterBottom align="center">
                作成日 : {blog.created_at}
            </Typography>
            {/* <img src={blog.img_path} alt="表示できません" style={{ height: 'auto', marginBottom: '16px' }} /> */}


            {/* 動的に読み込んだコンポーネントをレンダリング */}
            {DynamicContent && (
                <Suspense fallback={<CircularProgress />}>
                    {React.createElement(DynamicContent)}
                </Suspense>
            )}

            <Typography variant="h6" gutterBottom align="center">
                コメント
            </Typography>

            {blog.comments.map((comment) => (
                <Box key={comment.created_at} marginBottom={2} padding={2} border={1} borderColor="grey.500">
                    <Typography variant="subtitle2">投稿者: {comment.owner}</Typography>
                    <Typography variant="body1">{comment.comment}</Typography>
                    <Typography variant="caption">投稿日: {comment.created_at}</Typography>
                </Box>
            ))}
        </Box>
    );
};