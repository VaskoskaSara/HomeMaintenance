import { yupResolver } from '@hookform/resolvers/yup';
import { Collapse, Layout, Menu } from "antd";
import { Content, Header } from "antd/es/layout/layout";
import { ChangeEvent, MutableRefObject, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation } from "react-router-dom";
import { postFormFetcher, postJsonFetcher } from "src/api/apiCommand";
import { getFetcher } from "src/api/apiQuery";
import useSWR from "swr";
import useSWRMutation from 'swr/mutation';
import validator from 'validator';
import * as yup from "yup";
import { menuItems } from "../HomePage/HomePage";
import { LoginForm } from "./components/LoginForm";
import { RegisterForm } from "./components/RegisterForm";
import { ApiResponse, Position, UserType } from "./RegisterPage.props";
import "./style.css";

const loginSchema = yup
.object()
.shape({
  email: yup.string().required("Email is a required").email("Email is not in valid format"),
  password: yup.string().required().min(6)})
.required();

const schema = yup
.object()
.shape({
  userType: yup.number()
  .oneOf(Object.values([0,1,2]))
  .required('Field is required'),
  fullName: yup.string().required(),
  city: yup.string().required(),
  email: yup.string().required("Email is a required").email("Email is not in valid format"),
  password: yup.string().required(),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), undefined], 'Passwords must match').required(),
  phoneNumber: yup.string().required(),
  birthDate: yup.date().nullable().transform((value, originalValue) => {
    if (originalValue === '') return null;
    return value;
  }).required('*Birth date is required').max(new Date(), 'Date must be in the past'),
  positionId: yup.string().required("Position is a required").test(value => value !== ""),
  experience: yup.number().positive().required(),
  price: yup.number().positive().required(),
  avatar: yup.mixed<File>().required('A photo is required'),
  photos: yup.mixed<File[]>()
  // .test('FILE_SIZE', 'File is too large', value => value && value.size <= 1048576)
})
.required();

