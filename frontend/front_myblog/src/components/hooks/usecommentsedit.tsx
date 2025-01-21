import { useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { CommentEditResponse } from '../config/interface';
import { CookiesContext } from '../providers/CookiesContext';
import { getBlogsCommentsEdit, putBlogsCommentsEdit, deleteBlogsCommentsEdit } from '../config/endpoint';
import axios from 'axios';

export const useCommentsedit = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { cookies } = useContext(CookiesContext);
    const id = location.state?.id;
    const [blog, setBlog] = useState<CommentEditResponse>();
    const [commentText, setCommentText] = useState('');
    const [isSaving, setIsSaving] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    useEffect(() => {
        const fetchComments = async () => {
            try {
                const response = await getBlogsCommentsEdit(cookies.access_token, id);
                setBlog(response);
                setCommentText(response.comment);
            } catch (error) {
                console.error('コメントの取得に失敗しました:', error);
                alert('コメントの取得に失敗しました。');
            }
        };

        if (id) {
            fetchComments();
        }
    }, [cookies.access_token, id]);

    const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setCommentText(e.target.value);
    };

    const handleUpdateComment = async () => {
        setIsSaving(true);
        setErrorMessage('');
        setSuccessMessage('');
        try {
            await putBlogsCommentsEdit(cookies.access_token, id, commentText);
            setSuccessMessage('コメントを更新しました！');
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
        setSuccessMessage('');
        try {
            await deleteBlogsCommentsEdit(cookies.access_token, id);
            setSuccessMessage('コメントを削除しました！');
            // 削除成功後、適切なページにリダイレクトするなどの処理を追加できます
            navigate(-1); // 一つ前のページに戻る例
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
        { handleCommentChange, handleUpdateComment, handleDeleteComment }
    )
}
