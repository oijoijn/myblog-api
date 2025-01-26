import { useContext, useEffect, useState, useRef } from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import { CommentEditResponse } from '../config/interface';
import { CookiesContext } from '../providers/CookiesContext';
import { getBlogsCommentsEdit, putBlogsCommentsEdit, deleteBlogsCommentsEdit } from '../config/endpoint';
import axios from 'axios';

export const useCommentsedit = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { cookies } = useContext(CookiesContext);
    const pk = location.state?.pk;
    const [blog, setBlog] = useState<CommentEditResponse | null>(null);
    const [commentText, setCommentText] = useState('');
    const [isSaving, setIsSaving] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const accessTokenRef = useRef(cookies.access_token);

    useEffect(() => {
        const fetchComments = async () => {
            setIsLoading(true);
            try {
                const response = await getBlogsCommentsEdit(accessTokenRef.current, pk);
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
        if (pk) {
            fetchComments();
        } else {
            navigate('/');
        }
    }, [pk, navigate]);

    const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setCommentText(e.target.value);
    };

    const handleUpdateComment = async () => {
        setIsSaving(true);
        setErrorMessage('');
        try {
            await putBlogsCommentsEdit(cookies.access_token, pk, commentText);
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
            await deleteBlogsCommentsEdit(cookies.access_token, pk);
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
    return (
        { blog, commentText, isSaving, isDeleting, errorMessage, isLoading, handleCommentChange, handleUpdateComment, handleDeleteComment }
    )
}
