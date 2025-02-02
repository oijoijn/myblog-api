import { useContext, useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { getBlogDetail, postBlogsCommentsCreate } from '../config/endpoint.tsx';
import { BlogDetailResponse, CommentRequest } from '../config/interface.tsx';
import { CookiesContext } from '../providers/CookiesContext.tsx';

export const useDetail = () => {
    const { cookies } = useContext(CookiesContext);
    const { id } = useParams<{ id: string }>();
    const [blog, setBlog] = useState<BlogDetailResponse | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [DynamicContent, setDynamicContent] = useState<React.ComponentType | null>(null);
    const [newComment, setNewComment] = useState('');

    const fetchBlogDetail = async (blogId: number) => {
        setLoading(true);
        try {
            const data = await getBlogDetail(blogId);
            setBlog(data);
        } catch (error: unknown) {
            if (error instanceof Error) {
                setError(error.message);
            } else {
                setError('An unknown error occurred');
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (id) {
            fetchBlogDetail(parseInt(id, 10));
        }
    }, [id]);


    const modulesRef = useRef(import.meta.glob('/src/templates/**/*.tsx'));

    useEffect(() => {
        if (blog?.tsx_path) {
            const modulePath = `/src/templates${blog.tsx_path}`;
            if (modulesRef.current[modulePath]) {
                (modulesRef.current[modulePath] as () => Promise<{ default: React.ComponentType }>)()
                    .then((module) => {
                        setDynamicContent(() => module.default);
                    })
                    .catch((error) => {
                        console.error("Failed to load dynamic content:", error);
                        setError("Failed to load blog content.");
                    });
            } else {
                console.error("Module not found:", modulePath);
                setError("Module not found.");
            }
        }
    }, [blog?.tsx_path]);


    const handlePostComment = async (comment: string) => {
        if (id) {
            try {
                const commentData: CommentRequest = { comment };
                await postBlogsCommentsCreate(cookies.access_token, parseInt(id, 10), commentData);
                fetchBlogDetail(parseInt(id, 10));
                alert('コメントの投稿に成功しました。');
            } catch (error) {
                console.error('Sign failed:', error);
                alert('コメントの投稿に失敗しました。ログインした上で投稿をお願いします。');
            }
        }
    };

    const handleSubmitComment = () => {
        if (blog && newComment.trim()) {
            handlePostComment(newComment);
            setNewComment('');
        } else if (!newComment.trim()) {
            alert('コメントを入力してください。');
        }
    };

    return { blog, newComment, setNewComment, loading, error, DynamicContent, handleSubmitComment };
};
