import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getBlogDetail } from '../../config/endpoint.tsx';
import { Blog } from '../../config/interface.tsx';
import { Typography, Box} from '@mui/material';

export const BlogDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [blog, setBlog] = useState<Blog | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (id) {
            getBlogDetail(parseInt(id, 10)) // idを数値に変換
                .then((data) => setBlog(data))
                .catch((error) => setError(error.message))
                .finally(() => setLoading(false));
        }
    }, [id]);

    if (loading) return <div>Loading blog detail...</div>;
    if (error) return <div>Error: {error}</div>;
    if (!blog) return <div>Blog not found.</div>;

    return (
        <Box padding={3}>
            <Typography component="h1" gutterBottom>
                {blog.title}
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
                Created at: {blog.created_at}
            </Typography>
            <img src={blog.img_file} alt='表示できません' style={{ maxWidth: 'auto', height: 'auto', marginBottom: '16px' }} />
            <Typography variant="body1">
                {blog.html_file}
            </Typography>
        </Box>
    );
};