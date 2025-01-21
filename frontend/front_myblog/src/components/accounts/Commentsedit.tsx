import { useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { CommentEditResponse } from '../config/interface';
import { CookiesContext } from '../providers/CookiesContext';
import { getBlogsCommentsEdit, putBlogsCommentsEdit, deleteBlogsCommentsEdit } from '../config/endpoint';
import axios from 'axios';

export const Commentsedit = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { cookies } = useContext(CookiesContext);
    const id = location.state?.id;
    const [blog, setBlog] = useState<CommentEditResponse | null>(null);
    const [commentText, setCommentText] = useState('');
    const [isSaving, setIsSaving] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchComments = async () => {
            setIsLoading(true);
            try {
                const response = await getBlogsCommentsEdit(cookies.access_token, id);
                setBlog(response);
                setCommentText(response.comment);
            } catch (error) {
                console.error('コメントの取得に失敗しました:', error);
                alert('コメントの取得に失敗しました。');
                navigate('/commentslist');
            } finally {
                setIsLoading(false);
            }
        };

        if (id) {
            fetchComments();
        } else {
            navigate('/');
        }
    }, [cookies.access_token, id, navigate]);

    const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setCommentText(e.target.value);
    };

    const handleUpdateComment = async () => {
        setIsSaving(true);
        setErrorMessage('');
        try {
            await putBlogsCommentsEdit(cookies.access_token, id, commentText);
            navigate('/commentslist');
        } catch (error) {
            console.error('コメントの更新に失敗しました:', error);
            if (axios.isAxiosError(error)) {
                setErrorMessage(error.response?.data?.message || 'コメントの更新に失敗しました。');
            } else {
                setErrorMessage('予期せぬエラーが発生しました。');
            }
        } finally {
            setIsSaving(false);
        }
    };

    const handleDeleteComment = async () => {
        setIsDeleting(true);
        setErrorMessage('');
        try {
            await deleteBlogsCommentsEdit(cookies.access_token, id);
            navigate('/commentslist');
        } catch (error) {
            console.error('コメントの削除に失敗しました:', error);
            if (axios.isAxiosError(error)) {
                setErrorMessage(error.response?.data?.message || 'コメントの削除に失敗しました。');
            } else {
                setErrorMessage('予期せぬエラーが発生しました。');
            }
        } finally {
            setIsDeleting(false);
        }
    };

    if (isLoading) {
        return <p>コメントを読み込み中...</p>;
    }

    if (!blog) {
        return <p>コメントが見つかりません。</p>;
    }

    return (
        <>

            <Box
                marginBottom={2}
                padding={2}
                border={1}
                borderColor="grey.500"
                display="flex"
                flexDirection="column"
            >
                <h1>コメント編集 (ID: {id})</h1>
                {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}

                <label htmlFor="comment">コメント:</label>
                <textarea
                    id="comment"
                    value={commentText}
                    onChange={handleCommentChange}
                    style={{ width: '100%', minHeight: '100px' }}
                />

                <button onClick={handleUpdateComment} disabled={isSaving}>
                    {isSaving ? '更新中...' : '更新'}
                </button>

                <button onClick={handleDeleteComment} disabled={isDeleting}>
                    {isDeleting ? '削除中...' : '削除'}
                </button>
            </Box>
        </>
    );
};