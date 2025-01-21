import { useContext, useEffect, useState } from "react";
import { getBlogsCommentsList } from "../config/endpoint";
import { CookiesContext } from "../providers/CookiesContext";
import { CommentListResponse } from "../config/interface";
import { useNavigate } from "react-router-dom";

export const useCommentslist = () => {
    const { cookies } = useContext(CookiesContext);
    const [blog, setBlog] = useState<CommentListResponse>([]);
    const navigate = useNavigate()

    useEffect(() => {
        const fetchComments = async () => {
            try {
                const response = await getBlogsCommentsList(cookies.access_token);
                setBlog(response);
            } catch (error) {
                console.error('get commentlist failed:', error);
                alert('コメントの取得に失敗しました。');
            }
        };

        fetchComments();
    }, [cookies.access_token]);

    const handleChange = (id: number) => {
        navigate('/Commentsedit', { state: { id: id } })
    }

    return { blog, handleChange };
};