import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getBlogDetail } from '../config/endpoint.tsx';
import { BlogDetailResponse } from '../config/interface.tsx';

export const useDetail = () => {
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

    return { blog, loading, error, DynamicContent };
};