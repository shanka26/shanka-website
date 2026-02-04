import React, {useState,useEffect,useRef}  from 'react'

import {Box, Button, Fab, Link, Grid, Stack, TextField, Typography} from '@mui/material'
import Header from './components/Header'
import TwitterIcon from '@mui/icons-material/Twitter';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import Footer from './components/Footer';
import Project from './components/Project';
import { send } from '@emailjs/browser';
import Slide from '@mui/material/Slide';
import pomonotoScreen from './res/pomonotoMock.webp'
import dcoreScreen from './res/dcoreMock.webp'
import cubeplexScreen from './res/cubeplex_mock.jpg'
import guidedlyScreen from './res/guidedlyMock.jpg'
import seoCert from './res/hubspotCertweb.webp'
import lazyPotScreen from './res/lazypot.webp'
import eternallyBondedScreen from './res/eternallyBonded.webp'
import aiTradingJournalScreen from './res/tradeDropScreen.png'
// import styled from "styled-components";
import { styled, keyframes } from '@mui/system';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';



function App() {

  const size_theme = useTheme()
  const lg_up = useMediaQuery(size_theme.breakpoints.up('lg'));
  const xs_up = useMediaQuery(size_theme.breakpoints.up('xs'));
  const canHover = useMediaQuery('(hover: hover)');
  const reduceMotion = useMediaQuery('(prefers-reduced-motion: reduce)');

  let aboutRef = useRef()
  let projectsRef = useRef()
  let contactRef = useRef()
  let infoRef= useRef()
  let slideRef= useRef()
  let leftQuoteRef = useRef()
  let rightQuoteRef = useRef()
  let [myView , setMyView] = useState(false)
  let [jobView , setJobView] = useState(false)
  const DEFAULT_EXIT = 180
  const SWITCH_EXIT = 0
  let [myExit , setMyExit] = useState(DEFAULT_EXIT)
  let [jobExit , setJobExit] = useState(DEFAULT_EXIT)
  let [about , setAbout] = useState("I come from the British Virgin Islands but I'm currently studying Computer Science at UCA")
  let [about_2 , setAbout_2] = useState("My aim in life is to grow everyday and enjoy myself in the process.")
  let [about2 , setAbout2] = useState("I design and develop responsive web applications")
  let [about2_2 , setAbout2_2] = useState("I love learning about new technologies to bring ideas to life.")
  

  let[quote1 , setQuote1] = useState("“ Ten out of ten people die, so don\'t take life too seriously. ”")
  let[author1 , setAuthor1] = useState("~ Henry Winkler")
  let[quote2 , setQuote2] = useState("“ I used to be an adventurer like you. Then I took an arrow in the knee. ”")
  let[author2 , setAuthor2] = useState("~ Guard")
  let[quote3 , setQuote3] = useState("“ Programming isn\'t about what you know, it\'s about what you can figure out. ”")
  let[author3 , setAuthor3] = useState("~ Chris Pine")
  let[quote4 , setQuote4] = useState("“A true master is an eternal student.”")
  let[author4 , setAuthor4] = useState("~ Master Yi")

  
  let[emailName,setEmailName]=useState("")
  let[emailAddress,setEmailAddress]=useState("")
  let[emailMessage,setEmailMessage]=useState("")
  let[emailError,setEmailError]=useState("none")

  let[projectInView,setProjectInView]=useState(false)
  let[showHoverHint,setShowHoverHint]=useState(true)


  const [offset, setOffset] = useState(0);

  useEffect(() => {
      const onScroll = () => setOffset(window.pageYOffset);
      window.addEventListener('scroll', onScroll, { passive: true });
      return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!projectsRef.current) return;
    const top = projectsRef.current.offsetTop;
    const height = projectsRef.current.offsetHeight;
    const inView = offset + 600 > top && offset + 100 < top + height;
    setProjectInView(inView);
  }, [offset]);

  useEffect(() => {
    if (!canHover) return;
    const timer = setTimeout(() => setShowHoverHint(false), 4500);
    return () => clearTimeout(timer);
  }, [canHover]);
 
  const scrollBar = {
    '&::-webkit-scrollbar': {
      width: '0.4em'
    },
    '&::-webkit-scrollbar-track': {
      '-webkit-box-shadow': 'inset 0 0 6px rgba(0,0,0,0.00)'
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: 'rgba(40,0,0,1)',
      borderRadius: 2
      
    },
    '&::-webkit-scrollbar-thumb:hover': {
        backgroundColor: 'rgba(0,0,0,.4)',
        
      }
    }


  const glowCue = keyframes`
    0% { text-shadow: 0 0 0 rgba(158,238,238,0); }
    40% { text-shadow: 0 0 5px rgba(158,238,238,0.22), 0 0 10px rgba(68,189,187,0.16); }
    100% { text-shadow: 0 0 0 rgba(158,238,238,0); }
  `;
  const glowCueSoft = keyframes`
    0% { text-shadow: 0 0 0 rgba(158,238,238,0); }
    40% { text-shadow: 0 0 4px rgba(158,238,238,0.18), 0 0 8px rgba(68,189,187,0.12); }
    100% { text-shadow: 0 0 0 rgba(158,238,238,0); }
  `;

  let viewStyle = {
    color:'primary.main',
    fontSize:{xs:28,md:36,lg:52},
    cursor: canHover ? 'pointer' : 'default',
    position:'relative',
    display:'inline-block',
    paddingInline:'0.12em',
    borderRadius:4,
    backgroundImage:'linear-gradient(120deg, rgba(0,102,102,0.25), rgba(68,189,187,0.35))',
    backgroundRepeat:'no-repeat',
    backgroundSize:'0% 100%',
    backgroundPosition:'0 100%',
    transition:'background-size 250ms ease, color 250ms ease, text-shadow 250ms ease, transform 150ms ease',
    animation: (reduceMotion || !canHover) ? 'none' : `${glowCue} 3.8s ease-in-out infinite`,
    willChange:'text-shadow',
    ...(canHover ? {
      '&:hover':{
        color:'primary.light',
        backgroundSize:'120% 100%',
        textShadow:'0 0 10px rgba(158,238,238,0.35)',
        transform:'translateY(-1px)',
        animationPlayState:'paused',
      },
    } : {}),
    
  }

  let homeStyle = {
    color:'secondary.light',
    fontSize:{xs:28,sm:30,md:36,lg:52},
    
    
  }

  let fabStyle ={
    color:'secondary.light',
    backgroundColor:'primary.main',
    '&:hover':{
      // color:'primary.light',
      backgroundColor:'primary.dark'
    }
  }
 
  let textFieldStyle={
    '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: 'secondary.light',
    },
    '&:hover fieldset': {
      borderColor: 'primary.mid',
    },
  },
  input:{color: '#fff'}
}
  let quoteStyle= {
    fontSize:{xs:16,sm:18,md:20,lg:22},
    lineHeight:1.45,
    fontStyle:'italic',
    fontWeight:500,
    letterSpacing:'0.01em',
  }
  let authorStyle= {
    fontSize:{xs:14,sm:16,md:18,lg:20},
    opacity:0.85,
    fontWeight:600,
    letterSpacing:'0.02em',
  }
  let quoteWrapLeft = {
    display:'flex',
    justifyContent:'flex-start',
    width:'100%',
    minHeight:{xs:78, sm:102, md:120, lg:138},
  }
  let quoteWrapRight = {
    display:'flex',
    justifyContent:'flex-end',
    width:'100%',
    minHeight:{xs:78, sm:102, md:120, lg:138},
  }
  let quoteShellLeft = {
    maxWidth:{xs:'100%', md:420},
    px:{xs:1.5, md:2},
    py:{xs:1, md:1.25},
    borderRadius:2,
    backgroundColor:'rgba(0,0,0,0.18)',
    borderLeft:'3px solid',
    borderLeftColor:'primary.mid',
    boxShadow:'0 8px 24px rgba(0,0,0,0.2)',
    backdropFilter:'blur(4px)',
  }
  let quoteShellRight = {
    ...quoteShellLeft,
    borderLeft:'none',
    borderRight:'3px solid',
    borderRightColor:'primary.mid',
  }
