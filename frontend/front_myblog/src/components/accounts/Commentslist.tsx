import { useCommentslist } from "../hooks/useCommentslist";
import { Box, Typography, Button } from "@mui/material";

export const Commentslist = () => {
  const { blog, handleChange } = useCommentslist();

  return (
    <>
      <Box marginTop={4}>
        {blog.length > 0 ? ( // コメントがある場合
          blog.map((blog) => (
            <Box
              key={blog.pk}
              marginBottom={2}
              padding={2}
              border={1}
              borderColor="grey.500"
              display="flex"
              flexDirection="column"
            >
              <div>
                <Typography variant="subtitle2">投稿者: {blog.owner}</Typography>
                <Typography variant="body1">{blog.comment}</Typography>
                <Typography variant="caption">投稿日: {blog.created_at}</Typography>
              </div>
              <Box mt="auto" textAlign="right">
                <Button variant="contained" onClick={() => handleChange(blog.pk)}>
                  編集する
                </Button>
              </Box>
            </Box>
          ))
        ) : ( // コメントがない場合
          <Box
            marginBottom={2}
            padding={2}
            border={1}
            borderColor="grey.500"
            display="flex"
            flexDirection="column"
          >
            <Typography variant="body1" textAlign="center">
              投稿コメントがありません。
            </Typography>
          </Box>
        )}
      </Box>
    </>
  );
};
