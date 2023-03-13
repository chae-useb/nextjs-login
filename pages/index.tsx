import type { NextPage, NextPageContext } from "next";
import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/router";
import axios from "axios";

interface FormValue {
  id: string;
  password: string;
}


const Home: NextPage = () => {
  const router = useRouter(); //router를 사용하기 위해 선언

  /**
   * React-hook-form을 사용하기 위해 import 후 선언한 변수
   * register: input이 받을 값을 정의
   * handleSubmit: 각 항목이 입력되었을 때 submit 이벤트를 처리
   * watch: register 한 항목의 변경사항을 추적
   * errors: 유효성이 통과되지 않으면 에러 상태를 내보내줍니다.
   */
  const { register, handleSubmit, watch, formState: { errors } } = useForm<FormValue>();

  /**
   * Form에서 summit을 하게 되면 실행되는 함수
   * 이 때 form에서 받아온 data를 매개변수로 사용하여 값을 받아온다.
   * 비밀번호를 BASE64로 변환하고, 이후 객체를 새로 만든다.
   */
  const onSubmitHandler: SubmitHandler<FormValue> = (data) => {
    const loginId = data.id;
    const base64Pw = btoa(data.password);
    const newLoginArray = {
      id: loginId,
      password: base64Pw,
    };

    /**
     * axios를 사용하여 로그인 정보를 담아 POST 한다.
     * 이 후 응답 받은 accessToken을 cookie에 저장한다.
     * 그리고 comment 컴포넌트를 출력할 수 있도록 replace 한다.
     */
    axios
      .post("/api/user", newLoginArray)
      .then((response) => {
        const { accessToken } = response.data;
        cookies.set("LoginToken", accessToken, {
          path: "/",
          secure: true,
          sameSite: "none",
        });

        router.replace("/comment");
      })
      .catch((error) => {
        alert("아이디 또는 비밀번호를 확인해주세요.");
      });
  };

  return (
    <div className="wrap">
       <form onSubmit={handleSubmit(onSubmitHandler)}>
          <div>ID</div>
          <input {...register("id")} placeholder="ID"/>
          <div>PASSWORD</div>
          <input {...register("password")} type="password" placeholder="PASSWORD" />
          <button>로그인</button>
       </form>
    </div>
  );
};

export default Home;