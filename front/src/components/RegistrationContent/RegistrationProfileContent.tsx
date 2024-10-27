
import { Box, Button, Grid2 as Grid, Stack, TextField } from "@mui/material";
import Joi from "joi";
import { useRef, useState } from "react";
import { editProfile, registration } from "../../api";
import { useUserProducts } from "../../contexts/UserProductsContext";
import { TModalWindow } from "../../TModalWindow/TModalWindow";

type RegistData = {
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
    password: string;
};
type EditData = {
    firstName: string;
    lastName: string;
    phone: string;
};
type PropType = {
    pageName: "Registration" | "Profile";
};

const passwordRegExp = new RegExp("^[a-zA-Z0-9]{3,30}$");
const emailRegExp = new RegExp(
    "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$"
);

const schemaJoi = Joi.object<EditData>({
    firstName: Joi.string().required().label("First Name"),
    lastName: Joi.string().required().label("Last Name"),
    phone: Joi.string().required(),
});
const errorInit = {
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    password: "",
};

export const RegistrationProfileContent = (prop: PropType) => {
    const firstNameRef = useRef<HTMLInputElement>(null);
    const lastNameRef = useRef<HTMLInputElement>(null);
    const phoneRef = useRef<HTMLInputElement>(null);
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const [isShow, setIsShow] = useState(false);
    const [serverError, setServerError] = useState("");
    const { user, setUser } = useUserProducts();

    const title = prop.pageName;

    const [errorInput, setError] = useState(errorInit);

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setError({ ...errorInput, [e.target.id]: "" });
    };

    const onClickRegister = () => {
        const firstName = firstNameRef.current?.value;
        const lastName = lastNameRef.current?.value;
        const phone = phoneRef.current?.value;
        if (prop.pageName === "Registration") {
            const newSchema = schemaJoi.append<RegistData>({
                password: Joi.string().min(6).pattern(passwordRegExp),
                email: Joi.string().pattern(emailRegExp),
            });
            const email = emailRef.current?.value;
            const password = passwordRef.current?.value;
            const { error, value } = newSchema.validate({
                firstName,
                lastName,
                phone,
                email,
                password,
            });

            if (error) {
                error.details.forEach((err) => {
                    setError({ ...errorInput, [err.path[0]]: err.message });
                });
                return;
            }
            registration(value)
                .then((res) => {
                    if (!res) return;

                    if (res.error === 0) {
                        setIsShow(true);
                    }
                })
                .catch((e) => {
                    setServerError(e.message);
                    setIsShow(true);
                });
        } else {
            const { error, value } = schemaJoi.validate({
                firstName,
                lastName,
                phone,
            });

            if (error) {
                error.details.forEach((err) => {
                    setError({ ...errorInput, [err.path[0]]: err.message });
                });
                return;
            }
            editProfile(value)
                .then((res) => {
                    if (!res) return;

                    if (res.data) {
                        setIsShow(true);
                        setUser(res.data);
                    }
                })
                .catch((e) => {
                    setServerError(e.message);
                    setIsShow(true);
                });
        }
    };

    return (
        <Box>
            <TModalWindow
                isShow={isShow}
                onClose={() => {
                    setIsShow(false);
                    if (!serverError && prop.pageName === "Registration") {
                        window.location.href = "/login";
                    }
                    setServerError("");
                }}
            >
                <Box>
                    {!serverError && prop.pageName === "Registration" && (
                        <p>Registration completed successfully</p>
                    )}
                    {!serverError && prop.pageName === "Profile" && (
                        <p>Saved successfully</p>
                    )}
                    {serverError && <Box color={"red"}>{serverError}</Box>}
                </Box>
            </TModalWindow>
            <h1>{title}</h1>
            <Grid size={{ xs: 12, md: 8 }}>
                <Stack spacing={3}>
                    <TextField
                        defaultValue={user?.firstName}
                        required
                        id="firstName"
                        label="First Name"
                        variant="standard"
                        inputRef={firstNameRef}
                        error={Boolean(errorInput.firstName)}
                        helperText={errorInput.firstName}
                        onChange={onChange}
                    />
                    <TextField
                        required
                        defaultValue={user?.lastName}
                        id="lastName"
                        label="Last Name"
                        variant="standard"
                        inputRef={lastNameRef}
                        error={Boolean(errorInput.lastName)}
                        helperText={errorInput.lastName}
                        onChange={onChange}
                    />
                    <TextField
                        required
                        defaultValue={user?.phone}
                        id="phone"
                        label="Phone"
                        variant="standard"
                        inputRef={phoneRef}
                        error={Boolean(errorInput.phone)}
                        helperText={errorInput.phone}
                        onChange={onChange}
                    />

                    {!user && (
                        <TextField
                            required
                            id="email"
                            label="Email"
                            variant="standard"
                            inputRef={emailRef}
                            error={Boolean(errorInput.email)}
                            helperText={errorInput.email}
                            onChange={onChange}
                            autoComplete="off"
                        />
                    )}

                    {!user && (
                        <TextField
                            required
                            id="password"
                            label="Password"
                            type="password"
                            variant="standard"
                            error={Boolean(errorInput.password)}
                            inputRef={passwordRef}
                            helperText={errorInput.password}
                            onChange={onChange}
                            autoComplete="off"
                        />
                    )}
                    <Box display={"flex"} justifyContent={"flex-end"}>
                        <Button variant="contained" onClick={onClickRegister}>
                            {!user && "Register"}
                            {user && "Save"}
                        </Button>
                    </Box>
                </Stack>
            </Grid>
        </Box>
    );
};
