import { useCallback, useState } from "react";
// @mui material components
import Switch from "@mui/material/Switch";
// Material Dashboard 2 PRO React TS components
import Box from "components/Box";
import Button from "components/Button";
import Input from "components/Input";
import Typography from "components/Typography";
import { useAppSelector } from "store/hooks";
import { selectLoginFormValues } from "../loginSlice";

function LoginForm(): JSX.Element {
  // continue linking redux here
  const [rememberMe, setRememberMe] = useState<boolean>(false);
  const { email, password, remember } = useAppSelector(selectLoginFormValues);

  const handleSetRememberMe = useCallback(
    () => setRememberMe((prev) => !prev),
    []
  );

  return (
    <>
      <Box mb={2}>
        <Input type="email" label="Email" fullWidth />
      </Box>
      <Box mb={2}>
        <Input type="password" label="Password" fullWidth />
      </Box>
      <Box display="flex" alignItems="center" ml={-1}>
        <Switch checked={remember} onChange={handleSetRememberMe} />
        <Typography
          variant="button"
          fontWeight="regular"
          color="text"
          onClick={handleSetRememberMe}
          sx={{ cursor: "pointer", userSelect: "none", ml: -1 }}
        >
          &nbsp;&nbsp;Remember me
        </Typography>
      </Box>
      <Box mt={4} mb={1}>
        <Button variant="gradient" color="info" fullWidth>
          sign in
        </Button>
      </Box>
    </>
  );
}

export default LoginForm;
