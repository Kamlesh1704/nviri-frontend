import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import image1 from "../assets/image1.png";
import refre from '../assets/refre.png';
import image2 from '../assets/Vector.png'
import image3 from '../assets/vector2.png'
import image4 from '../assets/fire.png'
import image5 from '../assets/Untitled.png'
import image6 from '../assets/undraw_c.png'
import image7 from '../assets/undrawf.png'
import image8 from '../assets/google.png'
import image9 from '../assets/google_stars_3.png'
import logo from '../assets/logo.png'
import {Slider} from '@yoursurprise/slider';
import '@yoursurprise/slider/dist/index.css';
import { MdOutlineStar } from "react-icons/md";
import { FaArrowRightLong } from "react-icons/fa6";
import { FaLinkedinIn } from "react-icons/fa6";
import { FaFacebook } from "react-icons/fa";
import { CiTwitter } from "react-icons/ci";
import '../css/Home.css'

export default function Home() {
  const [locations, setLocations] = useState([]);
  const [technicians, setTechnicians] = useState([]);
  const [appliances, setAppliances] = useState([]);
  const [input, setInput] = useState('');

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  if (token === null) {
    navigate("/user-login");
  }

  useEffect(() => {
    const fetchLocation = async () => {
      try {
        const response = await fetch("https://nviri-assignment-3.onrender.com/locations", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        setLocations(data.locations);
      } catch (error) {
        console.error("Error fetching locations:", error);
      }
    };

    const fetchTechnicians = async () => {
      try{
          const response = await fetch("https://nviri-assignment-3.onrender.com/technicians",{
            method: 'GET',
          });
          const data = await response.json();
          setTechnicians(data.technicians);
      }catch(err){
        console.log(err);
      }
    }

    const fetchAppliances = async () => {
      try{
        const response = await fetch("https://nviri-assignment-3.onrender.com/appliances",{
          method:'GET',
        })
        const data = await response.json();
        setAppliances(data.appliances);
      }catch(err){
        console.log(err);
      }
    }
    fetchLocation();
    fetchTechnicians();
    fetchAppliances();
  }, []);
  
  const filteredAppliances = appliances.filter((appliance) => {
    return appliance.name.toLowerCase().includes(input.toLowerCase());
  });
  
  const onClickAppliance = (name) => {
    setInput(name);
  }

  return (
    <div>
      <section className="hero-cont">
        <div>
          <h1>Take care of your home needs now!</h1>
          <p>
            ServicePro is your one-stop solution to troubleshoot, choose a
            vendor and book a technician.
          </p>
          <select name="locations" id="locations">
            {locations.map((location, index) => (
              <option key={index} value={location}>
                {location}
              </option>
            ))}
          </select>
          <div style={{ position: "relative" }}>
          <input type="text" placeholder="Search Home Appliances" value={input} onChange={(e) => setInput(e.target.value)}/>
          <button>Search</button>
          {
            input.length !== 0?   <ul>
            {
              filteredAppliances.map((appliance) => (
                <li onClick={() =>onClickAppliance(appliance.name)}>{appliance.name}</li>
              ))
            }
          </ul>
          : ""
          }
          </div>
        </div>
        <img src={image1} alt="image1"/>
      </section>
      <section className="service-cont">
        <h1>All Services</h1>
        <p className="pp">The time is now for it to be okay to be great. For being a bright color. For standing out.</p>
        <div className="card-cont">
          <div>
            <img src={refre} />
            <p className="service-card-p">Fridge</p>
            <p>We get insulted by others, lose trust for those others. We get back stabbed by friends. It becomes harder for us to give others a hand.</p>
        </div>
        <div>
          <img src={image2} />
          <p className="service-card-p">Air Conditioner</p>
          <p>Don't get your heart broken by people we love, even that we give them all we have. Then we lose family over time. As we live, our hearts turn colder.</p>
        </div>
        <div>
          <img src={image3} />
          <p className="service-card-p">Television</p>
          <p>What else could rust the heart more over time? Blackgold. The time is now for it to be okay to be great. or being a bright color. For standing out.</p>
        </div>
        </div>
        <div className="card-cont">
        <div>
          <img src={image4} />
          <p className="service-card-p">Gas Stove</p>
          <p>We get insulted by others, lose trust for those others. We get back stabbed by friends. It becomes harder for us to give others a hand.</p>
        </div>
        <div>
          <img src={image2} />
          <p className="service-card-p">Air Conditioner</p>
          <p>Don't get your heart broken by people we love, even that we give them all we have. Then we lose family over time. As we live, our hearts turn colder.</p>
        </div>
        <div>
          <img src={image3} />
          <p className="service-card-p">Television</p>
          <p>What else could rust the heart more over time? Blackgold. The time is now for it to be okay to be great. or being a bright color. For standing out.</p>
        </div>
        </div>

      </section>
      <section className="book-cont">
        <h1>Book a request in 3 simple steps</h1>
        <div className="book-card-cont">
        <div>
          <img src={image7}  />
          <p className="book-cont-p">Provide your appliance details</p>
          <p>Let us know your appliance details and your issue.</p>
        </div>
        <div>
          <img src={image5}  />
          <p className="book-cont-p">Choose your technician</p>
          <p>Choose from a wide variety of technicians and vendors.</p>
        </div>
        <div>
          <img src={image6}  />
          <p className="book-cont-p">Get it fixed!</p>
          <p>The technician will arrive at your doorstep shortly to fix it!</p>
        </div>
        </div>
      </section>
      <section  className="carousal-cont">
        <h1 className="carousal-head">Featured Technicians</h1>
        <Slider>
            {
              technicians.map((technician) => (
                <div className="technician-card">
                  <div className="technician-card-1">
                    <img src={technician.photo} />
                    <div>
                      <h1>{technician.name}</h1>
                      <div className="technician-card-2">
                        <p>{technician.specialization}</p>
                        <p><MdOutlineStar style={{color:"gold",fontSize:"20px"}}/>  {technician.rating}</p>
                        <button className="contact-btn">Contact</button> 
                      </div>
                    </div>
                  </div>
                  <button className="contact-btn-m">Contact</button>
                    <p className="technician-desc">{technician.description}</p>
                </div>
              ))
            }
        </Slider>
      </section>
      <section className="comment-cont">
        <h1>See what our happy customers have to say about us</h1>
        <Slider>
            <div className="review-cont"> 
                <img className="imgg" src={image8} />
                <div>
                <div className="p-img">
                <p>Peter Breis </p>
                <img src={image9} />            
                </div>
                <p className="ago">3 days ago</p>  
                <p className="desc">Knowledgeable and easy to work<br/> with. They make Instagram easy<br/> for those of us who aren’t that savvy.<br/> Growth has been great and the followers<br/> have been quality.
                <br/>Couldn’t be happier.
                </p>
                </div>
            </div>
            <div className="review-cont"> 
                <img className="imgg" src={image8} />
                <div>
                <div className="p-img">
                <p>Peter Breis </p>
                <img src={image9} />            
                </div>
                <p className="ago">3 days ago</p>  
                <p className="desc">Knowledgeable and easy to work<br/> with. They make Instagram easy<br/> for those of us who aren’t that savvy.<br/> Growth has been great and the followers<br/> have been quality.
                <br/>Couldn’t be happier.
                </p>
                </div>
            </div>
            <div className="review-cont"> 
                <img className="imgg" src={image8} />
                <div>
                <div className="p-img">
                <p>Peter Breis </p>
                <img src={image9} />            
                </div>
                <p className="ago">3 days ago</p>  
                <p className="desc">Knowledgeable and easy to work<br/> with. They make Instagram easy<br/> for those of us who aren’t that savvy.<br/> Growth has been great and the followers<br/> have been quality.
                <br/>Couldn’t be happier.
                </p>
                </div>
            </div>
            <div className="review-cont"> 
                <img className="imgg" src={image8} />
                <div>
                <div className="p-img">
                <p>Peter Breis </p>
                <img src={image9} />            
                </div>
                <p className="ago">3 days ago</p>  
                <p className="desc">Knowledgeable and easy to work<br/> with. They make Instagram easy<br/> for those of us who aren’t that savvy.<br/> Growth has been great and the followers<br/> have been quality.
                <br/>Couldn’t be happier.
                </p>
                </div>
            </div>
            <div className="review-cont"> 
                <img className="imgg" src={image8} />
                <div>
                <div className="p-img">
                <p>Peter Breis </p>
                <img src={image9} />            
                </div>
                <p className="ago">3 days ago</p>  
                <p className="desc">Knowledgeable and easy to work<br/> with. They make Instagram easy<br/> for those of us who aren’t that savvy.<br/> Growth has been great and the followers<br/> have been quality.
                <br/>Couldn’t be happier.
                </p>
                </div>
            </div>
            <div className="review-cont"> 
                <img className="imgg" src={image8} />
                <div>
                <div className="p-img">
                <p>Peter Breis </p>
                <img src={image9} />            
                </div>
                <p className="ago">3 days ago</p>  
                <p className="desc">Knowledgeable and easy to work<br/> with. They make Instagram easy<br/> for those of us who aren’t that savvy.<br/> Growth has been great and the followers<br/> have been quality.
                <br/>Couldn’t be happier.
                </p>
                </div>
            </div>
        </Slider>
      </section>
      <section className="footer-cont">
              <div className="foot-div-1">
                <div className="foot-div-2">
                  <div>
                  <p style={{color:"white"}}>Get in touch with us</p>
                  <input type="text" placeholder="Email address" className="email-inp"/>
                  <button className="ar-btn"><FaArrowRightLong /></button>
                  </div>
                <p className="hello">Hello, we are Lift Media. Our goal is to<br/> translate the positive effects from<br/> revolutionizing how companies engage with <br/>their clients & their team.</p>
                </div>
              <button className="book-btn">Book a Service</button>
              <div className="a-cont">
                <a href="">Terms</a>
                <a href="">Privacy</a>
                <a href="">Cookies</a>
                <a href="">Business Login</a>
              </div>
              </div>
              <div className="foot-div-3">
                <hr />
                <div >
                  <img src={logo} alt="logo"/>
                  <div className="social">
                    <p><FaLinkedinIn/></p>
                    <p><FaFacebook/></p>
                    <p><CiTwitter/></p>
                  </div>
                </div>
              </div>
      </section>
    </div>
  );
}
