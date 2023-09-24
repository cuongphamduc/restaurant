import React, { useState } from 'react'
import "./Login.css"
import { useForm } from 'react-hook-form'
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import loginApi from '../../api/LoginApi';
import InputField from '../../components/form-controls/input-field/InputField';
import { useSelector, useDispatch } from 'react-redux'
import { setIsLogin, setRole, setUserName } from './LoginSlice';

const Login = () => {
  const isLogin = useSelector((state) => state.login.isLogin)
  const [isError, setIsError] = useState(false)
  const dispatch = useDispatch()

  const schema = yup.object().shape({
    tennguoidung: yup.string().required('!'),
    matkhau: yup.string().required('!'),
  });

  const form = useForm({
    defaultValues: {
      tennguoidung: '',
      matkhau: '',
    },
    resolver: yupResolver(schema),
  })

  const handleSubmit = (values) => {
    // console.log("ok")
    // if (values.tennguoidung == "vta" && values.matkhau == "123"){
    //   dispatch(setIsLogin())
    //   setIsError(false)
    // }
    // else{
    //   setIsError(true)
    // }

    (async () => {
      try {
        let formData = {
          tennguoidung: values.tennguoidung,
          matkhau: values.matkhau
        }
        const data = await loginApi.login(formData);
        console.log(data)
        dispatch(setIsLogin())
        dispatch(setRole(data.quyen))
        dispatch(setUserName(values.tennguoidung))
        setIsError(false)
      } catch (error) {
        setIsError(true)
        console.log('Failed to fetch customer list: ', error);
      }
    })();
    form.reset()
  }

  return (
            <form onSubmit={form.handleSubmit(handleSubmit)}>
    <div className='login-container'>
        <div className="login-container__form">
            <div className="login-container__logo"></div>
              <InputField name="tennguoidung" form={form} type="text" placeholder="Nhập tài khoản"></InputField>
              <InputField name="matkhau" form={form} type="password" placeholder="Nhập mật khẩu"></InputField>
              {isError && <i>Tài khoản hoặc mật khẩu không đúng!</i>}
              <button type='submit'>Đăng nhập</button>
        </div>
    </div>
            </form>
  )
}

export default Login