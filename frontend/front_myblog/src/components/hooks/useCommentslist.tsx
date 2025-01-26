import { useContext, useEffect, useState, useRef } from "react";
import { getBlogsCommentsList } from "../config/endpoint";
import { CookiesContext } from "../providers/CookiesContext";
import { CommentListResponse } from "../config/interface";
import { useNavigate } from "react-router-dom";

export const useCommentslist = () => {
    const { cookies } = useContext(CookiesContext);
    const [blog, setBlog] = useState<CommentListResponse>([]);
    const navigate = useNavigate()
    const accessTokenRef = useRef(cookies.access_token);

    useEffect(() => {
        const fetchComments = async () => {
            try {
                const response = await getBlogsCommentsList(accessTokenRef.current);
                setBlog(response);
            } catch (error) {
                console.error('get commentlist failed:', error);
                alert('コメントの取得に失敗しました。');
            }
        };

        fetchComments();
    }, []);

    const handleChange = (pk: number) => {
        navigate('/Commentsedit', { state: { pk: pk } })
    }

    return { blog, handleChange };
};