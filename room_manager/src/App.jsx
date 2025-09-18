import React from "react";

function App() {
  return (
    <div>
      {/* Preloader Start */}
      <div id="preloader-active">
        <div className="preloader d-flex align-items-center justify-content-center">
          <div className="preloader-inner position-relative">
            <div className="preloader-circle"></div>
            <div className="preloader-img pere-text">
              <strong>Hotel</strong>
            </div>
          </div>
        </div>
      </div>
      {/* Preloader End */}

      <header>
        <div className="header-area header-sticky">
          <div className="main-header">
            <div className="container">
              <div className="row align-items-center">
                <div className="col-xl-2 col-lg-2">
                  <div className="logo">
                    <a href="index.html">
                      <img src="assets/img/logo/logo.png" alt="" />
                    </a>
                  </div>
                </div>
                <div className="col-xl-8 col-lg-8">
                  <div className="main-menu f-right d-none d-lg-block">
                    <nav>
                      <ul id="navigation">
                        <li><a href="index.html">Home</a></li>
                        <li><a href="about.html">About</a></li>
                        <li><a href="services.html">Service</a></li>
                        <li>
                          <a href="blog.html">Blog</a>
                          <ul className="submenu">
                            <li><a href="blog.html">Blog</a></li>
                            <li><a href="single-blog.html">Blog Details</a></li>
                          </ul>
                        </li>
                        <li>
                          <a href="#">Pages</a>
                          <ul className="submenu">
                            <li><a href="rooms.html">Rooms</a></li>
                            <li><a href="elements.html">Element</a></li>
                          </ul>
                        </li>
                        <li><a href="contact.html">Contact</a></li>
                      </ul>
                    </nav>
                  </div>
                </div>
                <div className="col-xl-2 col-lg-2">
                  <div className="header-btn">
                    <a href="#" className="btn btn1 d-none d-lg-block">Book Online</a>
                  </div>
                </div>
                <div className="col-12">
                  <div className="mobile_menu d-block d-lg-none"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main>
        {/* Slider Area Start */}
        <div className="slider-area">
          <div className="slider-active dot-style">
            {[1,2,3].map((i) => (
              <div key={i} className="single-slider hero-overly slider-height d-flex align-items-center" style={{backgroundImage: "url(assets/img/hero/h1_hero.jpg)"}}>
                <div className="container">
                  <div className="row justify-content-center text-center">
                    <div className="col-xl-9">
                      <div className="h1-slider-caption">
                        <h1 data-animation="fadeInUp" data-delay=".4s">top hotel in the city</h1>
                        <h3 data-animation="fadeInDown" data-delay=".4s">Hotel & Resourt</h3>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* Slider Area End */}

        {/* Booking Room Start */}
        <div className="booking-area">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <form>
                  <div className="booking-wrap d-flex justify-content-between align-items-center">
                    <div className="single-select-box mb-30">
                      <div className="boking-tittle">
                        <span> Check In Date:</span>
                      </div>
                      <div className="boking-datepicker">
                        <input id="datepicker1" placeholder="10/12/2020" />
                      </div>
                    </div>
                    <div className="single-select-box mb-30">
                      <div className="boking-tittle">
                        <span>Check OutDate:</span>
                      </div>
                      <div className="boking-datepicker">
                        <input id="datepicker2" placeholder="12/12/2020" />
                      </div>
                    </div>
                    <div className="single-select-box mb-30">
                      <div className="boking-tittle">
                        <span>Adults:</span>
                      </div>
                      <div className="select-this">
                        <div className="select-itms">
                          <select id="select1">
                            <option value="">1</option>
                            <option value="">2</option>
                            <option value="">3</option>
                            <option value="">4</option>
                          </select>
                        </div>
                      </div>
                    </div>
                    <div className="single-select-box mb-30">
                      <div className="boking-tittle">
                        <span>Children:</span>
                      </div>
                      <div className="select-this">
                        <div className="select-itms">
                          <select id="select2">
                            <option value="">1</option>
                            <option value="">2</option>
                            <option value="">3</option>
                            <option value="">4</option>
                          </select>
                        </div>
                      </div>
                    </div>
                    <div className="single-select-box mb-30">
                      <div className="boking-tittle">
                        <span>Rooms:</span>
                      </div>
                      <div className="select-this">
                        <div className="select-itms">
                          <select id="select3">
                            <option value="">1</option>
                            <option value="">2</option>
                            <option value="">3</option>
                            <option value="">4</option>
                          </select>
                        </div>
                      </div>
                    </div>
                    <div className="single-select-box pt-45 mb-30">
                      <a href="#" className="btn select-btn">Book Now</a>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        {/* Booking Room End */}

        {/* Make customer Start */}
        <section className="make-customer-area customar-padding fix">
          <div className="container-fluid p-0">
            <div className="row">
              <div className="col-xl-5 col-lg-6">
                <div className="customer-img mb-120">
                  <img src="assets/img/customer/customar1.png" className="customar-img1" alt="" />
                  <img src="assets/img/customer/customar2.png" className="customar-img2" alt="" />
                  <div className="service-experience heartbeat">
                    <h3>25 Years of Service<br />Experience</h3>
                  </div>
                </div>
              </div>
              <div className="col-xl-4 col-lg-4">
                <div className="customer-caption">
                  <span>About our company</span>
                  <h2>Make the customer the hero of your story</h2>
                  <div className="caption-details">
                    <p className="pera-dtails">Lorem ipsum dolor sit amet, consectetur adipisic- ing elit, sed do eiusmod tempor inc. </p>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud. </p>
                    <a href="#" className="btn more-btn1">Learn More <i className="ti-angle-right"></i> </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* Make customer End */}

        {/* Room Start */}
        <section className="room-area">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-xl-8">
                <div className="font-back-tittle mb-45">
                  <div className="archivment-front">
                    <h3>Our Rooms</h3>
                  </div>
                  <h3 className="archivment-back">Our Rooms</h3>
                </div>
              </div>
            </div>
            <div className="row">
              {[1,2,3,4,5,6].map((i) => (
                <div key={i} className="col-xl-4 col-lg-6 col-md-6">
                  <div className="single-room mb-50">
                    <div className="room-img">
                      <a href="rooms.html">
                        <img src={`assets/img/rooms/room${i}.jpg`} alt="" />
                      </a>
                    </div>
                    <div className="room-caption">
                      <h3><a href="rooms.html">Classic Double Bed</a></h3>
                      <div className="per-night">
                        <span><u>$</u>150 <span>/ par night</span></span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="row justify-content-center">
              <div className="room-btn pt-70">
                <a href="#" className="btn view-btn1">View more  <i className="ti-angle-right"></i> </a>
              </div>
            </div>
          </div>
        </section>
        {/* Room End */}

        {/* Dining Start */}
        <div className="dining-area dining-padding-top">
          <div className="single-dining-area left-img">
            <div className="container">
              <div className="row justify-content-end">
                <div className="col-lg-8 col-md-8">
                  <div className="dining-caption">
                    <span>Our resturent</span>
                    <h3>Dining & Drinks</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod<br /> tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim <br />veniam, quis nostrud.</p>
                    <a href="#" className="btn border-btn">Learn More <i className="ti-angle-right"></i> </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="single-dining-area right-img">
            <div className="container">
              <div className="row justify-content-start">
                <div className="col-lg-8 col-md-8">
                  <div className="dining-caption text-right">
                    <span>Our Pool</span>
                    <h3>Swimming Pool</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod<br /> tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim <br />veniam, quis nostrud.</p>
                    <a href="#" className="btn border-btn">Learn More  <i className="ti-angle-right"></i></a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Dining End */}

        {/* Testimonial Start */}
        <div className="testimonial-area testimonial-padding">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-xl-9 col-lg-9 col-md-9">
                <div className="h1-testimonial-active">
                  {[1,2].map((i) => (
                    <div key={i} className="single-testimonial pt-65">
                      <div className="font-back-tittle mb-105">
                        <div className="archivment-front">
                          <img src="assets/img/logo/testimonial.png" alt="" />
                        </div>
                        <h3 className="archivment-back">Testimonial</h3>
                      </div>
                      <div className="testimonial-caption text-center">
                        <p>Yorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi.</p>
                        <div className="testimonial-ratting">
                          {[...Array(5)].map((_, idx) => (
                            <i key={idx} className="fas fa-star"></i>
                          ))}
                        </div>
                        <div className="rattiong-caption">
                          <span>Clifford Frazier, <span>Regular Client</span> </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Testimonial End */}

        {/* Blog Start */}
        <div className="blog-area blog-padding">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-xl-8">
                <div className="font-back-tittle mb-50">
                  <div className="archivment-front">
                    <h3>Our Blog</h3>
                  </div>
                  <h3 className="archivment-back">Recent News</h3>
                </div>
              </div>
            </div>
            <div className="row">
              {[1,2,3].map((i) => (
                <div key={i} className="col-xl-4 col-lg-4 col-md-6">
                  <div className="single-blog mb-30">
                    <div className="blog-img">
                      <a href="single-blog.html">
                        <img src={`assets/img/our_blog/blog-img${i}.jpg`} alt="" />
                      </a>
                    </div>
                    <div className="blog-caption">
                      <div className="blog-cap-top d-flex justify-content-between mb-40">
                        <span>news</span>
                        <ul><li>by<a href="#"> Jhon Guru</a></li></ul>
                      </div>
                      <div className="blog-cap-mid">
                        <p><a href="single-blog.html">5 Simple Tricks for Getting Stellar Hotel Service Wherever You Are</a></p>
                      </div>
                      <div className="blog-cap-bottom d-flex justify-content-between">
                        <span>Feb 28, 2020</span>
                        <span><img src="assets/img/our_blog/blog-comments-icon.jpg" alt="" />3</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* Blog End */}

        {/* Gallery img Start */}
        <div className="gallery-area fix">
          <div className="container-fluid p-0">
            <div className="row">
              <div className="col-md-12">
                <div className="gallery-active owl-carousel">
                  {[1,2,3].map((i) => (
                    <div key={i} className="gallery-img">
                      <a href="#"><img src={`assets/img/gallery/gallery${i}.jpg`} alt="" /></a>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Gallery img End */}
      </main>

      <footer>
        <div className="footer-area black-bg footer-padding">
          <div className="container">
            <div className="row d-flex justify-content-between">
              <div className="col-xl-3 col-lg-3 col-md-4 col-sm-6">
                <div className="single-footer-caption mb-30">
                  <div className="footer-logo">
                    <a href="index.html"><img src="assets/img/logo/logo2_footer.png" alt="" /></a>
                  </div>
                  <div className="footer-social footer-social2">
                    <a href="#"><i className="fab fa-facebook-f"></i></a>
                    <a href="#"><i className="fab fa-twitter"></i></a>
                    <a href="#"><i className="fas fa-globe"></i></a>
                    <a href="#"><i className="fab fa-behance"></i></a>
                  </div>
                  <div className="footer-pera">
                    <p>
                      Copyright &copy;{new Date().getFullYear()} All rights reserved | This template is made with <i className="ti-heart" aria-hidden="true"></i> by <a href="https://colorlib.com" target="_blank" rel="noopener noreferrer">Colorlib</a>
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-xl-3 col-lg-3 col-md-3 col-sm-5">
                <div className="single-footer-caption mb-30">
                  <div className="footer-tittle">
                    <h4>Quick Links</h4>
                    <ul>
                      <li><a href="#">About Mariana</a></li>
                      <li><a href="#">Our Best Rooms</a></li>
                      <li><a href="#">Our Photo Gellary</a></li>
                      <li><a href="#">Pool Service</a></li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="col-xl-3 col-lg-3 col-md-3 col-sm-3">
                <div className="single-footer-caption mb-30">
                  <div className="footer-tittle">
                    <h4>Reservations</h4>
                    <ul>
                      <li><a href="#">Tel: 345 5667 889</a></li>
                      <li><a href="#">Skype: Marianabooking</a></li>
                      <li><a href="#">reservations@hotelriver.com</a></li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="col-xl-3 col-lg-3 col-md-4  col-sm-5">
                <div className="single-footer-caption mb-30">
                  <div className="footer-tittle">
                    <h4>Our Location</h4>
                    <ul>
                      <li><a href="#">198 West 21th Street,</a></li>
                      <li><a href="#">Suite 721 New York NY 10016</a></li>
                    </ul>
                    <div className="footer-form">
                      <div id="mc_embed_signup">
                        <form target="_blank" action="https://spondonit.us12.list-manage.com/subscribe/post?u=1462626880ade1ac87bd9c93a&amp;id=92a4423d01"
                          method="get" className="subscribe_form relative mail_part">
                          <input type="email" name="email" id="newsletter-form-email" placeholder="Email Address"
                            className="placeholder hide-on-focus"
                            onFocus={e => e.target.placeholder = ''}
                            onBlur={e => e.target.placeholder = ' Email Address '}
                          />
                          <div className="form-icon">
                            <button type="submit" name="submit" id="newsletter-submit"
                              className="email_icon newsletter-submit button-contactForm">
                              <img src="assets/img/logo/form-iocn.jpg" alt="" />
                            </button>
                          </div>
                          <div className="mt-10 info"></div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;