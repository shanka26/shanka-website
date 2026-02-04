import { Chip, Grid, Paper, Typography, Stack, Button, Box } from '@mui/material'
import React from 'react'
import Image from 'mui-image'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
// import Image from 'material-ui-image'
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';







const Project = ({title,description,image,tags,link,index=0,badge,imageFit='cover'}) => {
    const size_theme = useTheme()
    const md_up = useMediaQuery(size_theme.breakpoints.up('md'));
    const canHover = useMediaQuery('(hover: hover)');
    const offsetY = md_up ? (index % 2 === 0 ? 0 : 16) : 0;
    const mobileOverlayBg = imageFit === 'contain'
        ? 'linear-gradient(180deg, rgba(0,0,0,0.08), rgba(0,0,0,0.0))'
        : 'linear-gradient(180deg, rgba(0,0,0,0.18), rgba(0,0,0,0.05))';

    const style = {
        width:{xs:340,md:380},
        height:{xs:380,md:420},
        margin:2,
        mt: offsetY ? `${offsetY}px` : 0,
        display:image?'flex':'none',
        borderRadius:3,
        position:'relative',
        overflow:'hidden',
        background:'linear-gradient(180deg, rgba(0,102,102,0.1), rgba(0,0,0,0.35))',
        border:'1px solid',
        borderColor:'rgba(0,122,121,0.35)',
        boxShadow:'0 12px 28px rgba(0,0,0,0.25)',
        transition:'transform 200ms ease, box-shadow 200ms ease',
        '&:hover':{
            transform:'translateY(-4px)',
            boxShadow:'0 18px 36px rgba(0,0,0,0.3)',
        },
        '&:hover .project-media':{
            filter:'brightness(0.6)',
            transform:'scale(1.02)',
        },
        '&:hover .project-overlay':{
            opacity:1,
            transform:'translateY(0)',
            pointerEvents:'auto',
        },
    };
    

  return (
    <Paper sx={style}>
        
        {/* <img src={pomonotoScreen}/> */}
        <Grid container direction='column'  alignItems='center' sx={{height:1}}>
        {/* <Image src={pomonotoScreen}/> */}
            <Grid container item xs={1} sx={{p:2,pb:1}} alignItems='center' justifyContent='center'>
                <Typography color='secondary.light' variant='h4' align ='center'>{title}</Typography>
            </Grid>
            <Grid container item alignItems='center' justifyContent='center' sx={{px:2,pb:2,flexGrow:1}}>
                <Box
                    position='relative'
                    width={md_up ? 340 : 320}
                    height={md_up ? 300 : 270}
                    display='flex'
                    alignItems='center'
                    justifyContent='center'
                >
                    {badge && (
                        <Box
                            sx={{
                                position:'absolute',
                                top:10,
                                left:10,
                                zIndex:3,
                                px:1.2,
                                py:0.4,
                                borderRadius:999,
                                backgroundColor:'primary.mid',
                                color:'secondary.light',
                                fontSize:{xs:10,md:11},
                                fontWeight:700,
                                letterSpacing:'0.12em',
                                textTransform:'uppercase',
                                boxShadow:'0 6px 16px rgba(0,0,0,0.25)',
                            }}
                        >
                            {badge}
                        </Box>
                    )}
                    <Box
                        className="project-media"
                        sx={{
                            width: '100%',
                            height: '100%',
                            position:'relative',
                            zIndex:0,
                            transition:'transform 240ms ease, filter 240ms ease',
                        }}
                    >
                        <Image
                            src={image}
                            shift="top"
                            duration={700}
                            sx={{borderRadius:1,}}
                            width="100%"
                            height="100%"
                            distance={400}
                            shiftDuration={400}
                            showLoading
                            fit={imageFit}
                        />
                    </Box>

                    <Box
                        className="project-overlay"
                        sx={{
                            position:'absolute',
                            inset:0,
                            zIndex:1,
                            display:'flex',
                            flexDirection:'column',
                            justifyContent:'center',
                            alignItems:'center',
                            textAlign:'center',
                            px:2,
                            opacity: canHover ? 0 : 1,
                            transform: canHover ? 'translateY(10px)' : 'translateY(0)',
                            transition:'opacity 220ms ease, transform 220ms ease',
                            background: canHover
                                ? 'linear-gradient(180deg, rgba(0,0,0,0.55), rgba(0,0,0,0.35))'
                                : mobileOverlayBg,
                            borderRadius:1,
                            pointerEvents: canHover ? 'none' : 'auto',
                        }}
                    >
                        <Typography variant='body1' color='secondary.light' align ='center' fontSize={{xs:14,md:16}} sx={{mb:2, textShadow:'0 2px 8px rgba(0,0,0,0.45)'}}>
                            {description}
                        </Typography>
                        <Stack direction='row' spacing={1} useFlexGap flexWrap='wrap' justifyContent='center'>
                            {tags.map((tag)=>(
                                <Chip key={tag} sx={{backgroundColor:'rgba(0,0,0,.25)',color:'secondary.light', fontSize:{xs:11,md:13}}} label={tag}/>
                            ))}
                        </Stack>
                        {link && link !== 'null' && (
                            <Button variant='contained' sx={{backgroundColor:'primary.dark', mt:2}} target="_blank" rel="noopener noreferrer" href={link}>
                                Visit Site<ArrowForwardIosIcon  sx={{pl:1, fontSize:16, }} />
                            </Button>
                        )}
                    </Box>
                </Box>
            </Grid>
            
        </Grid>
    </Paper>
  )
}

export default Project
