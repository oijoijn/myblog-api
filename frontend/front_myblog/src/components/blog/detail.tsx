import { Suspense, useState } from 'react';
import { Typography, Box, CircularProgress, TextField, Button } from '@mui/material';
import { useDetail } from '../hooks/useDetail';
import React from 'react';

export const BlogDetail: React.FC = () => {
    const { blog, loading, error, DynamicContent, handlePostComment } = useDetail();
    const [newComment, setNewComment] = useState(''); 

    const handleSubmitComment = () => {
        if (blog && newComment.trim()) {
            handlePostComment(newComment);
            setNewComment('');
        } else if (!newComment.trim()) {
            alert('コメントを入力してください。');
        }
    };

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

            <Box mt={3}>
                <TextField
                    label="コメント"
                    multiline
                    rows={4}
                    fullWidth
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                />
                <Button variant="contained" color="primary" onClick={handleSubmitComment} sx={{ mt: 1 }}>
                    コメントを投稿
                </Button>
            </Box>
        </Box>
    );
};