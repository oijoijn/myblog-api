import { Box, Button } from "@mui/material";
import { useCommentsedit } from "../hooks/useCommentsedit";

export const Commentsedit = () => {
    const
        { blog, commentText, isSaving, isDeleting, errorMessage, isLoading, handleCommentChange, handleUpdateComment, handleDeleteComment }
            = useCommentsedit()

    if (isLoading) {
        return <p>コメントを読み込み中...</p>;
    }

    if (!blog) {
        return <p>コメントが見つかりません。</p>;
    }

    return (
        <>
            <Box
                marginBottom={4}
                padding={2}
                borderColor="grey.500"
                display="flex"
                flexDirection="column"
            >
                <h1>コメント編集</h1>
                {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}

                <textarea
                    id="comment"
                    value={commentText}
                    onChange={handleCommentChange}
                    style={{ width: '100%', minHeight: '100px' }}
                />

                <Box mt={2} display="flex" justifyContent="flex-end" gap={2} >
                    <Button variant="contained" onClick={handleUpdateComment} disabled={isSaving}>
                        {isSaving ? '更新中...' : '更新'}
                    </Button>

                    <Button variant="contained" color="error" onClick={handleDeleteComment} disabled={isDeleting}>
                        {isDeleting ? '削除中...' : '削除'}
                    </Button>
                </Box>
            </Box>
        </>
    );
};