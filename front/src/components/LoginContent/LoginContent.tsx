import { Box, Button, Stack, TextField } from "@mui/material";

export const LoginContent = () => {
    return (
        <Box
            component="form"
            display={"flex"}
            flexDirection={"column"}
            height={"100%"}
            alignItems={"center"}
            maxWidth={"100%"}
            padding={"20px"}
        >
            <Box border={1} padding={2} borderRadius={1} minWidth={300}>
                <Stack>
                    <TextField required id="email" label="Email" variant="standard" />
                    <TextField
                        required
                        id="password"
                        label="Password"
                        type="password"
                        variant="standard"
                    />
                </Stack>
                <Box marginTop={1} display={"flex"} justifyContent={"center"}>
                    <Button type="submit" variant="contained">
                        Login
                    </Button>
                </Box>
            </Box>
        </Box>
    );
};