function RegisterPage(){
  const location = useLocation();

  const { data : positions, isLoading } = useSWR<ApiResponse<Position[]>>('/api/user/positions', getFetcher);
  const [multipleImages, setMultipleImages] = useState([]);

  const {
    register,
    setValue,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const {
    register : login,
    setValue : setLoginValue,
    handleSubmit : handleLoginSubmit,
    formState: { errors: loginErrors },
  } = useForm({ resolver: yupResolver(loginSchema) });

  const { trigger } = useSWRMutation(
    "/api/user/userRegistrations",
    postFormFetcher
  );

  const { trigger : triggerLogin } = useSWRMutation(
    "/api/user/userLogin",
    postJsonFetcher
  );

  const selectedOption = watch("positionId");
  const [isPasswordValid, setIsPasswordValid] = useState<boolean | null>(null);

  const onSubmitData= handleSubmit(async(data) => {
    try {
      const formDataToSend = new FormData();
      
      const filteredModel = Object.entries(data)
 .filter(([key]) => key!== 'photos')
 .reduce((acc, [key, value]) => {
    acc[key] = value;
    return acc;
  },  {} as { [key: string]: any });

      for (const key in filteredModel) {
        if (Object.prototype.hasOwnProperty.call(filteredModel, key)) {
          formDataToSend.append(key, filteredModel[key]);
        }
      }

      const fileList = data.photos;
      
      if(fileList){
      for (let i = 0; i < fileList.length; i++) {
        formDataToSend.append("photos", fileList[i]);
      };
      }
      
      trigger(formDataToSend);
     console.log(data);
    } catch (ex) {
      console.log(ex);
    }
  });

  const onLoginSubmitData= handleLoginSubmit(async(data) => {
    try {
      
     triggerLogin(data);
     console.log(data);
    } catch (ex) {
      console.log(ex);
    }
  });

  const IsValid = (value: string) => { 
    if (validator.isStrongPassword(value, { 
        minLength: 8, minLowercase: 1, 
        minUppercase: 1, minNumbers: 1, minSymbols: 1 
    })) { 
       setIsPasswordValid(true);
    } else { 
      setIsPasswordValid(false);
    } 
  } 
  const hiddenInputRef : MutableRefObject<HTMLElement | null> = useRef(null);
  const [preview, setPreview] = useState<string | undefined>();

  useEffect(() => {
    const signUpButton = document.getElementById("signUp");
    const signInButton = document.getElementById("signIn");
    let container = document.getElementById("container");

    if(location.pathname.endsWith("register")){
      container!.classList.add("right-panel-active");
    }

    signUpButton!.addEventListener("click", () => {
      container!.classList.add("right-panel-active");
    });
    signInButton!.addEventListener("click", () => {
      container!.classList.remove("right-panel-active");
    });

    document.addEventListener("DOMContentLoaded", function() {
      const sections = document.querySelectorAll('.section');
    
      sections.forEach(function(section) {
        const arrow = section.querySelector('.arrow');
        const content = section.querySelector('.content');
    
        arrow?.addEventListener('click', function() {
          content?.classList.toggle('collapsed');
          arrow.classList.toggle('down');
        });
      });
    });

    return () => {
      if (signUpButton) {
        signUpButton.removeEventListener("click", () => {});
      }
    };
  }, []);

  const [isLogin, setIsLogin] = useState(true);

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  return (
    <>

<Layout>
      <Header style={{backgroundColor: "black"}}>
        <h1 style={{ minWidth: 0, float: "left", color: "white", fontFamily: "" }}>HOME MAINTENANCE</h1>
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={['1']}
          items={menuItems}
          style={{ backgroundColor: "black", float:"right" }} />
      </Header>
    <Content className="slider-container" style={{margin: "200px"}}>
    <div className={`slider-content ${isLogin ? 'login' : 'register'}`}>
        <LoginForm />
          <RegisterForm />
        {/* <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-left">
              <h1>Welcome Back!</h1>
              <p style={{ marginBottom: "10px" }}>
                To keep connected with us please login with your personal info
              </p>
              <button
                className="ghost"
                id="signIn"
                style={{ backgroundColor: "black", border: "1px solid" }}
              >
                Sign In
              </button>
            </div>
            <div className="overlay-panel overlay-right">
              <h1>Hello, Friend!</h1>
              <p>Enter your personal details and start journey with us</p>
              <button
                className="ghost"
                id="signUp"
                style={{
                  border: "1px solid",
                  color: "white",
                  background: "black",
                  marginTop: "10px",
                }}
                onClick={toggleForm}
              >
                Sign Up
              </button>
            </div>
          </div>
        </div> */}
      </div>
    </Content>

      </Layout>




      <div
        className="container registerPage"
        id="container"
        style={{ color: "#170d0d"}}
      >
        <div className="form-container sign-up-container">
          <div className="container" style={{ textAlign: "left" }}>
            <header>Registration Form</header>
            {!isLoading ?
            <form
              action="#"
              onSubmit={onSubmitData}
              className="form"
              style={{ display: "grid" }}
            >

              <Collapse>
                {/* <AccordionSummary expandIcon={<ArrowDropDownIcon />}>
                  General information
                </AccordionSummary> */}
                <Collapse>
                <div className="column">
                <div className="input-box">
                  <label className="label-form">Full Name</label>
                  <input
                    type="text"
                    placeholder="Enter full name"
                    {...register("fullName")}
                    onBlur={(event: any) => {
                      setValue("fullName", event.target.value);
                    }}
                  />
                  {errors.fullName?.type === "required" && (
                    <p role="alert" className="error-message">
                      *Full name is required
                    </p>
                  )}
                </div>
                <div className="input-box">
                  <label className="label-form">Address(city)</label>
                  <input
                    type="text"
                    placeholder="Enter a city"
                    {...register("city")}
                    onBlur={(event: any) => {
                      setValue("city", event.target.value);
                    }}
                  />
                  {errors.city?.type === "required" && (
                    <p role="alert" className="error-message">
                      *City is required
                    </p>
                  )}
                </div>
              </div>
              <div className="column">
                <div className="input-box">
                  <label className="label-form">Phone Number</label>
                  <input
                    type="number"
                    placeholder="Enter phone number"
                    {...register("phoneNumber")}
                    onBlur={(event: any) => {
                      setValue("phoneNumber", event.target.value);
                    }}
                  />
                  {errors.phoneNumber?.type === "required" && (
                    <p role="alert" className="error-message">
                      *Phone number is required
                    </p>
                  )}
                </div>
                <div className="input-box">
                  <label className="label-form">Birth Date</label>
                  <input
                    type="date"
                    placeholder="Enter birth date"
                    {...register("birthDate")}
                    onBlur={(event: any) => {
                      setValue("birthDate", event.target.value);
                    }}
                  />
                  {errors.birthDate && (
                    <p role="alert" className="error-message">
                      {errors.birthDate.message}
                    </p>
                  )}
                </div>
              </div>
                </Collapse>
              </Collapse>

              <Collapse>
                {/* <AccordionSummary expandIcon={<ArrowDropDownIcon />}>
                Credential information
                </AccordionSummary> */}
                <Collapse>
              <div className="input-box">
                <label className="label-form">Email Address</label>
                <input
                  type="text"
                  placeholder="Enter email address"
                  {...register("email")}
                  onBlur={(event: any) => {
                    setValue("email", event.target.value);
                  }}
                />
                {errors.email && (
                  <p role="alert" className="error-message">
                   *{errors.email.message}
                  </p>
                )}
              </div>
              <div className="column">
                <div className="input-box">
                  <label className="label-form">Password</label>
                  <input
                    type="password"
                    placeholder="Enter your password"
                    {...register("password")}
                    onBlur={(event: any) => {
                      event.target.value !== '' && IsValid(event.target.value);
                      if(isPasswordValid){
                      setValue("password", event.target.value)
                      }
                      }
                    }
                  />
                  {errors.password?.type === "required" && (
                    <p role="alert" className="error-message">
                      *Password is required
                    </p>
                  )}
                  {isPasswordValid === false && (
                    <p role="alert" className="error-message">
                      *Password is not strong enough
                    </p>
                  )}
                </div>
                <div className="input-box">
                  <label className="label-form">Confirm password</label>
                  <input
                    type="password"
                    placeholder="Confirm your password"
                    {...register("confirmPassword")}
                    onBlur={(event: any) => {
                      setValue("confirmPassword", event.target.value);
                    }}
                  />
                  {errors.confirmPassword?.message === "Passwords must match" && errors.password?.type !== "required" && (
                    <p role="alert" className="error-message">
                      *{errors.confirmPassword?.message}
                    </p>
                  )}
                </div>
              </div>
              </Collapse>
              </Collapse>

              <Collapse>
                {/* <AccordionSummary expandIcon={<ArrowDropDownIcon />}>
                Positions' information
                </AccordionSummary> */}
                <Collapse>
              <label className="label-form" style={{ textAlign: "left" }}>
                Register yourself like
              </label>
              <div
                style={{
                  display: "inline-flex",
                  gap: "26px",
                  marginTop: "8px",
                }}
              >
                <div style={{ border: "1px solid #ddd", borderRadius: "6px" }}>
                  <label className="radio-button">
                    <input
                      type="radio"
                      value={UserType.Customer}
                      onClick={(event: any) => {
                        setValue("userType", event.target.value);
                      }}
                      {...register("userType")}
                    />
                    <span className="radio"></span>
                    Customer
                  </label>
                </div>
                <div style={{ border: "1px solid #ddd", borderRadius: "6px" }}>
                  <label className="radio-button">
                    <input
                      type="radio"
                      value={UserType.IndividualEmployee}
                      onClick={(event: any) => {
                        setValue("userType", event.target.value);
                      }}
                      {...register("userType")}
                    />
                    <span className="radio"></span>
                    Employee as individual
                  </label>
                </div>
                <div style={{ border: "1px solid #ddd", borderRadius: "6px" }}>
                  <label className="radio-button">
                    <input
                      type="radio"
                      value={UserType.BusinessEmployee}
                      onClick={(event: any) => {
                        setValue("userType", event.target.value);
                      }}
                      {...register("userType")}
                    />
                    <span className="radio"></span>
                    Employee as business
                  </label>
                </div>
              </div>
              {errors.userType?.ref && (
                    <p role="alert" className="error-message">
                      *User type is required
                    </p>
                  )}
              <div className="column">
                <div className="input-box" style={{width: '50%'}}>
                  <label className="label-form">Position</label>
                  <div className="select-box">
                    <select {...register("positionId")}>
                    <option hidden>Position</option>
                    {positions!.data.map((position : Position) => {
                      return <option value={position.id}>{position.positionName}</option>
                    }) 
                     }
                     </select>
                    {/* </select> */}
                  </div>
                  {errors.positionId && (
                    <p role="alert" className="error-message">
                      *{errors.positionId.message}
                    </p>
                  )}
                </div>
                {selectedOption === "option4" && (
                <div className="input-box"  style={{width: '50%'}}>
                  <label className="label-form">
                    Write down another option
                  </label>
                  <input type="text" placeholder="Enter the position" />
                </div>
                )}
              </div>
              <div className="input-box">
                <label className="label-form">Price</label>
                <input
                  type="number"
                  step="0.1"
                  placeholder="Enter your price"
                  {...register("price")}
                  onBlur={(event: any) => {
                    setValue("price", event.target.value);
                  }}
                />
                {errors.price && (
                  <p role="alert" className="error-message">
                    *Price is required
                  </p>
                )}
              </div>
              <div className="input-box">
                <label className="label-form">Experience(in months)</label>
                <input
                  type="number"
                  step="0.1"
                  placeholder="Enter your experince in months"
                  {...register("experience")}
                  onBlur={(event: any) => {
                    setValue("experience", event.target.value);
                  }}
                />
                {errors.experience && (
                  <p role="alert" className="error-message">
                    *Experience is required
                  </p>
                )}
              </div>
              </Collapse>
              </Collapse>

              <Collapse>
                {/* <AccordionSummary expandIcon={<ArrowDropDownIcon />}>
                Photos (optional)
                </AccordionSummary> */}
                <Collapse>
              <div className="column">
                <div>
                  {/* <label className="label-form">Upload your photo</label>
                  <input  {...register("
                  ")} name="image" type="file" accept="image/*"/> */}
                  <label>Profile picture</label>
                  <input
                  //  {...register("avatar")}
                   onChange={(event : React.ChangeEvent<HTMLInputElement>) => {
                    if(event.target.files !== null){
                      setValue("avatar", event.target.files[0]);
                    }
                  }}
                   accept="image/*"
                   type="file"
                   name="profilePicture"
                  />
                  {errors.avatar && (
                  <p role="alert" className="error-message">
                    *Photo is required
                  </p>
                )}
                </div>
                <div>
                  <label className="label-form">
                    Upload photos of your work
                  </label>
                  <input name="images" 
                  type="file" 
                  multiple 
                  accept="image/*" 
                  onChange={(event: ChangeEvent<HTMLInputElement>) => {
                    if (event.target.files) {
                      // setMultipleImages((prevImages) => prevImages.concat(event.target.files));
                     // setValue("photos", event.target.files);
                    }
                  }}
                  />
                  {/* {errors.avatar && (
                  <p role="alert" className="error-message">
                    *Photos is required
                  </p>
                )} */}
                </div>
              </div>
              </Collapse>
              </Collapse>

              <button>Submit</button>
            </form>
            : <div>Loading</div>}
          </div>
        </div>
        {/* LOGIN */}
        <div className="form-container sign-in-container">
          <div
            className="container"
            style={{ textAlign: "left", paddingTop: "100px" }}
          >
            <header>Login</header>
            <form
              action="#"
              className="form"
              onSubmit={onLoginSubmitData}
              style={{ display: "grid", gridTemplateColumns: "0.8fr" }}
            >
              <div className="input-box">
                <label className="label-form">Email Address</label>
                <input {...login("email")} 
                  onBlur={(event: any) => {
                    setLoginValue("email", event.target.value);
                  }} 
                  type="text" 
                  placeholder="Enter your email address" />
                  {loginErrors.email?.type === "required" && (
                    <p role="alert" className="error-message">
                      *Email is required
                    </p>
                  )}
              </div>
              <div className="input-box">
                <label className="label-form">Password</label>
                <input  {...login("password")} 
                  onBlur={(event: any) => {
                    setLoginValue("password", event.target.value);
                  }} 
                 type="password" 
                 placeholder="Enter your password" />
                 {loginErrors.password?.type === "required" && (
                    <p role="alert" className="error-message">
                      *Password is required
                    </p>
                  )}
              </div>
              <button>Submit</button>
            </form>
          </div>
        </div>
        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-left">
              <h1>Welcome Back!</h1>
              <p style={{ marginBottom: "10px" }}>
                To keep connected with us please login with your personal info
              </p>
              <button
                className="ghost"
                id="signIn"
                style={{ backgroundColor: "black", border: "1px solid" }}
              >
                Sign In
              </button>
            </div>
            <div className="overlay-panel overlay-right">
              <h1>Hello, Friend!</h1>
              <p>Enter your personal details and start journey with us</p>
              <button
                className="ghost"
                id="signUp"
                style={{
                  border: "1px solid",
                  color: "white",
                  background: "black",
                  marginTop: "10px",
                }}
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
      <script src="script.js"></script>
    </>
  );
};

export default RegisterPage;
