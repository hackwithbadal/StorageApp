import * as React from 'react';
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
// import Link from '@mui/material/Link';
import { Link } from 'react-router-dom'
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Group, FileButton } from '@mantine/core'
import axios from 'axios';
import UniversalCookie from 'universal-cookie';
import { useSelector, useDispatch } from 'react-redux';
import { adddata } from '../../redux/UserSlice';
import { loginState } from '../../redux/IsloginSlice';
import { useNavigate } from 'react-router-dom';
import Navbar from '../layout/Navbar';

const theme = createTheme();

function SignUp() {
  const loginData = useSelector((state) => state.islogin.value);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post('http://localhost:3001/register', {
      name: name,
      lastname: lastname,
      email: email,
      number: number,
      addr: addr,
      perposeOfUse: perpose,
      password: password
      // file: file
    }).then((response) => {
      if (response.data.message === 'Successfully') {
        dispatch(adddata(response.data));
        dispatch(loginState(true))
        const Cookie = new UniversalCookie();
        Cookie.set('jwt', response.data.token, { path: '/' });
        navigate('/dashboard')
      }
      alert(response.data.message);
    })
  };
  const [file, setFile] = React.useState('');
  const [name, setName] = React.useState('');
  const [lastname, setLastname] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [number, setNumber] = React.useState('');
  const [addr, setAddr] = React.useState('');
  const [perpose, setPerpose] = React.useState('');
  const [password, setPassword] = React.useState('');

  return (
    <ThemeProvider theme={theme}>
      {/* <section>
        <Navbar />
      </section> */}
      <div class="area" style={{ paddingTop: "20px" }}>
        <ul class="circles">
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </ul>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              // marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Typography component="h1" variant="h5">
              Sign up
            </Typography>

            <Group position="center">
              <FileButton onChange={setFile} name='myfile' accept="image/png,image/jpeg">
                {(props) => <Button {...props}>Upload image</Button>}
              </FileButton>
            </Group>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete="given-name"
                    name="name"
                    required
                    fullWidth
                    id="firstName"
                    label="First Name"
                    autoFocus
                    onChange={(e) => setName(e.target.value)}
                  />
                </Grid>
                {
                  console.log(name)
                }
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    id="lastName"
                    label="Last Name"
                    name="lastname"
                    autoComplete="family-name"
                    onChange={(e) => setLastname(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="number"
                    label="number"
                    type="number"
                    id="number"
                    autoComplete="set-number"
                    onChange={(e) => setNumber(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="address"
                    label="address"
                    id="address"
                    onChange={(e) => setAddr(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Purpose of use</InputLabel>
                    <Select
                      required
                      labelId="demo-simple-select-label"
                      id="purpose"
                      label="Age"
                      name='purpose'
                      onChange={(e) => setPerpose(e.target.value)}
                    >
                      <MenuItem value={"Ten"}>Personal</MenuItem>
                      <MenuItem value={"Twenty"}>Company</MenuItem>
                      <MenuItem value={"Thirty"}>Collage</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="new-password"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControlLabel
                    control={<Checkbox value="allowExtraEmails" color="primary" />}
                    label="I want to receive inspiration, marketing promotions and updates via email."
                    defaultChecked
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign Up
              </Button>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link to="/" style={{ color: "blue" }}>
                    Already have an account? Sign in
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
        {
          // console.log(name, lastname, email, number, addr, perpose, password, file)
          // console.log(UserData)
        }
      </div >
    </ThemeProvider>

  );
}

export default SignUp;