let aboutStyle= {
  fontSize:{xs:20,sm:22,md:24,lg:30}
}


  let sendEmail=async()=>{
    console.log('shoot')
    if(/\S+@\S+\.\S+/.test(emailAddress)&&emailAddress!==""&&emailMessage!==""){
      send('service_jgqvxe4','template_gi813u2',
      {from_name:emailName,
        to_name:'Shanka',
        message:emailMessage,
        reply_to:emailAddress},
        'PMbuGmUBbitnn0i_o'
        )
        .then((res)=>{
          console.log('SUCCESS!', res.status, res.text)
          setEmailAddress("")
          setEmailName("")
          setEmailMessage("")
          setEmailError('none')
        })
        .catch((err)=>{
          console.log('FAILED...', err);
          setEmailError('block')
        })
    }
    else{setEmailError('block')}
  }

  let scroll = (section)=>{
    const anchor = document.querySelector(section)
    anchor.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }


    // hover handlers drive view state directly
  
  
      // setAbout("I come from the British Virgin Islands but I'm currently studying Computer Science at UCA")
      // setAbout2("My aim in life is to grow everyday and enjoy myself while doing so.")
      
      // setQuote1('“ I used to be an adventurer like you. Then I took an arrow in the knee. ”')
      // setAuthor1("~ Whiterun guard")

      // setQuote2('“ Ten out of ten people die, so don\'t take life too seriously. ”')
      // setAuthor2("~ Henry Winkler")



      // setQuote3('“ It is better to light a candle than curse the darkness ”')
      // setAuthor3("~ Chinese proverb")

      // setQuote4('“ Be kind to your future self ”')
      // setAuthor4("~ Someone very wise")

      // set2About("I design and develop responsive web applications.")
      // set2About2("I love learning new technologies and improving my craft.")

      // setQuote1('“A true master is an eternal student.”')
      // setAuthor1("~ Master Yi")

      // setQuote2('“ Programming isn\'t about what you know, it\'s about what you can figure out. ”')
      // setAuthor2("~ Chris Pine")

      // setQuote3('“ Choose a job you love, and you will never have to work a day in your life ”')
      // setAuthor3("~ Confucious")

      // setQuote4('“ The most damaging phrase in the language is.. it\'s always been done this way. ”')
      // setAuthor4("~ Grace Hopper")
      
    

  return (
    
    <Box ref={aboutRef} backgroundColor='secondary.dark' width='100vw' sx={{...scrollBar,display:'flex',flexDirection:'column',}}>
      
        <Header about={aboutRef} projects={projectsRef} contact={contactRef}/>
      
      
      <Box height={'100vh'} justifyContent='center' alignItems='center'>
        <Grid  height='100%' container direction='column' sx={{mx:0,px:{xs:2,sm:4,md:8,lg:12},pb:{xs:0}}}>

          <Grid container item xs={5} justifyContent='space-evenly' sx={{pt:2}}flexDirection='column'>
            
          <Box sx={quoteWrapLeft} ref={leftQuoteRef}>
                <Slide direction={"right"} in={myView} container={leftQuoteRef.current} unmountOnExit  timeout={{enter:360,exit:myExit}}>
                  <Box sx={quoteShellLeft}>
                    <Typography color='secondary.light' variant='h5' align='left' sx={quoteStyle}>{quote1}</Typography>
                    <Typography color='primary.mid' variant='h5' align='left' sx={authorStyle}>{author1}</Typography>
                  </Box>
                </Slide>

                <Slide direction={"right"} in={jobView} container={leftQuoteRef.current} unmountOnExit  timeout={{enter:360,exit:jobExit}}>
                  <Box sx={quoteShellLeft}>
                    <Typography color='secondary.light' variant='h5' align='left' sx={quoteStyle}>{quote3}</Typography>
                    <Typography color='primary.mid' variant='h5' align='left' sx={authorStyle}>{author3}</Typography>
                  </Box>
                </Slide>
            </Box>



            <Box sx={quoteWrapRight} ref={rightQuoteRef}>
                <Slide direction={"left"} in={myView} container={rightQuoteRef.current} unmountOnExit  timeout={{enter:360,exit:myExit}}>
                  <Box sx={quoteShellRight}>
                    <Typography color='secondary.light' variant='h6' align='right' sx={quoteStyle}>{quote2}</Typography>
                    <Typography color='primary.mid' variant='h6' align='right' sx={authorStyle}>{author2}</Typography>
                  </Box>
                </Slide>

                <Slide direction={"left"} in={jobView} container={rightQuoteRef.current} unmountOnExit timeout={{enter:360,exit:jobExit}}>
                  <Box sx={quoteShellRight}>
                    <Typography color='secondary.light' variant='h6' align='right' sx={quoteStyle}>{quote4}</Typography>
                    <Typography color='primary.mid' variant='h6' align='right' sx={authorStyle}>{author4}</Typography>
                  </Box>
                </Slide>
            </Box>
          </Grid>

          <Grid container item xs={5} alignItems='center' justifyContent='flex-start' sx={{pt:0}} direction='column'  >
            <Box>
              <Typography color='secondary.light' variant={lg_up?'h5':'h5'} sx={homeStyle}align='center'>
                Hi, I'm 
                <Typography  display='inline' variant='inherit' 
                // component='h1'
                 onMouseEnter={() => {
                   setMyExit(DEFAULT_EXIT)
                   setJobExit(SWITCH_EXIT)
                   setMyView(true)
                   setJobView(false)
                   setShowHoverHint(false)
                 }}
                 onMouseLeave={() => {
                   setMyExit(DEFAULT_EXIT)
                   setMyView(false)
                 }}
                sx={{pl:1,...viewStyle, animationDelay:'0s'}}>Shamarl</Typography>
              </Typography>

            
              <Typography color='secondary.light' variant={lg_up?'h5':'h5'} sx={homeStyle} align='center'>
                I'm a full-stack
                <Typography display='inline'  variant='inherit' component='h1'
                 onMouseEnter={() => {
                   setJobExit(DEFAULT_EXIT)
                   setMyExit(SWITCH_EXIT)
                   setJobView(true)
                   setMyView(false)
                   setShowHoverHint(false)
                 }}
                 onMouseLeave={() => {
                   setJobExit(DEFAULT_EXIT)
                   setJobView(false)
                 }}
                sx={{
                  pl:1,
                  ...viewStyle,
                  animationDelay:'2.0s',
                  animation: (reduceMotion || !canHover) ? 'none' : `${glowCueSoft} 3.8s ease-in-out infinite`,
                }}>web developer</Typography>
              </Typography>

              {canHover && (
                <Typography
                  color='secondary.light'
                  align='center'
                  sx={{
                    opacity: showHoverHint ? 0.6 : 0,
                    transition: 'opacity 600ms ease',
                    fontSize: {xs:12, md:13},
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    mt: 1,
                  }}
                >
                  Hover my name or title
                </Typography>
              )}
            </Box>
          


            <Grid container item justifyContent="center" alignItems='flex-start'  xs={3} sx={{pt:2}} ref={aboutRef}>
                <Box alignItems="flex-start">
                  <Slide direction={"up"} in={jobView} container={aboutRef.current} unmountOnExit timeout={{enter:420,exit:jobExit}}>
                    <Box alignItems="center" >
                      {/* <Typography color='secondary.light' variant='h5' align='center' sx={quoteStyle} >{about2}</Typography> */}
                      <Typography color='secondary.light'  variant={lg_up?'h5':'h5'} align='center' sx={quoteStyle} >{about2_2}</Typography>
                    </Box>
                  </Slide>

                  <Slide direction={"up"} in={myView} container={aboutRef.current} unmountOnExit timeout={{enter:420,exit:myExit}}>
                    <Box alignItems="center" >
                      {/* <Typography color='secondary.light' variant='h5' align='center' sx={quoteStyle} >{about}</Typography> */}
                      <Typography color='secondary.light'  variant={lg_up?'h5':'h5'} align='center' sx={quoteStyle} >{about_2}</Typography>
                    </Box>
                  </Slide>
                </Box>
            </Grid>

          </Grid>

          

          {/* <Grid container item xs={3}  justifyContent='space-between' alignItems='flex-end'>
            
            
            <Grid item xs={6} sx={{pr:2}}>
            <Slide direction={"right"} in={view>0} container={aboutRef.current} timeout={{enter:600,exit:10}}>
              <Box>
                <Typography color='secondary.light' variant='h6' align='left' sx={quoteStyle}>{quote3}</Typography>
                <Typography color='primary.mid' variant='h6' align='left' sx={quoteStyle}>{author3}</Typography>
              </Box>
            </Slide>
            </Grid>

            <Grid item xs={6} sx={{pl:2}}>
            <Slide direction={"left"} in={view>0} container={aboutRef.current} timeout={{enter:600,exit:10}}>
              <Box>
              <Typography color='secondary.light' variant='h6' align='right' sx={quoteStyle}>{quote4}</Typography>
              <Typography color='primary.mid' variant='h6' align='right' sx={quoteStyle}>{author4}</Typography>
              </Box>
            </Slide>

          </Grid>

          </Grid> */}





        </Grid>

      </Box>
      













      
      <Box ref = {projectsRef} 
      sx={{p:4, pt:{xs:2,sm:4,md:8,lg:12},pb:12, height:1 ,}}>
        <Typography variant="h2" align='center' color='primary.mid' sx={{marginBottom:8}}>Work</Typography>
        <Box ref = {slideRef}  overflow='hidden' >
          <Grid container justifyContent='center' spacing={4}>

          <Slide direction="up" in={projectInView} container={slideRef.current}timeout={{enter:550,exit:0}} style={{ transitionDelay:100}}>
            <Grid container item xs={12} md={6} lg={4}  justifyContent='center'>
              <Project index={0} title="AI Trading Journal" image={aiTradingJournalScreen} tags={['React','AI Integration','Analytics']} link="https://trade-drop.vercel.app/" badge="Beta" imageFit="contain"
              description='AI-powered trading journal that logs trades, tags setups, and surfaces patterns with automated insights.'/>
            </Grid>
          </Slide>

          <Slide direction="up" in={projectInView} container={slideRef.current} timeout={{enter:550,exit:0}} style={{ transitionDelay:100}}>
            <Grid container item xs={12} md={6} lg={4} justifyContent='center'>
            
            <Project index={4} title="Guidedly" image={guidedlyScreen}
             tags={['React','design']} link='https://guidedly.netlify.app/'
              description='Guidedly is an online meditation timer that uses speech to to text to create a guided meditation with your own mantras.'/>
            
            </Grid>
          </Slide>

          <Slide direction="up" in={projectInView}  container={slideRef.current} timeout={{enter:550,exit:0}} style={{ transitionDelay:100}}>
            <Grid container item xs={12} md={6} lg={4} justifyContent='center'>
              <Project index={1} title='Pomonoto' image={pomonotoScreen} tags={['React','Django', 'User Authentication']} link="https://pomonoto.netlify.app/"
              description="Pomodoro timer with a helpful twist. During work phases, users can jot down disappearing notes and see them when on break."/>
            </Grid>
          </Slide>

          <Slide direction="up" in={projectInView}  container={slideRef.current} timeout={{enter:550,exit:0}} style={{ transitionDelay:100}}>
            <Grid container item xs={12} md={6} lg={4} justifyContent='center'>
              <Project index={2} title="D'Core Paperie" image={dcoreScreen} tags={['React','Design']} link="https://www.dcorepaperie.com/"
              description='Website for local paperie business showcasing their services and all other pertinent information'/>
            </Grid>
          </Slide>

          <Slide direction="up" in={projectInView} container={slideRef.current} timeout={{enter:550,exit:0}} style={{ transitionDelay:100}}>
            <Grid container item xs={12} md={6} lg={4} justifyContent='center'>
              <Project index={3} title="Cubeplex" image={cubeplexScreen} tags={['React','E-Commerce','Design','Stripe payment']} badge="No longer for sale"
               link="https://cubeplex.netlify.app/"
              description='E-Commerce website for The Cubeplex'/>
            </Grid>
          </Slide>

          

          {/* <Slide direction="up" in={projectInView} container={slideRef.current} timeout={{enter:550,exit:0}} style={{ transitionDelay:100}}>
            <Grid container item xs={12} md={6} lg={4} justifyContent='center'>
              <Project index={5} title="Lazy Irrigation" image={lazyPotScreen} tags={['Shopify','E-Commerce','Design']} 
              // link="https://irrigationpots.myshopify.com/"
              description='Shopify E-Comerce website for Lazy Irrigation Pots'/>
            </Grid>
          </Slide>

          <Slide direction="up" in={projectInView} container={slideRef.current} timeout={{enter:550,exit:0}} style={{ transitionDelay:100}}>
            <Grid container item xs={12} md={6} lg={4} justifyContent='center'>
              <Project index={6} title="Eternally Bonded" image={eternallyBondedScreen} tags={['Shopify','E-Commerce','Design']} 
              // link="https://eternally-bonded-rings.myshopify.com/"
              description='Shopify E-Comerce website for matching ring sets'/>
            </Grid>
          </Slide> */}

          <Slide direction="up" in={projectInView} container={slideRef.current} timeout={{enter:550,exit:0}} style={{ transitionDelay:100}}>
            <Grid container item xs={12} md={6} lg={4} justifyContent='center'>
            <Box class='academy-badge' width='50px'>
            <Project index={7} title="SEO Certification" image={seoCert}
             tags={['SEO']} link='null'
              description='Obtained search engine optimization certification through hubspot academy'/>
            </Box>
            </Grid>
          </Slide>
          </Grid>
            

            



        </Box>
        
    

      </Box>



      <Box  ref = {contactRef} 
      pt={{xs:2,sm:4,md:8,lg:12}} pb={4} sx={{ height:1}}>
        
          <Box mb={2} alignItems='center' sx={{px:{xs:2,md:4}}}>
            <Typography color='primary.mid' mb={2} variant='h3'  align='center'>Get In Touch</Typography>
            <Typography color='secondary.light' sx={quoteStyle} align='center'>want to contact me about work, ask a question or just keep up with what I'm working on?</Typography>
            <Typography color='secondary.light' sx={quoteStyle} align='center'>Feel free to send me a message or follow me on social media. </Typography>

            
          </Box>

          <Stack direction='row' gap={2} justifyContent='center'>
            <Fab sx={fabStyle} size='medium' component={Link} href='https://twitter.com/Shanka26/' target="_blank" rel="noopener"><TwitterIcon/></Fab>
            <Fab sx={fabStyle} size='medium'  component={Link} href='https://github.com/Shanka26' target="_blank" rel="noopener"><GitHubIcon/></Fab>
            <Fab sx={fabStyle} size='medium'  component={Link} href='https://www.linkedin.com/in/shamarl-l-a70864118' target="_blank" rel="noopener"><LinkedInIcon/></Fab>
            </Stack>

            <Box mx={{xs:4,sm:8,md:16,lg:24}} my={2} >
              <Grid container rowSpacing={2} alignItems='center' justifyContent='center' >
              <Grid item xs={12}>
                <Typography color='secondary.light' variant='h6'>Send me an Email</Typography>
              </Grid>
              
              <Grid container justifyContent='flex-start' pr={{xs:0,md:1}} item xs={12} md={6} >
                
                  <TextField
                  sx={textFieldStyle}
                  InputLabelProps={{
                    style: { color: '#fff' },
                  }}

                   fullWidth label="Your Name" value={emailName} onChange={(e)=>{setEmailName(e.target.value)}}/>
               
                
              </Grid>


              <Grid container justifyContent='flex-end' item xs={12} md={6} pl={{xs:0,md:1}}>
                <TextField 
                sx={textFieldStyle}
                InputLabelProps={{
                  style: { color: '#fff' },
                }}
                fullWidth  label="Your Email" value={emailAddress} onChange={(e)=>{setEmailAddress(e.target.value)}}/>
              </Grid>
          
              <Grid item  xs={12}>
                <TextField 
                sx={textFieldStyle}
                InputLabelProps={{
                  style: { color: '#fff' },
                }}
                inputProps={{ style: {color: 'white'}}}
                
                fullWidth multiline rows={6} label="Your Message" value={emailMessage} onChange={(e)=>{setEmailMessage(e.target.value)}}/>
              </Grid>

              <Grid container item xs={12} justifyContent="space-between">
                <Typography color='red' variant='h6'  sx={{display:emailError}}>Invalid, please check your information and try again</Typography>
                <Button variant='contained' sx={{color: 'secondary.light'}} onClick={(e)=>{sendEmail()}} >Send</Button>
              </Grid>
              
            </Grid>
            </Box>


      </Box>
      <Box>
        <Footer/>
      </Box>
        
    </Box>
  );
}

export default App;
