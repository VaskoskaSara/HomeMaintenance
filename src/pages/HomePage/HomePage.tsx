import React from "react";
import './style/style.css';


const HomePage: React.FC = () => {
return(
<div  className="bgded" style={{backgroundColor: 'black'}}> 
<div className="header">
  <div  className="wrapper row0">
    <div id="topbar"  className="hoc clear">
      <div  className="fl_left"> 
        <ul  className="nospace">
          <li><i  className="fas fa-phone rgtspace-5"></i> +00 (123) 456 7890</li>
          <li><i  className="far fa-envelope rgtspace-5"></i> homeMaintenance@hotmail.com</li>
        </ul>
      </div>
    </div>
  </div>
  <div  className="wrapper row1">
    <header id="header"  className="hoc clear">
      <div id="logo"  className="fl_left"> 
        <h1><a href="index.html">HOME MAINTENANCE</a></h1> 
      </div>
      <nav id="mainav"  className="fl_right"> 
        <ul  className="clear">
          <li  className="active"><a href="/">Home</a></li>
          <li><a  className="" href="/services">Services</a>
          </li>
          <li><a  className="drop" href="/contact">Contact</a>
          </li>
          <li><a href="#" title="Language"><i  className="fas fa-globe"></i> 
           <ul>
              <li><a href="pages/gallery.html">Gallery</a></li>
            </ul>
          </a></li>
          <li><a href="#" title="Login"><i  className="fas fa-sign-in-alt"></i></a>
          </li>
          <li><a href="#" title="Sign Up"><i  className="fas fa-edit"></i></a>
          </li>
        </ul>
      </nav>
    </header>
  </div>
  </div>
  <div id="pageintro" className="hoc clear home-image"> 
    <article>
      <h3  className="heading">You are on right place because we make your life easier. Join us.</h3>
      <p>Looking for someone to complete an obligation in your home?</p>
      <footer>
        <ul  className="nospace inline pushright">
          <li><a  className="btn" href="/services">Explore services</a></li>
        </ul>
      </footer>
    </article>
  </div>
  <div style={{background: '#f4f3ee', color: '#434040'}}>

    <h1 style={{fontFamily: 'Verdana', paddingTop: '60px', textAlign: 'center'}}>
      You want to join us like employee?
      </h1>
      <div className="group btmspace-50 demo" style={{display: 'flex', background: '#f4f3ee', gap: '200px', margin: '100px 0', paddingBottom: '100px'}}>
        <div className="first" style={{background:'white'}}>
        <div className="card" style={{background:'white', paddingBottom: '30px'}}>
  <img className="card-img-top" style={{padding: '20px', margin: '0 auto', width: '50%', display: 'block'}} src="https://images.unsplash.com/photo-1611641613359-f698d54566dc?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y2l0eSUyMGJ1aWxkaW5nfGVufDB8fDB8fHww" alt="Card image cap" />
  <div className="card-body">
    <h5 className="card-title">Register yourself like business</h5>
   {/* <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p> */}
   <a href="#" style={{color: '#2A53F6'}}>GO TO  <i className='fas fa-arrow-right'></i></a>
  </div>
</div>
        </div>
        <div>
        <div className="card" style={{background:'white', paddingBottom: '30px'}}>
  <img className="card-img-top" style={{padding: '20px', margin: '0 auto', width: '50%', display: 'block'}} src="https://images.unsplash.com/photo-1611641613359-f698d54566dc?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y2l0eSUyMGJ1aWxkaW5nfGVufDB8fDB8fHww" alt="Card image cap" />
  <div className="card-body">
    <h5 className="card-title">Register yourself like individual</h5>
    {/* <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p> */}
    <a href="#" style={{color: '#2A53F6'}}>GO TO  <i className='fas fa-arrow-right'></i>
</a>
  </div>
</div>
      </div>
      </div>
  </div>

  <div id="pageintro" className="hoc clear"> 
    <article>
      <h3  className="heading">Stay updated.</h3>
      <p>Get notified of new services from your inbox.</p>
      <footer style={{display: 'inline-flex', gap:'20px', width: '50%', marginLeft: '30px'}}>
        <input type="email" name="email" placeholder="Enter your email" style={{width: '700px', color: 'grey', paddingLeft: '10px'}} />
          <a href="#" style={{color: 'white', backgroundColor: '#676768', padding: '8px 18px 10px', borderRadius: '12px'}}>Subscribe</a>
      </footer>
    </article>
  </div>

</div>
)
};

export default HomePage;