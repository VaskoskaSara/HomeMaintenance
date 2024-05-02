import { useNavigate } from "react-router-dom";
import './star.css';
import './style.css';

const Services: React.FC = () => {
  const history = useNavigate();

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
          <li ><a href="/">Home</a></li>
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
            <li><a href="pages/gallery.html">Gallery</a></li>
          <li><a href="#" title="Login"><i  className="fas fa-sign-in-alt"></i></a>
          </li>
          <li><a href="#" title="Sign Up"><i  className="fas fa-edit"></i></a>
          </li>
        </ul>
      </nav>
    </header>
  </div>
  </div>
  <div className="content" style={{backgroundColor: 'white', paddingTop: '5%', display: 'flex', gap: '3%'}}>

  <div id="filter" style={{width: '200px'}}>
<form style={{paddingBottom:'20px'}}>
  <label>City</label>
<select style={{width:'200px', color: 'grey', backgroundColor:'white', height: '35px', borderRadius: '5px', border: '0.1px solid'}}>
    <option value="" disabled selected hidden style={{color: 'grey'}}>City</option>
    <option value="0">Struga</option>
    <option value="1">Skopje</option>
</select>
</form>

<form>
  <label>Experience</label>
  <input type="range" id="rangeExperience" name="rangeExperience" min="0" max="30" />
  <span id="rangeValue">0</span>
</form>

<form>
  <label>Price</label>
  <input type="number" id="price" name="price" min="0" placeholder='Price' style={{width:'200px', color: 'grey', backgroundColor:'white', height: '35px', borderRadius: '5px', border: '0.1px solid'}}/>
</form>
</div>

  <div className="group btmspace-50 demo" style={{padding: 'auto 10% 0 20%', display: 'flex'}}>
        <div className="one_quarter first">
        <div className="card" style={{background:'lightgrey', paddingBottom: '10px', color: 'black', borderRadius: '15px'}}>
  <img src=" https://images.unsplash.com/photo-1606122017369-d782bbb78f32?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cG9ydHJhaXRzfGVufDB8fDB8fHww
        " alt="Card image cap" className="img-border" />
  <div className="card-body" style={{paddingTop: '10px'}}>
    <h5 style={{marginBottom: '10px'}}>Name and surname, Struga</h5>
  <p style={{margin: '0 0 5px 0'}}>Iskustvo: 5 godini</p>
    <div className="rating-hold">
    <div className="c-rating c-rating--regular" data-rating-value="3.25">
      <button>1</button>
      <button>2</button>
      <button>3</button>
      <button>4</button>
      <button>5</button>
    </div>
  </div>
    <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
    <button name="Details" type='button' style={{color: 'white', backgroundColor: 'grey', padding: '10px', borderRadius: '10px', marginTop: '20px'}} onClick={() => history('/services/1') }>Details</button>
  </div>
</div>
        </div>
        <div className="one_quarter"> <div className="card" style={{background:'lightgrey', paddingBottom: '10px', color: 'black', borderRadius: '15px'}}>
  <img src=" https://images.unsplash.com/photo-1606122017369-d782bbb78f32?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cG9ydHJhaXRzfGVufDB8fDB8fHww
        " alt="Card image cap" className="img-border" />
  <div className="card-body" style={{paddingTop: '10px'}}>
    <h5 style={{marginBottom: '10px'}}>Name and surname, Struga</h5>
  <p style={{margin: '0 0 5px 0'}}>Iskustvo: 5 godini</p>
    <div className="rating-hold">
    <div className="c-rating c-rating--regular" data-rating-value="3.25">
      <button>1</button>
      <button>2</button>
      <button>3</button>
      <button>4</button>
      <button>5</button>
    </div>
  </div>
    <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
    <button name="Details" type='button' style={{color: 'white', backgroundColor: 'grey', padding: '10px', borderRadius: '10px', marginTop: '20px'}}>Details</button>
  </div>
</div></div>
        <div className="one_quarter"> <div className="card" style={{background:'lightgrey', paddingBottom: '10px', color: 'black', borderRadius: '15px'}}>
  <img src=" https://images.unsplash.com/photo-1606122017369-d782bbb78f32?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cG9ydHJhaXRzfGVufDB8fDB8fHww
        " alt="Card image cap" className="img-border" />
  <div className="card-body" style={{paddingTop: '10px'}}>
    <h5 style={{marginBottom: '10px'}}>Name and surname, Struga</h5>
  <p style={{margin: '0 0 5px 0'}}>Iskustvo: 5 godini</p>
    <div className="rating-hold">
    <div className="c-rating c-rating--regular" data-rating-value="3.25">
      <button>1</button>
      <button>2</button>
      <button>3</button>
      <button>4</button>
      <button>5</button>
    </div>
  </div>
    <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
    <button name="Details" type='button' style={{color: 'white', backgroundColor: 'grey', padding: '10px', borderRadius: '10px', marginTop: '20px'}}>Details</button>
  </div>
</div></div>


      </div>
        
        
        
        
        </div>
        </div>
    );
}

export default Services;