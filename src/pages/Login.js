import TextField from "@mui/material/TextField";
import { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Alert from "../components/Alert";
import axios from "axios";
import { BASE_API_URL } from "../constant";
import { useDispatch } from "react-redux";
import { updateProfile } from "../redux/actions/authAction";

const schemaSignIn = yup
  .object({
    signInEmail: yup.string().email("รูปแบบอีเมลไม่ถูกต้อง").required("กรุณากรอกอีเมล"),
    signInPassword: yup.string().required("กรุณากรอกรหัสผ่าน"),
  })
  .required();
const schemaSignUp = yup
  .object({
    name: yup.string().required("กรุณากรอกชื่อ"),
    signUpEmail: yup.string().email("รูปแบบอีเมลไม่ถูกต้อง").required("กรุณากรอกอีเมล"),
    signUpPassword: yup.string().required("กรุณากรอกรหัสผ่าน"),
  })
  .required();

const Login = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schemaSignIn),
  });
  const {
    register: registerSignUp,
    handleSubmit: handleSubmitSignUp,
    reset: resetSignUp,
    formState: { errors: errorsSignUp },
  } = useForm({
    resolver: yupResolver(schemaSignUp),
  });

  //call redux action
  const dispatch = useDispatch();

  const history = useHistory();
  const [signIn, setSigIn] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogMeta, setDialogMeta] = useState({ type: "", msg: "" });

  const handleSignIn = async (e) => {
    try {
      const login = await axios.post(`${BASE_API_URL}/login`, {
        email: e.signInEmail,
        password: e.signInPassword,
      });

      //set token on localStorage
      localStorage.setItem("token", JSON.stringify(login.data.access_token));

      //get profile
      const urlProfile = `${BASE_API_URL}/login/profile`;
      const getProfile = await axios.get(urlProfile, {
        headers: {
          Authorization: "Bearer " + login.data.access_token,
        },
      });

      // setDialogMeta({ type: "success", msg: "เข้าสู่ระบบสำเร็จ" });
      dispatch(updateProfile(getProfile.data.user));
      reset();
      history.replace("/");
    } catch (error) {
      setDialogMeta({ type: "error", msg: error.response.data.error.message });
      setDialogOpen(true);
    }
  };
  const handleSignUp = async (e) => {
    try {
      const { name, signUpEmail, signUpPassword } = e;
      // console.log(e.name);
      // console.log(e.signUpEmail);
      // console.log(e.signUpPassword);
      const resp = await axios.post(`${BASE_API_URL}/register/employee`, {
        name: name,
        email: signUpEmail,
        password: signUpPassword,
      });
      setDialogMeta({ type: "success", msg: resp.data.message });
      resetSignUp();
    } catch (error) {
      setDialogMeta({ type: "error", msg: error.response.data.error.message });
    } finally {
      setDialogOpen(true);
    }
  };

  return (
    <>
      <div className="h-screen bg-gray-200">
        <div className="relative z-10 flex max-w-3xl transform -translate-x-1/2 bg-white rounded-lg shadow-lg left-1/2 top-32">
          {/* left */}
          <div className="flex flex-col justify-center flex-1 p-10 overflow-hidden" style={{ height: 460 }}>
            <form className={`${signIn ? "flex" : "hidden opacity-0"} flex-col justify-center`} onSubmit={handleSubmit(handleSignIn)}>
              <h1 className="mb-4 text-4xl font-bold text-center">Sign in</h1>
              <div className="flex items-center justify-center gap-5 my-3">
                <Link to="/" className="flex items-center justify-center w-10 h-10 border border-gray-500 rounded-full ">
                  <i className="text-xl text-blue-500 fab fa-facebook-f"></i>
                </Link>
                <Link to="/" className="flex items-center justify-center w-10 h-10 border border-gray-500 rounded-full ">
                  <i className="text-green-500 fab fa-google-plus-g"></i>
                </Link>
                <Link to="/" className="flex items-center justify-center w-10 h-10 border border-gray-500 rounded-full ">
                  <i className="text-pink-500 fab fa-instagram"></i>
                </Link>
              </div>
              <p className="mb-1 text-center">or use your account</p>
              <TextField
                label="Email"
                variant="standard"
                className="bg-gray-100"
                {...register("signInEmail")}
                error={errors.signInEmail ? true : false}
                helperText={errors.signInEmail ? errors.signInEmail?.message : ""}
              />
              <TextField
                label="password"
                margin="dense"
                variant="standard"
                className="bg-gray-100"
                type="password"
                {...register("signInPassword")}
                error={errors.signInPassword ? true : false}
                helperText={errors.signInPassword?.message}
              />
              <Link to="/" className="my-5 text-center hover:text-red-700">
                Forgot your password?
              </Link>
              <button type="submit" className="py-3 mx-auto text-white bg-red-600 rounded-full cursor-pointer px-14">
                SIGN IN
              </button>
            </form>
            <div className={`flex-col text-center text-white ${signIn ? "hidden opacity-0" : "flex"}`}>
              <h1 className="text-4xl font-bold">Welcome Back!</h1>
              <p className="my-5 text-center">To keep connected with us please login with your personal info</p>
              <p className="py-3 mx-auto text-white border border-white rounded-full cursor-pointer px-14" onClick={() => setSigIn(!signIn)}>
                SIGN IN
              </p>
            </div>
          </div>

          {/* right */}
          <div className="flex flex-col items-center justify-center flex-1 p-10 overflow-hidden text-white" style={{ height: 460 }}>
            <div className={`flex flex-col text-center ${signIn ? "flex" : "hidden opacity-0"}`}>
              <h1 className="text-4xl font-bold">Hello, Friend!</h1>
              <p className="my-5 text-center">Enter your personal details and start journey with us</p>
              <p className="py-3 mx-auto text-white border border-white rounded-full cursor-pointer px-14" onClick={() => setSigIn(!signIn)}>
                SIGN UP
              </p>
            </div>
            <form className={`flex flex-col text-center text-black ${signIn ? "hidden" : "flex"}`} onSubmit={handleSubmitSignUp(handleSignUp)}>
              <h1 className="text-4xl font-bold">Create Account</h1>
              <div className="flex items-center justify-center gap-5 my-3">
                <Link to="/" className="flex items-center justify-center w-10 h-10 border border-gray-500 rounded-full ">
                  <i className="text-xl text-blue-500 fab fa-facebook-f"></i>
                </Link>
                <Link to="/" className="flex items-center justify-center w-10 h-10 border border-gray-500 rounded-full ">
                  <i className="text-green-500 fab fa-google-plus-g"></i>
                </Link>
                <Link to="/" className="flex items-center justify-center w-10 h-10 border border-gray-500 rounded-full ">
                  <i className="text-pink-500 fab fa-instagram"></i>
                </Link>
              </div>
              <p className="mb-3 text-center">or use your email for registration</p>
              <TextField
                label="Name"
                variant="standard"
                className="bg-gray-100"
                {...registerSignUp("name")}
                error={errorsSignUp.name ? true : false}
                helperText={errorsSignUp.name?.message}
              />
              <TextField
                label="Email"
                variant="standard"
                margin="dense"
                className="bg-gray-100"
                {...registerSignUp("signUpEmail")}
                error={errorsSignUp.signUpEmail ? true : false}
                helperText={errorsSignUp.signUpEmail?.message}
              />
              <TextField
                label="Password"
                variant="standard"
                margin="dense"
                type="password"
                className="bg-gray-100"
                {...registerSignUp("signUpPassword")}
                error={errorsSignUp.signUpPassword ? true : false}
                helperText={errorsSignUp.signUpPassword?.message}
              />
              <button type="submit" className="py-3 mx-auto mt-6 text-white bg-red-600 rounded-full cursor-pointer px-14">
                SIGN UP
              </button>
            </form>
          </div>
          <div className={`login-active transform trans-3 ${signIn ? "" : "-translate-x-full"}  bg-red-500`} style={{ zIndex: -1 }}></div>
        </div>
      </div>
      {dialogOpen && <Alert setDialogOpen={setDialogOpen} dialogOpen={dialogOpen} meta={dialogMeta} />}
    </>
  );
};

export default Login;
