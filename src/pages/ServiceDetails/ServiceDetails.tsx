import '../Services/style.css';
import './style.css'; 

const ServiceDetails : React.FC =  () => {
return(
    <div   className="bgded"  style={{backgroundColor: 'black'}}>
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


  <div className="wrapper row3">
  <main className="hoc clear" style={{textAlign: 'left', paddingTop: '50px'}}> 
    <div className="content"> 

    <div>
       <img className="imgl borderedbox inspace-5" style={{width: '30%'}} src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAJQAlAMBIgACEQEDEQH/xAAbAAABBQEBAAAAAAAAAAAAAAAEAAECBQYDB//EADcQAAEDAgQEBAMGBgMAAAAAAAEAAgMEEQUSITEGQVFhEyIycYGR0QcUI0KhwRZScrHh8DNDYv/EABkBAAMBAQEAAAAAAAAAAAAAAAECAwAEBf/EAB4RAQEBAQADAQEBAQAAAAAAAAABAhEDITESQVEi/9oADAMBAAIRAxEAPwC6SSTLzneSz3GGJMpKHwd3P1sDr2V/I8RsLz6Wi59l5tj9YKqeSsqDljIIYD0vonzGrPvY6cunmdZnXl7BBzyhxyxaNCapq31L7C4ZyaFyAA1XRMo6vTEaJ2Dv3/wkTyG6k0WAG90xRNM4h5e8Cw2B0AVqytaSRLLISbWa0W/XkgMNw+pxCoEVPGXkW1Oze5W5wLhaGKwYzxpAfxJni7R7BJrci2PFdM7Hhz6vVkLhcW11+eisMP4NmN5HtI6L0vDsEjhGYtDjzcdyjpIWDQCyjd2r58WIwlBw+aVrmFoyEG5tf9FR8QcNeR76YbG5AC9Oli3sq6op77i6Wb1KpfHmzjwmpgdTyWc3QL1L7NMRM+Dmnc7MYHlgJ3A3Cz3GeENge6piZ5Tv2Uvs0lDa+qiGgc0O0HQq1v6w4rj8a49TumKZp0F06idEp0iksAdJJMlMAxiZsdI+7g0W8x6BeQYxVPxGqkkbdsEegudFvOOa0mNtKHGNh803Iuts326lecVkvpA0G4aBbKujxRPdcxa1gMrBqTzUS/M7Mef6Jnus0Muep7pNFt9OvZWSdGi+6tMHw6StnYyNrjm6C9u6fBsLdWHxJARCzVx6hegcNULKWH7xKwNzagD+XkPipb3xfxePvujcHwRtFTR0zA1j3i7gOQ791qKWlZTsZGwWZyHVDUDSAZZRZ7zcjorGPzWXN3rsvJBsLw1tiNFGbIdRooxkEbhSktZMQNMwFumir523KsZvSgJ/ZKeM5xBRioppY3AWI0WJ4FzUvFjoXc2OC9ExFt2nqsFSxml4+pQBYSP+d2n6KmL6sR80/r09h8o7KV1BmxU0qZJJJLFDKLjZpPROhcTnMGHzyt9TWEhCGefcQukxGvlbTsJJeWj/ANkbj2CzE9C6KZ5c9r/CAMhB0B6d1o650ZwClnY5zqlzpNdsozHdUEdPNUWY0HK05g0HbuV0Z9QlkquIAcXc7ovC6KStqmRMboXbo2rwSWOBssQzXFyButLwbQ+E0yPaMx/RHW5z02fFf1yjZKZtHRQUMDbOldY299yr1srYsg8NzmN1EbBcnp+yBdCajForbRNLvjsETPVnCHukngkcHfnaMw/wubvfrsk/I1xxups5gZAD6W6Ej3uhJKfiijcZY5XSjezLfuqqbj2QvfHQUMkmXe+tr9QFOl45xWpqGxxUTZjmLHRMaSWEEi2/10srTNR15M950VFxXxBC8sqKK1tXGRtj8LLS4Xjrqttp2ZXA2PJV9BjIxHyTQND9iLbHoQdlbU9NFcZWAE8xzS2/w0zfo+R1x2VdiFXT0cZkqJGsb1KNrXNpWFzyQGhY/FpKWtcBXS5Ir6MzWSyS02ryK7GeMaFr3NgZJIBzAVRg87cY4ooalrXMMR1B5ix+qtPv3C9I3LHTNkINs7rORuBSUdTizZqFjGsDb3aLdVT5PiF/V/rWM291JMNE6kxJJikswUqEsTZonRvALXCxuppXsErMDxFhssNKKVpJiiL3tOl3XOg+ZV5Q8Htgw2OP/tmYC89zyROMYbNiEkD4X5HxSB3YgEGx+S0P3h0McbyLujcLDlZHW7yK+HM7WQfg0tLQPjl1ERyg23BXTDGBtOS1oBurzFmVUjqySRjW08zQ9mU31Fv8oCgjHguZzQl7FLOXqGGi+ITkbBjR/dXb4WygNc24I1VRh4DamXrcf2Whivlbe22yCvPSq/hylDnPhiyZhrlO6lSYW/D5my0vh523y52F1r7m3VXsTuWll1eDpY6Kud1DWM2qGjw6Q4kayoLs3MBoAPv1Vm5wZKS0ANG1kS4eXmUHN2SavVMwNi8vjxRuN7XylZrE+HY6oNfmeXDUkSEOzDXym3lWoqow+ifcatOgQdHL4sN3WvsjNcDeJpl6ijhhwOspPuzzPNsSMwYOWp3PdT4GwsUMshLnklg0dy/2y0NXHGGkln67ofB22mmcOYAT63+nPrwzHtdhJRunSFJMnSWDgVIpgn6JRJml+t0nvJDg6PawaR+brcpNGnxKT2te3K9tweSFnYfOrL0ppw6inc3M+zMgAFwEHSQvYXFzSLrvhVYySvrKBpDWiDO1g7HdW9dCBGXtAAIzBNmch9eT9Vm6cWne4/zK8gfewVO1hzP0vsf9+SsKYmwJSOiX0tItH9kTK4FosAEHCSTsu5F0YWoVE/hQucFXtMkjrnbqrNzGuYWuFwdwqqowYTWtV1DWt9LWusPj1RGUc1kLqaTzNLj3VdQ04Bmbp5Xf3VNNDi8A8KmJMYdbxnncK7wyN1LTBkkniPOrnkWuUaXvtxxBgsQD80LhIt4t+tv0UsWny3sLk6J8MYWMcHb3utCea9iwG2qkoXUkXOdMkmWYPdIFRThBjjRc6mVsUD3u/Lcn2UyVneNq00uDSsHql0Hshf8ADZ/0DwHibq7jiZzgcksb2N1/LZehSvz4c0OPmZdh+B+i8m+yaU/xbFHobtc75Behz1ZpMSqIJD+C91/ZV3Oei49+zQWc8scPULo+Ft2jqq3xMswvvfSysY3i+hUeOqX0NhPlsuNZiApGEvjkfbYRtupwvPZScM3q1RH0qzxFTWu5sgJ5EEWUDj7Gi4DB/UURVUWa72sDuyAmEAjyPiY1w5nRNOVbMw4T45eLKHNDeoO6fC8TdVOexsbyBu62gXGQxZBHG0Of1aLrpRkUcJB9RuXFGz0TyXM+Ota0PrI4xqBqUXTC2b3/AHQlK0vPjP3efL7I2DQ2O6Vx6va7J1EHRK6JUklFOswdIFRuldBkxqbLz77QKsSzCEG4Z9Fu55BFTySdAvKcfqPHnkN76myOJ3Y69YXH2QU7pOLTOB5YKd5ce50C32LQePM9wF3XWf8AsfoTTYdXYk/Tx3eHGeoaNT81qjZ0jj3TeW/9G8Gf+es/HJLC9sUgJZfQ9FYwVrTufmi56ETsOXQgaKkqIXwyEgaXU1vjQU9U0kao9sgcNCFj2VT2I6lxQMIa827lHgSxpmWKU0EUjfOwO90BBXRcni3Vd318Ib6wtw3QlbGyGPyNaPYWVRHCamY3/wCIHzDqjK+sE7vChu95PLl7rpTxCKMNvtqe63xPekrDO0DknGhv3TX/ABSeye+pv1WRdUkw2Suix0kySzBbpXUQU43QFV8TVfgYc5o/NovPcPwuqxzFW0VGCST5320jbzcVseIIKnFq6LD6FpdIdSbaNHU9lpMFwmlwKiFLSAulfrNMd3u+nZHGvzOm1m6vBNNTw4ZRQUFE21PAzIO/U/EqYGt10yXZZM1vJJ3rok5OO9MAX2JQ9ZRsM5a5ujxdEQ2Dl0qy7KyUWuw7LQtZWuoXRP8ALsq97XDQ6rbVcEcw2GoVBV4flcbBUlTsZqaeeF1mSkLSYPCyfD4pahud7rkknuqDE6UsN9VpcKbkw6mbz8ME3Ta+J23ouOOOPSNjWg72CkVC6V1MC/OT2S6Jhz9gnHqHZZnS6dQBSuiySSa6ZZggKjNK2JhvdxI0a1pcT8Au9JSvqXeX0D1OPJWYayBmSFoF93cyhTYlrMM4ow7Cy6Caiqqd8mj5pGb/AEC0FHJFWwNqKaVkkZFw5p0K51VHBWsdHVRtka7k4XWVlpq3gys++0JdNhjzeWE/lv8A7ujyWelfea24bpquZbYpUVbTYjTRVdLIHQvGnUHoei7OZzCTinXIaFdT+LGWdRZc3CyYnyogjTSl1NG52+XX3Gi5VBBBXFjzG6dp5PuB2I+qHmqLA8kYSqnGyy1iUJhGNTQTto64Exuv4MoFvgpVhfM+5GhK4S0AqaUMJs4asdza7kqcSv1qY5o5NWuBup620CzmDVYqWPgqPJVQnK9vXurQOlHoJ+KWwODswLiAnCCbUPZ6o/iu8c8cnpdr0KDWO6dQunusXp/inULpIh1cTNFPCyKIZWg8ufdCncpkkjpx8Ibro5rZYjHI0Oa7ykHmEkkYNYLBJ5MI4wkw2kcfus0pa6N2v5b3916JF5mm/I2CSS2iwpGhcHDRJJYVdUD8d/8AR+5QcurSCkkjBoOoY0CMAc00eiZJMn/VRjY+51tLWU/lmc/I48nA9VoqRxe0F3RJJMEEECxQkzQPMN0klOqQRQyOkY4PN7IlJJZDRJJJIlf/2Q==" alt="" />
      <div style={{display:'flex', gap:'10px'}}>
      <h1 style={{marginBottom: '10px', display: 'inline-block', alignContent: 'center'}}>Name and surname, years</h1> 
      <div className="rating-holder">
    <div className="c-rating c-rating--big" data-rating-value="4.5">
      <button style={{padding: 20}}>1</button>
      <button style={{padding: 20}}>2</button>
      <button style={{padding: 20}}>3</button>
      <button style={{padding: 20}}>4</button>
      <button style={{padding: 20}}>5</button>
    </div>
</div>

  </div>
     <p style={{color: 'lightgrey'}}>position</p>

      <p><strong>Experince(years):</strong></p>
      <p><strong>Email:</strong> email@email.com</p>
      <p><strong>Phone:</strong>077 777 777</p>
      <p><strong>Pictures from his/her work:</strong></p>

      <div className="row">
  <div className="column">
    <img src="img1.jpg"  className="hover-shadow" />
  </div>
  <div className="column">
    <img src="img2.jpg"  className="hover-shadow" />
  </div>
  <div className="column">
    <img src="img3.jpg" className="hover-shadow" />
  </div>
  <div className="column">
    <img src="img4.jpg" className="hover-shadow" />
  </div>
</div>

<div id="myModal" className="modal">
  <span className="close cursor" >&times;</span>
  <div className="modal-content">

    <div className="mySlides">
      <div className="numbertext">1 / 4</div>
      <img src="img1_wide.jpg" style={{width:'100%'}} />
    </div>

    <div className="mySlides">
      <div className="numbertext">2 / 4</div>
      <img src="img2_wide.jpg" style={{width:'100%'}} />
    </div>

    <div className="mySlides">
      <div className="numbertext">3 / 4</div>
      <img src="img3_wide.jpg" style={{width:'100%'}} />
    </div>

    <div className="mySlides">
      <div className="numbertext">4 / 4</div>
      <img src="img4_wide.jpg" style={{width:'100%'}} />
    </div>

    <a className="prev">&#10094;</a>
    <a className="next" >&#10095;</a>

    <div className="caption-container">
      <p id="caption"></p>
    </div>

    <div className="column">
      <img className="demo" src="img1.jpg" alt="Nature" />
    </div>

    <div className="column">
      <img className="demo" src="img2.jpg"  alt="Snow" />
    </div>

    <div className="column">
      <img className="demo" src="img3.jpg" alt="Mountains" />
    </div>

    <div className="column">
      <img className="demo" src="img4.jpg" alt="Lights" />
    </div>
  </div>
</div>
      </div>

      <div id="comments" style={{display: 'inline-block', marginTop: '20px'}}>
        <h2 style={{textAlign: 'left'}}>Comments</h2>
        <ul style={{textAlign: 'left'}}>
          <li>
            <article>
              <header>
                <figure className="avatar"><img src="../images/demo/avatar.png" alt="" /></figure>
                <address>
                By <a href="#">A Name</a>
                </address>
                <time>Friday, 6<sup>th</sup> April 2045 @08:15:00</time>
              </header>
              <div className="comcont">
                <p>This is an example of a comment made on a post. You can either edit the comment, delete the comment or reply to the comment. Use this as a place to respond to the post or to share what you are thinking.</p>
              </div>
            </article>
          </li>
          <li>
            <article>
              <header>
                <figure className="avatar"><img src="../images/demo/avatar.png" alt="" /></figure>
                <address>
                By <a href="#">A Name</a>
                </address>
                <time>Friday, 6<sup>th</sup> April 2045 @08:15:00</time>
              </header>
              <div className="comcont">
                <p>This is an example of a comment made on a post. You can either edit the comment, delete the comment or reply to the comment. Use this as a place to respond to the post or to share what you are thinking.</p>
              </div>
            </article>
          </li>
          <li>
            <article>
              <header>
                <figure className="avatar"><img src="../images/demo/avatar.png" alt="" /></figure>
                <address>
                By <a href="#">A Name</a>
                </address>
                <time >Friday, 6<sup>th</sup> April 2045 @08:15:00</time>
              </header>
              <div className="comcont">
                <p>This is an example of a comment made on a post. You can either edit the comment, delete the comment or reply to the comment. Use this as a place to respond to the post or to share what you are thinking.</p>
              </div>
            </article>
          </li>
        </ul>

        {/* TODO: after paying for some service */}
        <h2 style={{textAlign: 'left'}}>Write A Comment</h2>
        <form action="#" method="post">

         <div className="one_third first">
            <label >Name <span>*</span></label>
            <input type="text" name="name" id="name" value=""  required />
          </div>
          <div className="one_third">
            <label >Mail <span>*</span></label>
            <input type="email" name="email" id="email" value="" required />
          </div>
          <div className="one_third">
            <label>Website</label>
            <input type="url" name="url" id="url" value="" />
          </div>
          <div className="block clear">
            <label>Your Comment</label>
            <textarea name="comment" id="comment" ></textarea>
          </div>
          <div>
            <input type="submit" name="submit" value="Submit Form" />
            &nbsp;
            <input type="reset" name="reset" value="Reset Form" />
          </div>
      </form>
    </div>
    <div className="clear"></div> 
</div>
</main>
  </div>
</div>
);
};

export default ServiceDetails;
