import React, { useEffect, useState } from "react";
import { getBlogsList } from '../config/endpoint.tsx';
import { Blog } from '../config/interface.tsx';
import { useNavigate } from 'react-router-dom';
import { Card, CardActionArea, CardMedia, CardContent, Typography } from '@mui/material';

export const BlogList: React.FC = () => {
    const [blogs, setBlogs] = useState<Blog[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        getBlogsList()
            .then((data) => setBlogs(data))
            .catch((error) => setError(error.message));
        setLoading(false);
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    const handleImageClick = (id: number) => {
        navigate(`/blogs/${id}/detail/`);
    };

    return (
        <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexWrap: 'wrap' }}>
            {blogs.map((blog) => (
                <li key={blog.id} style={{ width: 'calc(100% / 3)', padding: '0 8px', boxSizing: 'border-box' }}>
                    <Card sx={{ margin: 3 }}>
                        <CardActionArea onClick={() => handleImageClick(blog.id)}>
                            <CardMedia
                                component="img"
                                image={blog.img_path}
                                alt={blog.title}
                                sx={{ maxWidth: '100%', height: 'auto', cursor: 'pointer' }}
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" align="center">
                                    {blog.title}
                                </Typography>
                                <Typography variant="body2"  align="center" sx={{ color: 'text.secondary' }}>
                                    Created at: {blog.created_at}<br />
                                    {/* TSX PATH: {blog.tsx_path}<br />
                                    IMG PATH: {blog.img_path}<br /> */}
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </li>
            ))}
        </ul>
    );
};