import {
    Box,
    Button,
    Stack,
    TextField,
    Typography,
} from "@mui/material";
import Joi from "joi";
import { useRef, useState } from "react";
import { login } from "../../api";
import { TModalWindow } from "../../TModalWindow/TModalWindow";
import { ServerErrorCollapse } from "../ServerErrorCollapse/ServerErrorCollapse";
import { setToken } from "../../lib/TokenLib"

// Define a validation schema using Joi for email and password fields
const schema = Joi.object<{ email: string; password: string }>({
    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ["com", "net", "ru"] } })
        .required(),
    password: Joi.string().required(),
});

export const LoginContent = () => {
    const passwordRef = useRef<HTMLInputElement>(null); // Reference to password input field
    const emailRef = useRef<HTMLInputElement>(null); // Reference to email input field
    const [serverError, setServerError] = useState(""); // State for server-side error messages
    const [errorInput, setError] = useState({
        email: "",
        password: "",
    });// State for form input errors

    const [isShow, setIsShow] = useState(false);

    // Function to reset error message for a specific input field when the user types in it
    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setError({ ...errorInput, [e.target.id]: "" });
    };

    const handleForgotPasswordClick = () => {
        setIsShow(true); // Open modal on "Forgot your password?" click
    };

    return (
        <>
            {/* Modal Window */}
            <TModalWindow
                isShow={isShow}
                onClose={() => setIsShow(false)}
            >
                <Typography variant="h6" component="h2">
                    Password Recovery
                </Typography>
                <Typography sx={{ mt: 2 }}>
                    For password recovery, call to admin.
                </Typography>
            </TModalWindow>

            {/* Display an alert message if there's a server error */}
            <ServerErrorCollapse
                serverError={serverError}
                setServerError={setServerError}
            />
            <Box
                component="form"
                display={"flex"}
                marginTop={10}
                flexDirection={"column"}
            >
                {/* Form container */}
                <Box
                    border={1}
                    padding={2}
                    borderRadius={1}
                    width={300}
                    margin={"auto"}
                >
                    <Stack>
                        <TextField
                            required
                            id="email"
                            label="Email"
                            variant="standard"
                            inputRef={emailRef}
                            error={Boolean(errorInput.email)}
                            helperText={errorInput.email}
                            onChange={onChange}
                        />
                        <TextField
                            sx={{ marginTop: 2 }}
                            onChange={onChange}
                            required
                            id="password"
                            label="Password"
                            type="password"
                            variant="standard"
                            error={Boolean(errorInput.password)}
                            inputRef={passwordRef}
                            helperText={errorInput.password}
                        />
                    </Stack>
                    <Box marginTop={1} display={"flex"} justifyContent={"center"}>
                        <Button
                            variant="contained"
                            onClick={() => {
                                const email = emailRef.current?.value;
                                const password = passwordRef.current?.value;
                                const { error, value } = schema.validate({ email, password });
                                if (error) {
                                    // If validation fails, set errors for specific fields
                                    error.details.forEach((err) => {
                                        setError({ ...errorInput, [err.path[0]]: err.message });
                                    });
                                    return;
                                }
                                // If validation passes, call the login API
                                login(value.email, value.password)
                                    .then((res) => {
                                        if (res) {
                                            setToken(res.token);
                                            window.location.href = "/";  // Redirect to homepage (restart app to get user products)
                                        }
                                    })
                                    .catch((e) => {
                                        setServerError(e.message); // Display server error if login fails
                                    });
                            }}
                        >
                            Login
                        </Button>
                    </Box>
                    {/* Forgot Password link */}
                    <Box display="flex" justifyContent="center" marginTop={2}>
                        <Typography
                            variant="body2"
                            onClick={handleForgotPasswordClick}
                            sx={{ cursor: "pointer", textDecoration: "underline" }}
                        >
                            Forgot your password?
                        </Typography>
                    </Box>
                </Box>
            </Box>
        </>
    );
};
