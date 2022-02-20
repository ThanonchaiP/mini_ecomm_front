import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { TextField } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { updateProfile } from "../redux/actions/authAction";
import { BASE_API_URL } from "../constant/index";
import { toBase64, toUrl } from "../function/index";
import axios from "axios";
import Alert from "../components/Alert";
import "./Profile.css";

let imageBase64;

const schema = yup.object().shape({
  fullname: yup
    .string()
    .required("กรุณากรอกชื่อผู้ใช้")
    .matches(/^[^<>*!+-@#  \t\r\n\v\f]+$/, "กรอกเฉพาะตัวอักษรเท่านั้น"),
  email: yup.string().required("กรุณากรอกอีเมล").email("อีเมลไม่ถูกต้อง"),
  tel: yup.string().matches(/^[0-9]+$|^$/, "กรุณาตรวจสอบเบอร์โทร"),
  address: yup.string(),
  password: yup.string(),
  newPassword: yup.string(),
});

const Profile = () => {
  //form
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const dispatch = useDispatch();
  //state
  const profile = useSelector((state) => state.authReducer.profile);
  const [img, setImg] = useState(profile?.photo);
  //alert
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogMeta, setDialogMeta] = useState({ type: "", msg: "" });

  //functions
  const onSubmit = async (data) => {
    try {
      const resp = await axios.put(`${BASE_API_URL}/customer/update/${profile._id}`, {
        name: data.fullname,
        email: data.email,
        tel: data.tel,
        address: data.address,
        password: data.password,
        new_password: data.newPassword,
        image_name: profile?.image_url,
        image_base64: imageBase64,
      });
      dispatch(updateProfile(resp.data.data));
      reset({ password: null, newPassword: null }); //set field password เป็น null
      setDialogMeta({ type: "success", msg: resp.data.message });
    } catch (error) {
      setDialogMeta({ type: "error", msg: error.response.data.error.message });
    } finally {
      setDialogOpen(true);
    }
  };
  const onChangePicture = async (e) => {
    imageBase64 = await toBase64(e);
    setImg(await toUrl(e));
  };

  return (
    <>
      <div className="max-w-5xl mx-auto my-10 text-white bg-blue-800 rounded-md p-7 profile-wrap">
        <h1 className="m-0 text-2xl font-bold">My Profile</h1>
        <p className="mb-2 text-lg font-bold text-gray-200">Manage and protect your account</p>
        <form onSubmit={handleSubmit(onSubmit)} className="flex py-4 bg-white rounded-md px-7 profile-content">
          <div className="flex flex-col gap-5">
            <div className="flex gap-5">
              <TextField
                defaultValue={profile.name}
                size="Normal"
                label="Fullname"
                variant="standard"
                className="bg-gray-100 w-72"
                {...register("fullname")}
                error={errors.fullname ? true : false}
                helperText={errors.fullname ? errors.fullname?.message : ""}
              />
              <TextField defaultValue={profile.email} label="Email" variant="standard" className="bg-gray-100 w-72" {...register("email")} error={errors.email ? true : false} helperText={errors.email ? errors.email?.message : ""} />
            </div>
            <div className="flex gap-5">
              <TextField defaultValue={profile.tel} label="Tel" variant="standard" className="bg-gray-100 w-72" {...register("tel")} error={errors.tel ? true : false} helperText={errors.tel ? errors.tel?.message : ""} />
              <TextField defaultValue={profile.address} label="Address" variant="standard" className="bg-gray-100 w-72" {...register("address")} error={errors.address ? true : false} helperText={errors.address ? errors.address?.message : ""} />
            </div>
            <div className="flex gap-5">
              <TextField label="Password" variant="standard" className="bg-gray-100 w-72" type="password" {...register("password")} error={errors.password ? true : false} helperText={errors.password?.message} />
              <TextField label="New Password" variant="standard" className="bg-gray-100 w-72" type="password" {...register("newPassword")} error={errors.newPassword ? true : false} helperText={errors.newPassword ? errors.newPassword?.message : ""} />
            </div>
            <button className="py-2 mt-2 bg-blue-700 rounded-md w-28">Submit</button>
          </div>
          <div className="w-full profile-img">
            <img src={img ? img : "https://www.w3schools.com/howto/img_avatar.png"} alt="" />
            <input type="file" onChange={onChangePicture} accept="image/*" id="file" />
            <label htmlFor="file" className="bg-blue-700">
              Select Image
            </label>
          </div>
        </form>
      </div>
      {dialogOpen && <Alert setDialogOpen={setDialogOpen} dialogOpen={dialogOpen} meta={dialogMeta} />}
    </>
  );
};

export default Profile;
