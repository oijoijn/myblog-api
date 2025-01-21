import { useCommentslist } from "../hooks/useCommentslist";
import { Box, Typography, Button } from "@mui/material";

export const Commentslist = () => {
  const { blog, handleChange } = useCommentslist();

  return (
    <>
      {blog.map((comment) => (
        <Box
          key={comment.created_at}
          marginBottom={2}
          padding={2}
          border={1}
          borderColor="grey.500"
          display="flex"
          flexDirection="column"
        >
          <div>
            <Typography variant="subtitle2">投稿者: {comment.owner}</Typography>
            <Typography variant="body1">{comment.comment}</Typography>
            <Typography variant="caption">投稿日: {comment.created_at}</Typography>
          </div>
          <Box mt="auto" textAlign="right">
            <Button variant="contained" onClick={() => handleChange(comment.blog)}>
              編集する
            </Button>
          </Box>
        </Box>
      ))}
    </>
  );
};