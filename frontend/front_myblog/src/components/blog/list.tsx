
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
        <>
            <ul style={{ listStyle: 'none', padding: 0 }}>
                {blogs.map((blog) => (
                    <li key={blog.id}>
                        <Card sx={{ maxWidth: 345, margin: 3}}>
                            <CardActionArea onClick={() => handleImageClick(blog.id)}>
                                <CardMedia
                                    component="img"
                                    image={blog.img_path}
                                    alt={blog.title}
                                    style={{ width: 'auto', height: 'auto', cursor: 'pointer' }}
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h5">
                                        {blog.title}
                                    </Typography>
                                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                        Created at: {blog.created_at}
                                        TSX PATH: {blog.tsx_path}
                                        IMG PATH: {blog.img_path}
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </li>
                ))}
            </ul>
        </>
    );
};
