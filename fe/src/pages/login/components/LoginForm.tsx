// @mui material components
import Switch from "@mui/material/Switch";
// Material Dashboard 2 PRO React TS components
import Box from "components/Box";
import Button from "components/Button";
import Input from "components/Input";
import Typography from "components/Typography";
import { useAppDispatch, useAppSelector } from "store/hooks";
import { selectLoginFormValues, setCredentials } from "../loginSlice";

function LoginForm(): JSX.Element {
  const dispatch = useAppDispatch();
  const { email, password, remember } = useAppSelector(selectLoginFormValues);

  const handleSubmit = () => {
    // continue here to make login post request
    console.log("handle submit with", email, password, remember);
  };
  return (
    <>
      <Box mb={2}>
        <Input
          type="email"
          label="Email"
          fullWidth
          value={email}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            dispatch(setCredentials({ key: "email", value: e.target.value }))
          }
        />
      </Box>
      <Box mb={2}>
        <Input
          type="password"
          label="Password"
          fullWidth
          value={password}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            dispatch(setCredentials({ key: "password", value: e.target.value }))
          }
        />
      </Box>
      <Box display="flex" alignItems="center" ml={-1}>
        <Switch
          checked={remember}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            dispatch(
              setCredentials({ key: "remember", value: e.target.checked })
            )
          }
        />
        <Typography
          variant="button"
          fontWeight="regular"
          color="text"
          sx={{ userSelect: "none", ml: -1 }}
        >
          &nbsp;&nbsp;Remember me
        </Typography>
      </Box>
      <Box mt={4} mb={1}>
        <Button
          variant="gradient"
          color="info"
          fullWidth
          onClick={handleSubmit}
        >
          sign in
        </Button>
      </Box>
    </>
  );
}

export default LoginForm;
