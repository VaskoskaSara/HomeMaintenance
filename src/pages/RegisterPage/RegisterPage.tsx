import useSWR from 'swr';
import './style.css';
import { useEffect } from 'react';

const RegisterPage : React.FC =  () => {

  const { data, isLoading } = useSWR('pokemon?limit=20');

  useEffect(() => {
    const signUpButton = document.getElementById('signUp');
    const signInButton = document.getElementById('signIn');
    let container = document.getElementById('container');
  
  signUpButton!.addEventListener('click', () => {
      container!.classList.add("right-panel-active")
  });
  
  signInButton!.addEventListener('click', () => {
    container!.classList.remove("right-panel-active")
  });

    return () => {
        if (signUpButton) {
          signUpButton.removeEventListener('click', ()=>{});
        }
    };
}, []); // Empty dependency array ensures the effect runs only once on component mount


    return(
      <>
  <head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <link rel="stylesheet" href="style.css" />
  </head>
  <div  className="wrapper">
    <header id="header" style={{color:'white'}} className="hoc clear">
      <div id="logo"  className="fl_left"> 
        <h1><a href="index.html">HOME MAINTENANCE</a></h1> 
      </div>
      <nav id="mainav"  className="fl_right"> 
        <ul  className="clear">
          <li><a href="/">Home</a></li>
          <li><a  className="active" href="/services">Services</a>
          </li>
          <li><a href="/contact">Contact</a>
          </li>
          <li><a href="" title="Language" className="drop"><i  className="fas fa-globe"></i></a>
            <ul>
                <li>
                    EN
                </li>
                <li>MK</li>
            </ul>
           <ul>
            </ul></li>
        </ul>
      </nav>
    </header>
  
  
  </div>

<div className="container registerPage" id="container" style={{color: '#170d0d'}}>

  <div className="form-container sign-up-container">

      <div className='container' style={{textAlign:'left'}}>
      <header>Registration Form</header>
      <form action="#" className="form" style={{display:'grid'}}>
      <label className="label-form" style={{textAlign: 'left'}}>Register yourself like</label>
<div style={{display: 'inline-flex', gap: '26px', marginTop: '8px'}}>
 <div style={{border: '1px solid #ddd', borderRadius: '6px'}}>  
<label className="radio-button">
  <input type="radio" name="example-radio" value="option1" />
  <span className="radio"></span>
  Customer
</label>
</div>
<div style={{border: '1px solid #ddd', borderRadius: '6px'}}>  
<label className="radio-button">
  <input type="radio" name="example-radio" value="option2" />
  <span className="radio"></span>
  Employee as individual
</label>
</div>
<div style={{border: '1px solid #ddd', borderRadius: '6px'}}>  
<label className="radio-button">
  <input type="radio" name="example-radio" value="option3" />
  <span className="radio"></span>
  Employee as business
</label>
</div>
</div>
        <div className="column">
        <div className="input-box">
          <label className="label-form">Full Name</label>
          <input type="text" placeholder="Enter full name" required />
          </div>
          <div className="input-box">
          <label className="label-form">Address</label>
          <input type="text" placeholder="Enter street address" required />
          </div>
     </div>

     <div className="input-box">
          <label className="label-form">Email Address</label>
          <input type="text" placeholder="Enter email address" required />
        </div>

        <div className='column'>
        <div className="input-box">
            <label className="label-form">Password</label>
            <input type="password" placeholder="Enter your password" required />
          </div>
          <div className="input-box">
            <label className="label-form">Confirm password</label>
            <input type='password' placeholder="Confirm your password" required />
          </div> 
        </div>

        <div className="column">
          <div className="input-box">
            <label className="label-form">Phone Number</label>
            <input type="number" placeholder="Enter phone number" required />
          </div>
          <div className="input-box">
            <label className="label-form">Birth Date</label>
            <input type="date" placeholder="Enter birth date" required />
          </div>
        </div>
        <div className="column">
        <div className="input-box">
            <label className="label-form">Position</label>
            <div className="select-box">
              <select>
                <option hidden>Position</option>
                <option>Moler</option>
                <option>Elektrichar</option>
                <option>Vodovod</option>
                <option>Other</option>
              </select>
            </div>
          </div>
          <div className="input-box">
            <label className="label-form">Write down another option</label>
            <input type="text" placeholder="Enter the position" />
          </div>
        </div>

          <div className="input-box">
            <label className="label-form">Experience(in months)</label>
            <input type="number" placeholder="Enter your experince in months" required />
          </div>
          <div className="column input-box">
            <div>
          <label className="label-form">Upload your photo</label>
            <input name="image" type="file" accept="image/*"/>
            </div>
            <div>
          <label className="label-form">Upload photos of your work</label>
            <input name="image" type="file"  multiple accept="image/*"/>
            </div>
          </div>
        <button>Submit</button>
      </form>
      </div>
      </div>
  <div className="form-container sign-in-container">
  <div className='container' style={{textAlign:'left', paddingTop:'100px'}}>
      <header>Login</header>
      <form action="#" className="form" style={{display:'grid', gridTemplateColumns:'0.8fr'}}>
      <div className="input-box">
          <label className="label-form">Email Address</label>
          <input type="text" placeholder="Enter email address" required />
        </div>
        <div className="input-box">
            <label className="label-form">Password</label>
            <input type="password" placeholder="Enter your password" required />
          </div>
          <button>Submit</button>
        </form>
  </div>
  </div>
  <div className="overlay-container">
		<div className="overlay">
			<div className="overlay-panel overlay-left">
				<h1>Welcome Back!</h1>
				<p style={{marginBottom:'10px'}}>To keep connected with us please login with your personal info</p>
				<button className="ghost" id="signIn" style={{backgroundColor: 'black', border: '1px solid'}}>Sign In</button>
			</div>
			<div className="overlay-panel overlay-right">
				<h1>Hello, Friend!</h1>
				<p>Enter your personal details and start journey with us</p>
				<button className="ghost" id="signUp" style={{border: '1px solid', color: 'white', background: 'black', marginTop: '10px'}}>Sign Up</button>
			</div>
		</div>
	</div>
  </div>
      <script src="script.js"></script>
      </>
    )};

export default RegisterPage;